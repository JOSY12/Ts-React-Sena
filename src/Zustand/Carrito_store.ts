import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import { productoprops } from '../Componentes/types'

interface carrito_store {
  carrito: productoprops[]

  agregar: (producto: productoprops) => void
  quitar: (id: string) => void
  favorito: (id: string) => boolean
}

export const favoritos_store = create<carrito_store>()(
  persist(
    // inicio del persist
    (set, get) => ({
      // inicio de store
      carrito: [],

      agregar: async (producto: any) =>
        set(({ carrito }) => ({
          carrito: carrito.find((e) => e.id === producto.id)
            ? carrito
            : [...carrito, producto]
        })),

      quitar: (id: string) =>
        set(({ carrito }) => ({
          carrito: carrito.filter((e) => e.id !== id)
        })),

      favorito: (id: string) => {
        return get().carrito.find((e) => e.id === id) ? true : false
      }

      // fin del store
    }),
    { name: 'micarrito' }
  )
  // fin del persist
)
