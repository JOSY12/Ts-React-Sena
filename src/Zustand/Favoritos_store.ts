import { create } from 'zustand'
import type { favorito, LoadStatus } from '../Componentes/types'
import * as api from '../features/usuario/api'
import { userTask, deduplicateUserLoad } from '../shared/api/user-task'

type State = {
  favoritos: favorito[]
  status: LoadStatus
  error: string | null
  busy: boolean
  agregar: (id: string) => Promise<boolean>
  quitar: (id: string) => Promise<boolean>
  favorito: (id: string) => boolean
  solicitar_favoritos: () => Promise<boolean>
  reset: () => void
}
const initial = {
  favoritos: [],
  status: 'idle' as LoadStatus,
  error: null,
  busy: false
}
let request = 0
export const favoritos_store = create<State>((set, get) => ({
  ...initial,
  reset: () => {
    request++
    set(initial)
  },
  favorito: (id) => get().favoritos.some((item) => item.id === id),
  solicitar_favoritos: deduplicateUserLoad(async () => {
    if (get().busy) return false
    const current = ++request
    set({ status: 'loading', error: null })
    return userTask(
      api.favoritos,
      (favoritos) => {
        if (current === request) set({ favoritos, status: 'success' })
      },
      (error) => {
        if (current === request) set({ status: 'error', error })
      }
    )
  }),
  agregar: async (id) => {
    if (get().busy || get().favorito(id)) return false
    request++
    set({ busy: true, error: null })
    return userTask(
      async () => {
        await api.agregar_favorito(id)
        return api.favoritos()
      },
      (favoritos) => set({ favoritos, busy: false, status: 'success' }),
      (error) => set({ error, busy: false, status: 'error' })
    )
  },
  quitar: async (id) => {
    if (get().busy) return false
    request++
    set({ busy: true, error: null })
    return userTask(
      () => api.quitar_favorito(id),
      () =>
        set((state) => ({
          favoritos: state.favoritos.filter((item) => item.id !== id),
          busy: false,
          status: 'success'
        })),
      (error) => set({ error, busy: false, status: 'error' })
    )
  }
}))
