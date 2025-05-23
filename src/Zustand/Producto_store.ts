// Producto_store.ts
import { create } from 'zustand'
import { comentarios_productos, detalle_producto } from '../Services'
import { producto, comentarios_producto } from '../Componentes/types'

type producto_store = {
  producto: producto | null
  comentarios: comentarios_producto[]
  solicitar_producto: (id: string) => void
  solicitar_comentarios: (id: string) => void
  setear_producto: (producto: producto) => void
}

export const producto_store = create<producto_store>((set) => ({
  producto: null,
  comentarios: [],
  solicitar_producto: async (id) => {
    set({ producto: null })
    const { producto } = await detalle_producto(id)
    const res = producto[0]
    set({ producto: res })
  },
  solicitar_comentarios: async (id) => {
    const res = await comentarios_productos(id)
    set({ comentarios: res })
  },
  setear_producto: (producto: producto) => set({ producto })
}))
