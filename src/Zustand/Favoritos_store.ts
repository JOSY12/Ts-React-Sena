import { agregar_favorito, favoritos, quitar_favorito } from './../Services'
import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import { favorito } from '../Componentes/types'

interface favoritos_store {
  favoritos: favorito[]

  agregar: (id: string) => void
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

      agregar: async (id: string) => {
        set(({ favoritos }) => ({
          favoritos: favoritos.find((e) => e.id === id)
            ? favoritos
            : [...favoritos, { id }]
        }))
        await agregar_favorito(id)
      },

      quitar: async (id: string) => {
        set(({ favoritos }) => ({
          favoritos: favoritos.filter((e) => e.id !== id)
        }))

        await quitar_favorito(id)
      },

      favorito: (id: string) => !!get().favoritos.find((e) => e.id === id),

      solicitar_favoritos: async () => {
        const res = await favoritos()
        set(() => ({
          favoritos: Array.isArray(res) ? res : []
        }))
      }

      // fin del store
    }),
    { name: 'misfavoritos' }
  )
  // fin del persist
)
