import { afterEach, describe, expect, it, vi } from 'vitest'
import { AxiosError, AxiosHeaders } from 'axios'
import { toast } from 'sonner'
import { axiosbackend, configureSession } from '../src/shared/api/client'
import { crear_producto } from '../src/features/catalogo/api'
import { agregar_direccion } from '../src/features/usuario/api'
import { comprar_stripe } from '../src/features/compras/api'
import type { direccion, producto } from '../src/Componentes/types'
import { errorMessage, errorStatus } from '../src/shared/api/errors'

const originalAdapter = axiosbackend.defaults.adapter
afterEach(() => {
  axiosbackend.defaults.adapter = originalAdapter
  configureSession(null, async () => null)
})
const respond = (data: unknown) => {
  axiosbackend.defaults.adapter = async (config) => ({
    data,
    status: 200,
    statusText: 'OK',
    headers: new AxiosHeaders(),
    config
  })
}

describe('errores y contratos HTTP', () => {
  it('rechaza un guardado fallido y no muestra un éxito', async () => {
    axiosbackend.defaults.adapter = async (config) => {
      throw new AxiosError('offline', 'ERR_NETWORK', config)
    }
    await expect(crear_producto({} as producto)).rejects.toThrow('offline')
    expect(toast.success).not.toHaveBeenCalled()
    expect(toast.error).toHaveBeenCalled()
  })
  it('trata una dirección duplicada como fallo de negocio', async () => {
    respond('ya existe')
    await expect(agregar_direccion({} as direccion)).rejects.toThrow('Ya existe')
    expect(toast.success).not.toHaveBeenCalled()
  })
  it('solo entrega un enlace de checkout válido', async () => {
    respond({ message: 'no se pudo' })
    await expect(comprar_stripe('')).rejects.toThrow('enlace de pago válido')
    respond('javascript:alert(1)')
    await expect(comprar_stripe('')).rejects.toThrow('HTTPS')
    respond('https://checkout.stripe.com/test')
    await expect(comprar_stripe('')).resolves.toBe('https://checkout.stripe.com/test')
  })
  it('adjunta el token preparado antes de la primera petición privada', async () => {
    const adapter = vi.fn(
      async (config: import('axios').InternalAxiosRequestConfig) => ({
        data: [],
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders(),
        config
      })
    )
    axiosbackend.defaults.adapter = adapter
    configureSession('session', async () => 'test-token')
    await axiosbackend.get('/u/direcciones')
    expect(adapter.mock.calls[0][0].headers.Authorization).toBe('Bearer test-token')
  })
  it('interpreta los errores JSON de APIGeneral y conserva su estado HTTP', () => {
    const error = new AxiosError(
      'Bad request',
      'ERR_BAD_REQUEST',
      undefined,
      undefined,
      {
        data: { error: 'Debes seleccionar una dirección predeterminada' },
        status: 400,
        statusText: 'Bad Request',
        headers: new AxiosHeaders(),
        config: { headers: new AxiosHeaders() }
      }
    )
    expect(errorMessage(error)).toBe('Debes seleccionar una dirección predeterminada')
    expect(errorStatus(error)).toBe(400)
  })
})
