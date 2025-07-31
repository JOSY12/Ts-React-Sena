import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import { compras_hechas, item_carrito } from '../Componentes/types'
import {
  agregar_carrito,
  cambiar_cantidad,
  carrito,
  detalle_compra,
  historial_compras,
  marcar_enviado,
  marcar_recibido,
  quitar_carrito
} from '../Services'

interface carrito_store {
  carrito: item_carrito[]
  compras: compras_hechas[]
  detalle_compra: item_carrito[]
  agregar: (id: string, cantidad?: number) => void
  aumentar: (id: string) => void
  restar: (id: string) => void
  solicitar_detalle_compra: (id: string) => void
  quitar: (id: string) => void
  encarrito: (id: string) => boolean

  solicitar_carrito: () => void
  total: () => number
  solicitar_compras: () => void
  setear_detalle_compra: (data: item_carrito[]) => void
  enviar_compra: (id: string) => void
  enviar_recibido: (id: string) => void
}
export const carrito_store = create<carrito_store>()(
  persist(
    // inicio del persist
    (set, get) => ({
      // inicio de store
      carrito: [],
      compras: [],
      detalle_compra: [],

      agregar: async (id: string, cantidad?: number) => {
        set(({ carrito }) => ({
          carrito: carrito.find((e) => e.id === id)
            ? carrito
            : [...carrito, { id, cantidad: 1 }]
        }))
        await agregar_carrito(id, cantidad ?? 1)
      },

      aumentar: async (id: string) => {
        set(({ carrito }) => ({
          carrito: carrito.map((item) =>
            item.id === id
              ? { ...item, cantidad: (item.cantidad ?? 0) + 1 }
              : item
          )
        }))
        const item = get().carrito.filter((e) => e.id === id)
        await cambiar_cantidad(id, item[0].cantidad)
      },

      restar: async (id: string) => {
        set(({ carrito }) => ({
          carrito: carrito.map((item) =>
            item.id === id
              ? { ...item, cantidad: (item.cantidad ?? 0) - 1 }
              : item
          )
        }))
        const item = get().carrito.filter((e) => e.id === id)
        await cambiar_cantidad(id, item[0].cantidad)
      },

      quitar: async (id: string) => {
        set(({ carrito }) => ({
          carrito: carrito.filter((e) => e.id !== id)
        }))
        await quitar_carrito(id)
      },
      encarrito: (id: string) => !!get().carrito.find((e) => e.id === id),

      total: () => {
        const res = get().carrito.map(
          (e) => (e?.precio ?? 0) * (e?.cantidad ?? 0)
        )
        return Array.isArray(res) ? res.reduce((v, ac) => v + ac, 0) : 0
      },

      solicitar_carrito: async () => {
        const res = await carrito()
        set({
          carrito: Array.isArray(res) ? res : []
        })
      },
      solicitar_compras: async () => {
        const res = await historial_compras()
        set({
          compras: Array.isArray(res) ? res : []
        })
      },
      enviar_compra: async (id: string) => {
        await marcar_enviado(id) // backend cambia el estado
        set((state) => ({
          detalle_compra: state.detalle_compra.map((item) => ({
            ...item,
            enviado: true
          }))
        }))
        window.location.reload()
      },

      enviar_recibido: async (id: string) => {
        await marcar_recibido(id)
        set((state) => ({
          detalle_compra: state.detalle_compra.map((item) => ({
            ...item,
            recibido: true
          }))
        }))
        window.location.reload()
      },
      solicitar_detalle_compra: async (id: string) => {
        const res = await detalle_compra(id)
        set({
          detalle_compra: Array.isArray(res) ? res : []
        })
      },
      setear_detalle_compra: async (data) => {
        set({
          detalle_compra: Array.isArray(data) ? data : []
        })
      }

      // fin del store
    }),
    { name: 'micarrito' }
  )
  // fin del persist
)
