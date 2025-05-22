import { create } from 'zustand'
import { comentarios_productos, detalle_producto } from '../Services'
import { comentario, producto } from '../Componentes/types'
// []refactorizar esta store y pasarla a producto reemplazar todas las variables que no corresponden
type producto_store = {
  producto: producto
  comentarios: comentario[]
  solicitar_producto: (id: string) => void
  solicitar_comentarios: (id: string) => void
}

export const Notificaciones_store = create<producto_store>()((set) => ({
  producto: null as unknown as producto,
  comentarios: [],
  solicitar_producto: async (id) => {
    const res = await detalle_producto(id)
    set(() => ({
      producto: res
    }))
  },
  solicitar_comentarios: async (id) => {
    const res = await comentarios_productos(id)

    set(() => ({
      comentarios: res
    }))
  }
}))
