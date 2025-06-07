import { landing, productoprops } from './../Componentes/types'
import { lading_page, todo_productos } from './../Services'
import { create } from 'zustand'
type productos_store = {
  productos: productoprops[]
  solicitar_productos: (filtro: any) => void
  lading_page_datos: landing
  set_productos: (productos: productoprops) => void
  lading_page_solicitar: () => void
}

export const productos_store = create<productos_store>()((set) => ({
  productos: [],

  lading_page_datos: { Recientes: [], Valorados: [] },

  solicitar_productos: async (filtro) => {
    const res = await todo_productos(filtro)

    set({ productos: Array.isArray(res.Productos) ? res.Productos : [] })
  },
  set_productos: async (productos) => {
    set({ productos: Array.isArray(productos) ? productos : [] })
  },

  lading_page_solicitar: async () => {
    const res = await lading_page()
    if (
      res &&
      typeof res === 'object' &&
      'Recientes' in res &&
      'Valorados' in res
    ) {
      set({ lading_page_datos: res as landing })
    } else {
      set({ lading_page_datos: { Recientes: [], Valorados: [] } })
    }
  }
}))
export const set_productos = productos_store.getState().set_productos
