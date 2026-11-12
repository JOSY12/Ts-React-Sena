import { create } from 'zustand'
import { categorias } from '../features/catalogo/api'
import type { LoadStatus, tcategorias } from '../Componentes/types'
import { errorMessage } from '../shared/api/errors'

type State = {
  categorias: tcategorias[]
  status: LoadStatus
  error: string | null
  solicitar_categorias: () => Promise<boolean>
}
let pending: Promise<boolean> | null = null
export const filtros_store = create<State>((set, get) => ({
  categorias: [],
  status: 'idle',
  error: null,
  solicitar_categorias: async () => {
    if (pending) return pending
    if (get().status === 'success') return true
    set({ status: 'loading', error: null })
    pending = (async () => {
      try {
        set({ categorias: await categorias(), status: 'success' })
        return true
      } catch (error) {
        set({ error: errorMessage(error), status: 'error' })
        return false
      } finally {
        pending = null
      }
    })()
    return pending
  }
}))
