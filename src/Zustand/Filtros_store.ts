import { productos_store } from './Productos_store'
import { todo_productos } from './../Services'
import { create } from 'zustand'
import { misfiltros } from '../Componentes/types'
const set_productos = productos_store((state) => state.set_productos)
type filtros_store = {
  filtros: misfiltros
  buscar_con_filtros: (datos: any) => void
  quitar_check: (nombre: string) => void
  agregar_check: (nombre: string) => void
  check_categoria: (nombre: string) => boolean
}
// [] verificar si los filtros funcionan por separados de productos_store
export const filtros_store = create<filtros_store>()((set, get) => ({
  filtros: {
    Nombre: '',
    Maximo: '',
    Minimo: '',
    Categorias: []
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
      }
      //   productos: Array.isArray(res) ? res : []
    })
    set_productos(res)
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
