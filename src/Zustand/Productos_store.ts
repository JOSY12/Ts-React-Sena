import { categorias, todo_productos } from './../Services'
import { create } from 'zustand'
import { productoprops, tcategorias } from '../Componentes/types'
// []refactorizar esta store y pasarla a producto reemplazar todas las variables que no corresponden
type productos_store = {
  productos: productoprops[]
  solicitar_productos: () => void
  categorias: tcategorias[]
  solicitar_categorias: () => void
  filtros: []
  buscar_con_filtros: (datos: any) => void
}

export const productos_store = create<productos_store>()((set) => ({
  productos: [],
  categorias: [],
  filtros: [],

  solicitar_productos: async () => {
    const res = await todo_productos('')

    set({ productos: Array.isArray(res) ? res : [] })
  },
  solicitar_categorias: async () => {
    const res = await categorias()

    set({ categorias: Array.isArray(res) ? res : [] })
  },

  buscar_con_filtros: async (datos) => {
    console.log(datos)
    const res = await todo_productos(datos)
    // [] terminar los filtros pulir el filtro de query a la perfeccion
    set({ filtros: datos, productos: Array.isArray(res) ? res : [] })
  }
}))
