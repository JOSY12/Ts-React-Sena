import { landing, productoprops } from './../Componentes/types'
import {
  lading_page,
  todo_productos,
  todo_productos_admin
} from './../Services'
import { create } from 'zustand'
type productos_store = {
  productos: productoprops[]
  productos_admin: productoprops[]

  solicitar_productos_admin: (filtro: any) => void
  solicitar_productos: (filtro: any) => void

  lading_page_datos: landing
  set_productos: (productos: productoprops) => void
  set_productos_admin: (productos: productoprops) => void

  lading_page_solicitar: () => void
}

export const productos_store = create<productos_store>()((set) => ({
  productos: [],
  productos_admin: [],
  lading_page_datos: { Recientes: [], Valorados: [] },

  solicitar_productos: async (filtro) => {
    const res = await todo_productos(filtro)

    set({ productos: Array.isArray(res.Productos) ? res.Productos : [] })
  },
  solicitar_productos_admin: async (filtro) => {
    const res = await todo_productos_admin(filtro)

    set({ productos_admin: Array.isArray(res.Productos) ? res.Productos : [] })
  },
  set_productos: async (productos) => {
    set({ productos: Array.isArray(productos) ? productos : [] })
  },
  set_productos_admin: async (productos) => {
    set({ productos_admin: Array.isArray(productos) ? productos : [] })
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
export const set_productos_admin =
  productos_store.getState().set_productos_admin
export const set_productos = productos_store.getState().set_productos
