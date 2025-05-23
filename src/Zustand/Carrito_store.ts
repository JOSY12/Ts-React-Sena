import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import { item_carrito } from '../Componentes/types'
import {
  agregar_carrito,
  cambiar_cantidad,
  carrito,
  quitar_carrito
} from '../Services'

interface carrito_store {
  carrito: item_carrito[]

  agregar: (id: string) => void
  aumentar: (id: string) => void
  restar: (id: string) => void

  quitar: (id: string) => void
  encarrito: (id: string) => boolean
  solicitar_carrito: () => void
  total: () => number
}
export const carrito_store = create<carrito_store>()(
  persist(
    // inicio del persist
    (set, get) => ({
      // inicio de store
      carrito: [],

      agregar: async (id: string) => {
        set(({ carrito }) => ({
          carrito: carrito.find((e) => e.id === id)
            ? carrito
            : [...carrito, { id, cantidad: 1 }]
        }))
        await agregar_carrito(id)
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
      }

      // fin del store
    }),
    { name: 'micarrito' }
  )
  // fin del persist
)
