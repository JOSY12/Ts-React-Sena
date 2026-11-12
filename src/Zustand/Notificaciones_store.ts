import { create } from 'zustand'
import type { notificacionesprops, LoadStatus } from '../Componentes/types'
import * as api from '../features/usuario/api'
import { userTask, deduplicateUserLoad } from '../shared/api/user-task'

type State = {
  misnotificaciones: notificacionesprops[]
  status: LoadStatus
  error: string | null
  busy: boolean
  solicitar_notificicaciones: () => Promise<boolean>
  quitar: (id: string) => Promise<boolean>
  borrar_todo: () => Promise<boolean>
  marcar_vistos: () => Promise<boolean>
  reset: () => void
}
const initial = {
  misnotificaciones: [],
  status: 'idle' as LoadStatus,
  error: null,
  busy: false
}
let request = 0
export const Notificaciones_store = create<State>((set, get) => {
  const mutate = async (task: () => Promise<void>, apply: () => void) => {
    if (get().busy) return false
    request++
    set({ busy: true, error: null })
    return userTask(
      task,
      () => {
        apply()
        set({ busy: false, status: 'success' })
      },
      (error) => set({ error, busy: false, status: 'error' })
    )
  }
  return {
    ...initial,
    reset: () => {
      request++
      set(initial)
    },
    solicitar_notificicaciones: deduplicateUserLoad(async () => {
      if (get().busy) return false
      const current = ++request
      set({ status: 'loading', error: null })
      return userTask(
        api.usuario_notificaciones,
        (misnotificaciones) => {
          if (current === request) set({ misnotificaciones, status: 'success' })
        },
        (error) => {
          if (current === request) set({ error, status: 'error' })
        }
      )
    }),
    quitar: (id) =>
      mutate(
        () => api.borrar_notificaciones(id),
        () =>
          set((state) => ({
            misnotificaciones: state.misnotificaciones.filter((item) => item.id !== id)
          }))
      ),
    borrar_todo: () =>
      mutate(api.borrar_todas_notificaciones, () => set({ misnotificaciones: [] })),
    marcar_vistos: () =>
      mutate(api.marcar_visto, () =>
        set((state) => ({
          misnotificaciones: state.misnotificaciones.map((item) => ({
            ...item,
            visto: true
          }))
        }))
      )
  }
})
