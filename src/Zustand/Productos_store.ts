import { create } from 'zustand'
import axios from 'axios'
import type { landing, LoadStatus, productoprops } from '../Componentes/types'
import {
  lading_page,
  todo_productos,
  todo_productos_admin
} from '../features/catalogo/api'
import type { ProductFilters } from '../shared/utils/filters'
import { errorMessage } from '../shared/api/errors'

type State = {
  productos: productoprops[]
  productos_admin: productoprops[]
  status: LoadStatus
  adminStatus: LoadStatus
  error: string | null
  adminError: string | null
  paginas: number
  paginas_admin: number
  resetAdmin: () => void
  solicitar_productos: (
    filtro: ProductFilters,
    signal?: AbortSignal
  ) => Promise<boolean>
  solicitar_productos_admin: (
    filtro: ProductFilters,
    signal?: AbortSignal
  ) => Promise<boolean>
  lading_page_datos: landing
  landingStatus: LoadStatus
  landingError: string | null
  lading_page_solicitar: () => Promise<boolean>
}
let publicRequest = 0
let adminRequest = 0
let landingRequest: Promise<boolean> | null = null
export const productos_store = create<State>((set, get) => ({
  productos: [],
  productos_admin: [],
  status: 'idle',
  adminStatus: 'idle',
  error: null,
  adminError: null,
  paginas: 1,
  paginas_admin: 1,
  lading_page_datos: { Recientes: [], Valorados: [] },
  landingStatus: 'idle',
  landingError: null,
  resetAdmin: () => {
    adminRequest++
    set({
      productos_admin: [],
      paginas_admin: 1,
      adminStatus: 'idle',
      adminError: null
    })
  },
  solicitar_productos: async (filtro, signal) => {
    const request = ++publicRequest
    set({ status: 'loading', error: null })
    try {
      const data = await todo_productos(filtro, signal)
      if (request !== publicRequest || signal?.aborted) return false
      set({ productos: data.Productos, paginas: data.totalPaginas, status: 'success' })
      return true
    } catch (error) {
      if (request === publicRequest && !axios.isCancel(error) && !signal?.aborted)
        set({ status: 'error', error: errorMessage(error) })
      return false
    }
  },
  solicitar_productos_admin: async (filtro, signal) => {
    const request = ++adminRequest
    set({ adminStatus: 'loading', adminError: null })
    try {
      const data = await todo_productos_admin(filtro, signal)
      if (request !== adminRequest || signal?.aborted) return false
      set({
        productos_admin: data.Productos,
        paginas_admin: data.totalPaginas,
        adminStatus: 'success'
      })
      return true
    } catch (error) {
      if (request === adminRequest && !axios.isCancel(error) && !signal?.aborted)
        set({ adminStatus: 'error', adminError: errorMessage(error) })
      return false
    }
  },
  lading_page_solicitar: async () => {
    if (landingRequest) return landingRequest
    if (get().landingStatus === 'success') return true
    set({ landingStatus: 'loading', landingError: null })
    landingRequest = (async () => {
      try {
        set({ lading_page_datos: await lading_page(), landingStatus: 'success' })
        return true
      } catch (error) {
        set({ landingStatus: 'error', landingError: errorMessage(error) })
        return false
      } finally {
        landingRequest = null
      }
    })()
    return landingRequest
  }
}))
