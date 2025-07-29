import { direccion } from '../Componentes/types'
import {
  actualizar_direccion_predeterminada,
  agregar_direccion,
  eliminar_direccion,
  obtener_direcciones
} from './../Services'
import { create } from 'zustand'

type Direcciones_usuario = {
  misdirecciones: direccion[]
  solicitar_direcciones: () => void
  quitar: (id: string) => void
  cambiar_predeterminado: (id: string) => void

  agregar_direciones: (datos: direccion) => void
}

export const Direcciones_usuario = create<Direcciones_usuario>()((set) => ({
  misdirecciones: [],

  solicitar_direcciones: async () => {
    const res = await obtener_direcciones()

    set({ misdirecciones: Array.isArray(res) ? res : [] })
  },
  agregar_direciones: async (datos: direccion) => {
    const dato = await agregar_direccion(datos)
    console.log(dato)
    if (dato !== 'ya existe') {
      set(({ misdirecciones }) => ({
        misdirecciones: misdirecciones.find((e) => e.id === datos.id)
          ? misdirecciones
          : [...misdirecciones, datos]
      }))
    }
  },
  quitar: async (id: string) => {
    const res = await eliminar_direccion(id)
    if (res === 'borrado') {
      set(({ misdirecciones }) => ({
        misdirecciones: misdirecciones.filter((e) => e.id !== id)
      }))
    }
  },
  cambiar_predeterminado: async (id: string) => {
    await actualizar_direccion_predeterminada(id)

    const res = await obtener_direcciones()

    set({ misdirecciones: Array.isArray(res) ? res : [] })

    // set({ misdirecciones: Array.isArray(res) ? res : [] })
  }
}))
