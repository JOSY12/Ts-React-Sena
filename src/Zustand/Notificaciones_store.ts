import { create } from 'zustand'
import {
  borrar_notificaciones,
  borrar_todas_notificaciones,
  marcar_visto,
  usuario_notificaciones
} from '../Services'

type notificaciones = {
  id: string
  icono: string
  titulo: string
  descripcion: string
  fecha_creacion: string
  visto: boolean
  fecha_relativa: string
}

type notificaciones_store = {
  misnotificaciones: notificaciones[]
  solicitar_notificicaciones: () => void
  quitar: (id: string) => void
  borrar_todo: () => void
  marcar_vistos: () => void
}

export const Notificaciones_store = create<notificaciones_store>()((set) => ({
  misnotificaciones: [],

  solicitar_notificicaciones: async () => {
    const res = await usuario_notificaciones()

    set({ misnotificaciones: Array.isArray(res) ? res : [] })
  },

  marcar_vistos: async () => {
    await marcar_visto()
  },

  quitar: async (id: string) => {
    await borrar_notificaciones(id)
    set(({ misnotificaciones }) => ({
      misnotificaciones: misnotificaciones.filter((e) => e.id !== id)
    }))
  },

  borrar_todo: async () => {
    await borrar_todas_notificaciones()
    set({ misnotificaciones: [] })
  }
  // contar: () => {
  //   if (Array.isArray(get().misnotificaciones)) {
  //     const e = get().misnotificaciones.filter((e) => e.visto === false)
  //     return e.length
  //   }
  //   return 0
  // }
}))
