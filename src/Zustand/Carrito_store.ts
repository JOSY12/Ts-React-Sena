import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import { item_carrito } from '../Componentes/types'
import { agregar_carrito, carrito, quitar_carrito } from '../Services'

interface carrito_store {
  carrito: item_carrito[]

  agregar: (id: string) => void
  quitar: (id: string) => void
  encarrito: (id: string) => boolean
  solicitar_carrito: () => void
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
      quitar: async (id: string) => {
        set(({ carrito }) => ({
          carrito: carrito.filter((e) => e.id !== id)
        }))
        await quitar_carrito(id)
      },
      encarrito: (id: string) => !!get().carrito.find((e) => e.id === id),

      solicitar_carrito: async () => {
        const res = await carrito()
        set(() => ({
          carrito: res
        }))
      }

      // fin del store
    }),
    { name: 'micarrito' }
  )
  // fin del persist
)
