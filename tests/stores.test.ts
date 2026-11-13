import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as compras from '../src/features/compras/api'
import * as usuario from '../src/features/usuario/api'
import * as catalogo from '../src/features/catalogo/api'
import { carrito_store } from '../src/Zustand/Carrito_store'
import { favoritos_store } from '../src/Zustand/Favoritos_store'
import { Notificaciones_store } from '../src/Zustand/Notificaciones_store'
import { Direcciones_usuario } from '../src/Zustand/Direcciones_usuario'
import { Stripe_store } from '../src/Zustand/Stripe_store'
import { productos_store } from '../src/Zustand/Productos_store'
import { syncSession } from '../src/shared/api/session'
import { parseFilters } from '../src/shared/utils/filters'
import type { item_carrito, ProductListResponse } from '../src/Componentes/types'

function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((done) => {
    resolve = done
  })
  return { promise, resolve }
}
let session = 0
beforeEach(() => syncSession(`session-${++session}`, async () => 'token', 'user-a'))

describe('carrito y consistencia con servidor', () => {
  it('agrega la cantidad solicitada y carga los datos confirmados', async () => {
    const add = vi.spyOn(compras, 'agregar_carrito').mockResolvedValue()
    vi.spyOn(compras, 'carrito').mockResolvedValue([
      { id: 'p', cantidad: 3, precio: 10, stock: 5 }
    ])
    await expect(carrito_store.getState().agregar('p', 3)).resolves.toBe(true)
    expect(add).toHaveBeenCalledWith('p', 3)
    expect(carrito_store.getState().carrito[0].cantidad).toBe(3)
    expect(carrito_store.getState().total()).toBe(30)
  })
  it('un fallo al cambiar cantidad conserva el estado y permite reintentar', async () => {
    carrito_store.setState({ carrito: [{ id: 'p', cantidad: 2, stock: 3 }] })
    vi.spyOn(compras, 'cambiar_cantidad').mockRejectedValue(new Error('falló'))
    await expect(carrito_store.getState().aumentar('p')).resolves.toBe(false)
    expect(carrito_store.getState().carrito[0].cantidad).toBe(2)
    expect(carrito_store.getState().busy).toBe(false)
    expect(carrito_store.getState().error).toBeTruthy()
  })
  it('rechaza cero, fracciones, IDs inexistentes y cantidades superiores al stock', async () => {
    const change = vi.spyOn(compras, 'cambiar_cantidad')
    carrito_store.setState({ carrito: [{ id: 'p', cantidad: 1, stock: 1 }] })
    expect(await carrito_store.getState().restar('p')).toBe(false)
    expect(await carrito_store.getState().aumentar('p')).toBe(false)
    expect(await carrito_store.getState().aumentar('missing')).toBe(false)
    expect(await carrito_store.getState().agregar('p', 1.5)).toBe(false)
    expect(change).not.toHaveBeenCalled()
  })
  it('serializa cambios de cantidad ante clics repetidos', async () => {
    const request = deferred<void>()
    const change = vi
      .spyOn(compras, 'cambiar_cantidad')
      .mockReturnValue(request.promise)
    carrito_store.setState({ carrito: [{ id: 'p', cantidad: 1, stock: 5 }] })
    const first = carrito_store.getState().aumentar('p')
    expect(await carrito_store.getState().aumentar('p')).toBe(false)
    request.resolve()
    await first
    expect(change).toHaveBeenCalledTimes(1)
    expect(carrito_store.getState().carrito[0].cantidad).toBe(2)
  })
  it('respeta el límite de la API aunque el inventario permita más unidades', async () => {
    const change = vi.spyOn(compras, 'cambiar_cantidad')
    const add = vi.spyOn(compras, 'agregar_carrito')
    carrito_store.setState({ carrito: [{ id: 'p', cantidad: 10000, stock: 10000000 }] })
    expect(await carrito_store.getState().aumentar('p')).toBe(false)
    expect(await carrito_store.getState().agregar('p', 10001)).toBe(false)
    expect(change).not.toHaveBeenCalled()
    expect(add).not.toHaveBeenCalled()
  })
  it('un fallo al marcar enviado no cambia el pedido', async () => {
    carrito_store.setState({
      detalle_compra: [{ id: 'p', cantidad: 1, enviado: false }]
    })
    vi.spyOn(compras, 'marcar_enviado').mockRejectedValue(new Error('sin permisos'))
    expect(await carrito_store.getState().enviar_compra('order')).toBe(false)
    expect(carrito_store.getState().detalle_compra[0].enviado).toBe(false)
  })
})

describe('aislamiento de sesión y respuestas obsoletas', () => {
  it('no restaura un enlace de checkout después de salir del carrito', async () => {
    const pending = deferred<string>()
    vi.spyOn(compras, 'comprar_stripe').mockReturnValue(pending.promise)
    const pay = Stripe_store.getState().pagar('')
    Stripe_store.getState().reset()
    pending.resolve('https://checkout.stripe.com/old-request')
    await pay
    expect(Stripe_store.getState().url).toBe('')
    expect(Stripe_store.getState().busy).toBe(false)
  })
  it('una confirmación de un pedido anterior no modifica el detalle abierto después', async () => {
    const pending = deferred<void>()
    vi.spyOn(compras, 'marcar_enviado').mockReturnValue(pending.promise)
    carrito_store
      .getState()
      .setear_detalle_compra([{ id: 'a', cantidad: 1, enviado: false }], 'order-a')
    const send = carrito_store.getState().enviar_compra('order-a')
    carrito_store
      .getState()
      .setear_detalle_compra([{ id: 'b', cantidad: 1, enviado: false }], 'order-b')
    pending.resolve()
    await send
    expect(carrito_store.getState().detalle_compra[0]).toMatchObject({
      id: 'b',
      enviado: false
    })
  })
  it('limpia todos los datos privados y las claves antiguas al cambiar de usuario', () => {
    carrito_store.setState({ carrito: [{ id: 'private', cantidad: 1 }] })
    favoritos_store.setState({ favoritos: [{ id: 'private' }] })
    Stripe_store.setState({ url: 'https://checkout.stripe.com/old' })
    localStorage.setItem('micarrito', 'old-data')
    localStorage.setItem('misfavoritos', 'old-data')
    syncSession('session-b', async () => null, 'user-b')
    expect(carrito_store.getState().carrito).toEqual([])
    expect(favoritos_store.getState().favoritos).toEqual([])
    expect(Direcciones_usuario.getState().misdirecciones).toEqual([])
    expect(Notificaciones_store.getState().misnotificaciones).toEqual([])
    expect(Stripe_store.getState().url).toBe('')
    expect(localStorage.getItem('micarrito')).toBeNull()
    expect(localStorage.getItem('misfavoritos')).toBeNull()
  })
  it('descarta una respuesta del usuario anterior', async () => {
    const pending = deferred<item_carrito[]>()
    vi.spyOn(compras, 'carrito').mockReturnValue(pending.promise)
    const load = carrito_store.getState().solicitar_carrito()
    syncSession('next-user', async () => null, 'user-b')
    pending.resolve([{ id: 'user-a-private', cantidad: 1 }])
    expect(await load).toBe(false)
    expect(carrito_store.getState().carrito).toEqual([])
  })
  it('comparte una carga en curso entre el contador global y la página', async () => {
    const pending = deferred<item_carrito[]>()
    const api = vi.spyOn(compras, 'carrito').mockReturnValue(pending.promise)
    const first = carrito_store.getState().solicitar_carrito()
    const second = carrito_store.getState().solicitar_carrito()
    expect(api).toHaveBeenCalledTimes(1)
    pending.resolve([])
    await Promise.all([first, second])
    expect(carrito_store.getState().status).toBe('success')
  })
  it('no elimina favoritos si la API rechaza la operación', async () => {
    favoritos_store.setState({ favoritos: [{ id: 'p' }] })
    vi.spyOn(usuario, 'quitar_favorito').mockRejectedValue(new Error('offline'))
    expect(await favoritos_store.getState().quitar('p')).toBe(false)
    expect(favoritos_store.getState().favoritos).toEqual([{ id: 'p' }])
  })
  it('quitar un favorito durante una recarga no deja el estado cargando ni restaura la fila', async () => {
    const pending = deferred<import('../src/Componentes/types').favorito[]>()
    favoritos_store.setState({ favoritos: [{ id: 'p' }] })
    vi.spyOn(usuario, 'favoritos').mockReturnValue(pending.promise)
    vi.spyOn(usuario, 'quitar_favorito').mockResolvedValue()
    const load = favoritos_store.getState().solicitar_favoritos()
    await favoritos_store.getState().quitar('p')
    pending.resolve([{ id: 'p' }])
    await load
    expect(favoritos_store.getState().status).toBe('success')
    expect(favoritos_store.getState().favoritos).toEqual([])
  })
  it('borrar notificaciones durante una recarga descarta la respuesta antigua y termina la carga', async () => {
    const pending = deferred<import('../src/Componentes/types').notificacionesprops[]>()
    vi.spyOn(usuario, 'usuario_notificaciones').mockReturnValue(pending.promise)
    vi.spyOn(usuario, 'borrar_todas_notificaciones').mockResolvedValue()
    const load = Notificaciones_store.getState().solicitar_notificicaciones()
    await Notificaciones_store.getState().borrar_todo()
    pending.resolve([
      {
        id: 'n',
        visto: false,
        titulo: '',
        descripcion: '',
        fecha_creacion: '',
        fecha_relativa: '',
        icono: ''
      }
    ])
    await load
    expect(Notificaciones_store.getState().status).toBe('success')
    expect(Notificaciones_store.getState().misnotificaciones).toEqual([])
  })
  it('solo marca notificaciones vistas después de confirmación', async () => {
    Notificaciones_store.setState({
      misnotificaciones: [
        {
          id: 'n',
          icono: '',
          titulo: '',
          descripcion: '',
          fecha_creacion: '',
          fecha_relativa: '',
          visto: false
        }
      ]
    })
    vi.spyOn(usuario, 'marcar_visto').mockResolvedValue()
    expect(await Notificaciones_store.getState().marcar_vistos()).toBe(true)
    expect(
      Notificaciones_store.getState().misnotificaciones.filter((n) => !n.visto)
    ).toHaveLength(0)
  })
  it('una búsqueda antigua no sobrescribe la más reciente', async () => {
    const first = deferred<ProductListResponse>()
    vi.spyOn(catalogo, 'todo_productos')
      .mockReturnValueOnce(first.promise)
      .mockResolvedValueOnce({ Productos: [], Pagina: 2, totalPaginas: 4 })
    const load = productos_store
      .getState()
      .solicitar_productos(parseFilters(new URLSearchParams()))
    await productos_store
      .getState()
      .solicitar_productos(parseFilters(new URLSearchParams('Pagina=2')))
    first.resolve({ Productos: [], Pagina: 1, totalPaginas: 99 })
    expect(await load).toBe(false)
    expect(productos_store.getState().paginas).toBe(4)
  })
})
