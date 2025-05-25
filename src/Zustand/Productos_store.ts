import { categorias, todo_productos } from './../Services'
import { create } from 'zustand'
import { productoprops, tcategorias } from '../Componentes/types'
// []refactorizar esta store y pasarla a producto reemplazar todas las variables que no corresponden
type productos_store = {
  productos: productoprops[]
  solicitar_productos: () => void
  categorias: tcategorias[]
  solicitar_categorias: () => void
}

export const productos_store = create<productos_store>()((set) => ({
  productos: [],
  categorias: [],

  solicitar_productos: async () => {
    const res = await todo_productos()

    set({ productos: Array.isArray(res) ? res : [] })
  },
  solicitar_categorias: async () => {
    const res = await categorias()

    set({ categorias: Array.isArray(res) ? res : [] })
  }
}))
