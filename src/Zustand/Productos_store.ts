import { create } from 'zustand'
import { todo_productos } from '../Services'
import { productoprops } from '../Componentes/types'
// []refactorizar esta store y pasarla a producto reemplazar todas las variables que no corresponden
type productos_store = {
  productos: productoprops[]
  solicitar_productos: () => void
}

export const Notificaciones_store = create<productos_store>()((set) => ({
  productos: [],

  solicitar_productos: async () => {
    const res = await todo_productos()
    set(() => ({
      productos: Array.isArray(res) ? res : []
    }))
  }
}))
