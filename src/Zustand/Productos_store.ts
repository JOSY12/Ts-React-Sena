import { categorias, lading_page, todo_productos } from './../Services'
import { create } from 'zustand'
import { misfiltros, productoprops, tcategorias } from '../Componentes/types'
type productos_store = {
  productos: productoprops[]
  solicitar_productos: (filtro: any) => void
  categorias: tcategorias[]
  solicitar_categorias: () => void
  filtros: misfiltros
  buscar_con_filtros: (datos: any) => void
  quitar_check: (nombre: string) => void
  agregar_check: (nombre: string) => void
  check_categoria: (nombre: string) => boolean
  lading_page_datos: productoprops[]

  lading_page_solicitar: () => void
}

export const productos_store = create<productos_store>()((set, get) => ({
  productos: [],
  categorias: [],
  filtros: {
    Nombre: '',
    Maximo: '',
    Minimo: '',
    Categorias: []
  },
  lading_page_datos: [],

  solicitar_productos: async (filtro) => {
    const res = await todo_productos(filtro)

    set({ productos: Array.isArray(res) ? res : [] })
  },
  solicitar_categorias: async () => {
    const res = await categorias()

    set({ categorias: Array.isArray(res) ? res : [] })
  },

  buscar_con_filtros: async (datos) => {
    const res = await todo_productos(datos)
    // [] terminar los filtros pulir el filtro de query a la perfeccion
    set({
      filtros: {
        Nombre: datos.Nombre ?? '',
        Maximo: datos.Maximo ?? '',
        Minimo: datos.Minimo ?? '',
        Categorias: datos.Categorias ?? []
      },
      productos: Array.isArray(res) ? res : []
    })
  },
  quitar_check: (nombre) => {
    set(({ filtros }) => ({
      filtros: {
        ...filtros,
        Categorias: filtros.Categorias.filter((e) => e !== nombre)
      }
    }))
  },
  agregar_check: (nombre) => {
    set(({ filtros }) => ({
      filtros: {
        ...filtros,
        Categorias: filtros.Categorias.includes(nombre)
          ? filtros.Categorias
          : [...filtros.Categorias, nombre]
      }
    }))
  },
  check_categoria: (nombre) => {
    return get().filtros.Categorias.includes(nombre)
  },
  lading_page_solicitar: async () => {
    const res = await lading_page()
    console.log(res)
    set({ lading_page_datos: Array.isArray(res) ? res : [] })
  }
}))
