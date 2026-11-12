import { axiosbackend, requiredId } from '../../shared/api/client'
import { array, record } from '../../shared/api/contracts'
import { ApiError } from '../../shared/api/errors'
import { notify } from '../../shared/api/notifications'
import type { compras_hechas, item_carrito } from '../../Componentes/types'

export const carrito = async () =>
  array<item_carrito>(record((await axiosbackend.get('/u/carrito')).data).rows)
export const historial_compras = async () =>
  array<compras_hechas>(record((await axiosbackend.get('/u/mis_compras')).data).rows)
export const detalle_compra = async (id: string) =>
  array<item_carrito>(
    record((await axiosbackend.get(`/u/detalle_compra/${requiredId(id)}`)).data).rows
  )
export const agregar_carrito = (idproducto: string, cantidad: number) =>
  notify(async () => {
    await axiosbackend.post('/u/agregar_carrito', { idproducto, cantidad })
  }, 'Agregando al carrito')
export const quitar_carrito = (id: string) =>
  notify(async () => {
    await axiosbackend.delete(`/u/quitar_carrito/${requiredId(id)}`)
  }, 'Quitando del carrito')
export const cambiar_cantidad = (idproducto: string, cantidad: number) =>
  notify(async () => {
    await axiosbackend.put('/u/carrito_cantidad', { idproducto, cantidad })
  }, 'Actualizando cantidad')
export const marcar_enviado = (idcompra: string) =>
  notify(
    async () => {
      await axiosbackend.put('/u/marcar_enviado', { idcompra })
    },
    'Actualizando pedido',
    'Compra marcada como enviada'
  )
export const marcar_recibido = (idcompra: string) =>
  notify(
    async () => {
      await axiosbackend.put('/u/marcar_recibido', { idcompra })
    },
    'Actualizando pedido',
    'Compra marcada como recibida'
  )
export const comprar_stripe = (idproducto: string): Promise<string> =>
  notify(async () => {
    const { data } = await axiosbackend.post<unknown>('/stripe_compras/comprar', {
      idproducto
    })
    if (typeof data !== 'string')
      throw new ApiError('El servidor no devolvió un enlace de pago válido.')
    let url: URL
    try {
      url = new URL(data)
    } catch {
      throw new ApiError('El enlace de pago no es válido.')
    }
    if (url.protocol !== 'https:')
      throw new ApiError('El enlace de pago debe usar HTTPS.')
    return url.href
  }, 'Preparando compra')
