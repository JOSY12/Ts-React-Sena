import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  AxiosError,
  AxiosHeaders,
  type AxiosAdapter,
  type InternalAxiosRequestConfig
} from 'axios'
import { axiosbackend, configureSession } from '../src/shared/api/client'
import { comprar_stripe } from '../src/features/compras/api'
import {
  checkoutKey,
  reconcileCheckoutSession
} from '../src/features/compras/checkout-attempt'

const originalAdapter = axiosbackend.defaults.adapter
let quantity: number
let address: string
let calls: InternalAxiosRequestConfig[]
let fail: 'network' | 'expired' | null
beforeEach(() => {
  reconcileCheckoutSession(null)
  configureSession('session-a', async () => 'token')
  quantity = 1
  address = 'address-a'
  calls = []
  fail = null
  axiosbackend.defaults.adapter = async (config) => {
    const data =
      config.url === '/u/carrito'
        ? { rows: [{ id: 'product', cantidad: quantity, precio: 20 }] }
        : config.url === '/u/direcciones'
          ? [{ id: address, predeterminada: true }]
          : 'https://checkout.stripe.com/test'
    const response = {
      data,
      config,
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders()
    }
    if (config.method === 'post') {
      calls.push(config)
      if (fail === 'network')
        throw new AxiosError('Respuesta perdida', 'ERR_NETWORK', config)
      if (fail === 'expired')
        throw new AxiosError('Conflict', 'ERR_BAD_REQUEST', config, undefined, {
          ...response,
          status: 409,
          data: { error: 'Intento vencido o completado; inicia uno nuevo' }
        })
    }
    return response
  }
})
afterEach(() => {
  axiosbackend.defaults.adapter = originalAdapter
  reconcileCheckoutSession(null)
  configureSession(null, async () => null)
})
const key = (index: number) => calls[index].headers.get('Idempotency-Key')

describe('checkout compatible con reservas e idempotencia de APIGeneral', () => {
  it('reintenta una respuesta perdida con la misma clave y payload', async () => {
    fail = 'network'
    await expect(comprar_stripe('')).rejects.toThrow('Respuesta perdida')
    fail = null
    await expect(comprar_stripe('')).resolves.toContain('https://checkout.stripe.com/')
    expect(key(0)).toBeTruthy()
    expect(key(1)).toBe(key(0))
    expect(JSON.parse(calls[1].data)).toEqual({ idproducto: '' })
  })
  it('recupera el mismo intento al regresar sin cambios de carrito', async () => {
    await comprar_stripe('')
    await comprar_stripe('')
    expect(key(1)).toBe(key(0))
  })
  it('distingue cambios de cantidad, dirección y selección de producto', async () => {
    await comprar_stripe('')
    quantity = 2
    await comprar_stripe('')
    address = 'address-b'
    await comprar_stripe('')
    await comprar_stripe('product')
    expect(new Set(calls.map((_, index) => key(index))).size).toBe(4)
  })
  it('recupera una clave anterior al volver al mismo contexto', async () => {
    await comprar_stripe('')
    quantity = 2
    await comprar_stripe('')
    quantity = 1
    await comprar_stripe('')
    expect(key(2)).toBe(key(0))
  })
  it('no reutiliza intentos entre sesiones y los elimina al salir', async () => {
    await comprar_stripe('')
    configureSession('session-b', async () => 'token-b')
    reconcileCheckoutSession('session-b')
    await comprar_stripe('')
    expect(key(1)).not.toBe(key(0))
    reconcileCheckoutSession(null)
    expect(sessionStorage.getItem('techsells.checkout.v1')).toBeNull()
  })
  it('renueva la clave si el servidor confirma que el intento terminó', async () => {
    fail = 'expired'
    await expect(comprar_stripe('')).rejects.toThrow()
    fail = null
    await comprar_stripe('')
    expect(key(1)).not.toBe(key(0))
  })
  it('caduca los intentos a los 35 minutos', async () => {
    const now = Date.now()
    const time = vi.spyOn(Date, 'now').mockReturnValue(now)
    await comprar_stripe('')
    time.mockReturnValue(now + 35 * 60 * 1000 + 1)
    await comprar_stripe('')
    expect(key(1)).not.toBe(key(0))
  })
  it('persiste solo el hash del contexto y permite recuperarlo tras recargar', async () => {
    const context = { direccion: 'Dirección privada de prueba' }
    const first = await checkoutKey('session-a', context)
    expect(sessionStorage.getItem('techsells.checkout.v1')).not.toContain(
      context.direccion
    )
    vi.resetModules()
    const reloaded = await import('../src/features/compras/checkout-attempt')
    expect(await reloaded.checkoutKey('session-a', context)).toBe(first)
  })
  it('un cambio de sesión durante la preparación impide crear checkout', async () => {
    const original = axiosbackend.defaults.adapter as AxiosAdapter
    axiosbackend.defaults.adapter = async (config) => {
      const response = await original(config)
      if (config.url === '/u/carrito')
        configureSession('session-b', async () => 'new-token')
      return response
    }
    await expect(comprar_stripe('')).rejects.toThrow('La sesión cambió.')
    expect(calls).toHaveLength(0)
  })
})
