import { set_productos, set_productos_admin } from './Productos_store'
import { categorias, todo_productos, todo_productos_admin } from './../Services'
import { create } from 'zustand'
import { misfiltros, tcategorias } from '../Componentes/types'

//
type filtros_store = {
  filtros: misfiltros
  categorias: tcategorias[]
  solicitar_categorias: () => void
  buscar_con_filtros: (datos: any) => void
  buscar_con_filtros_admin: (datos: any) => void
  quitar_check: (nombre: string) => void
  agregar_check: (nombre: string) => void
  check_categoria: (nombre: string) => boolean
}
export const filtros_store = create<filtros_store>()((set, get) => ({
  categorias: [],
  filtros: {
    Nombre: '',
    Maximo: '',
    Minimo: '',
    Categorias: [],
    Paginas: 1,
    Pagina: 1
  },

  solicitar_categorias: async () => {
    const res = await categorias()

    set({ categorias: Array.isArray(res) ? res : [] })
  },

  buscar_con_filtros: async (datos) => {
    const res = await todo_productos(datos)

    set({
      filtros: {
        Nombre: datos.Nombre ?? '',
        Maximo: datos.Maximo ?? '',
        Minimo: datos.Minimo ?? '',
        Categorias: datos.Categorias ?? [],
        Paginas: res.totalPaginas ?? 1,
        Pagina: res.Pagina ?? 1
      }
    })
    set_productos(res.Productos)
  },
  buscar_con_filtros_admin: async (datos) => {
    const res = await todo_productos_admin(datos)
    set({
      filtros: {
        Nombre: datos.Nombre ?? '',
        Maximo: datos.Maximo ?? '',
        Minimo: datos.Minimo ?? '',
        Categorias: datos.Categorias ?? [],
        Paginas: res.totalPaginas ?? 1,
        Pagina: res.Pagina ?? 1
      }
    })
    set_productos_admin(res.Productos)
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
  }
}))
