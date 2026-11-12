import { create } from 'zustand'
import type { direccion, LoadStatus } from '../Componentes/types'
import * as api from '../features/usuario/api'
import { userTask, deduplicateUserLoad } from '../shared/api/user-task'

type State = {
  misdirecciones: direccion[]
  status: LoadStatus
  error: string | null
  busy: boolean
  solicitar_direcciones: () => Promise<boolean>
  quitar: (id: string) => Promise<boolean>
  cambiar_predeterminado: (id: string) => Promise<boolean>
  agregar_direciones: (datos: direccion) => Promise<boolean>
  reset: () => void
}
const initial = {
  misdirecciones: [],
  status: 'idle' as LoadStatus,
  error: null,
  busy: false
}
let request = 0
export const Direcciones_usuario = create<State>((set, get) => {
  const mutate = async (task: () => Promise<void>) => {
    if (get().busy) return false
    request++
    set({ busy: true, error: null })
    return userTask(
      async () => {
        await task()
        return api.obtener_direcciones()
      },
      (misdirecciones) => set({ misdirecciones, busy: false, status: 'success' }),
      (error) => set({ error, busy: false, status: 'error' })
    )
  }
  return {
    ...initial,
    reset: () => {
      request++
      set(initial)
    },
    solicitar_direcciones: deduplicateUserLoad(async () => {
      if (get().busy) return false
      const current = ++request
      set({ status: 'loading', error: null })
      return userTask(
        api.obtener_direcciones,
        (misdirecciones) => {
          if (current === request) set({ misdirecciones, status: 'success' })
        },
        (error) => {
          if (current === request) set({ status: 'error', error })
        }
      )
    }),
    agregar_direciones: (datos) => mutate(() => api.agregar_direccion(datos)),
    quitar: (id) => mutate(() => api.eliminar_direccion(id)),
    cambiar_predeterminado: (id) =>
      mutate(() => api.actualizar_direccion_predeterminada(id))
  }
})
