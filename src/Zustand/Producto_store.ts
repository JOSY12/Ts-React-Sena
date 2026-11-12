import { create } from 'zustand'
import type { comentarios_producto, LoadStatus } from '../Componentes/types'
import { comentarios_productos } from '../features/catalogo/api'
import { errorMessage } from '../shared/api/errors'

type State = {
  comentarios: comentarios_producto[]
  status: LoadStatus
  error: string | null
  solicitar_comentarios: (id: string) => Promise<boolean>
}
let request = 0
export const producto_store = create<State>((set) => ({
  comentarios: [],
  status: 'idle',
  error: null,
  solicitar_comentarios: async (id) => {
    const current = ++request
    set({ comentarios: [], status: 'loading', error: null })
    try {
      const comentarios = await comentarios_productos(id)
      if (current !== request) return false
      set({ comentarios, status: 'success' })
      return true
    } catch (error) {
      if (current === request) set({ error: errorMessage(error), status: 'error' })
      return false
    }
  }
}))
