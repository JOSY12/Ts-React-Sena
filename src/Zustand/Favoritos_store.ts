import { agregar_favorito, favoritos, quitar_favorito } from './../Services'
import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import { productoprops } from '../Componentes/types'

interface favoritos_store {
  favoritos: productoprops[]

  agregar: (producto: productoprops) => void
  quitar: (id: string) => void
  favorito: (id: string) => boolean
  solicitar_favoritos: () => void
}
export const favoritos_store = create<favoritos_store>()(
  persist(
    // inicio del persist
    (set, get) => ({
      // inicio de store
      favoritos: [],

      agregar: async (producto: productoprops) => {
        set(({ favoritos }) => ({
          favoritos: favoritos.find((e) => e.id === producto.id)
            ? favoritos
            : [...favoritos, producto]
        }))
        agregar_favorito(producto.id)
      },

      quitar: async (id: string) => {
        set(({ favoritos }) => ({
          favoritos: favoritos.filter((e) => e.id !== id)
        }))

        quitar_favorito(id)
      },

      favorito: (id: string) => {
        if (get().favoritos.length) {
          return get().favoritos.find((e) => e.id === id) ? true : false
        } else {
          return false
        }
      },

      solicitar_favoritos: async () => {
        const res = await favoritos()
        set(() => ({
          favoritos: res
        }))
      }

      // fin del store
    }),
    { name: 'misfavoritos' }
  )
  // fin del persist
)
