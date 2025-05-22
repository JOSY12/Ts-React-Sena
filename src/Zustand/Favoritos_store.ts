import { agregar_favorito, favoritos, quitar_favorito } from './../Services'
import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import { favorito } from '../Componentes/types'
// []refactorizar esta store y pasarla quiza unir las 2 estores carrito y favoritos en una sola store para mas limpieza y menos archivos
// [] quiza agregar una store de datos de usuario para evitar hacer tantas peticiones que requieran la id
// [] crear store de perfil de usuario para asi poder tener las direcciones y datos de entrega y pago en un store quiza
// NOTE todo esto es una idea puede cambiar o no implementarse
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
