import { create } from 'zustand'
import {
  borrar_notificaciones,
  borrar_todas_notificaciones,
  marcar_visto,
  usuario_notificaciones
} from '../Services'

type notificaciones = {
  id: string
  titulo: string
  descripcion: string
  fecha_creacion: string
  visto: boolean
}

type notificaciones_store = {
  misnotificaciones: notificaciones[]
  solicitar_notificicaciones: () => void
  quitar: (id: string) => void
  borrar_todo: () => void
  actualizar_notificaciones: () => void
  contar: () => number
}

export const Notificaciones_store = create<notificaciones_store>()(
  (set, get) => ({
    misnotificaciones: [],

    solicitar_notificicaciones: async () => {
      const res = await usuario_notificaciones()

      set(() => ({
        misnotificaciones: res
      }))
    },

    actualizar_notificaciones: async () => {
      const res = await usuario_notificaciones()
      await marcar_visto()
      set(() => ({
        misnotificaciones: res
      }))
    },

    quitar: async (id: string) => {
      await borrar_notificaciones(id)
      set(({ misnotificaciones }) => ({
        misnotificaciones: misnotificaciones.filter((e) => e.id !== id)
      }))
    },

    borrar_todo: async () => {
      await borrar_todas_notificaciones()
      set(() => ({
        misnotificaciones: []
      }))
    },
    contar: () => {
      return get().misnotificaciones.length
    }
  })
)
