import { create } from 'zustand'
import type { compras_hechas, item_carrito, LoadStatus } from '../Componentes/types'
import * as api from '../features/compras/api'
import { MAX_CART_QUANTITY } from '../features/compras/limits'
import { userTask, deduplicateUserLoad } from '../shared/api/user-task'

type State = {
  carrito: item_carrito[]
  compras: compras_hechas[]
  detalle_compra: item_carrito[]
  detalleId: string | null
  status: LoadStatus
  error: string | null
  busy: boolean
  comprasStatus: LoadStatus
  comprasError: string | null
  detalleStatus: LoadStatus
  detalleError: string | null
  agregar: (id: string, cantidad?: number) => Promise<boolean>
  aumentar: (id: string) => Promise<boolean>
  restar: (id: string) => Promise<boolean>
  quitar: (id: string) => Promise<boolean>
  encarrito: (id: string) => boolean
  solicitar_carrito: () => Promise<boolean>
  solicitar_compras: () => Promise<boolean>
  solicitar_detalle_compra: (id: string) => Promise<boolean>
  setear_detalle_compra: (data: item_carrito[], id: string) => void
  enviar_compra: (id: string) => Promise<boolean>
  enviar_recibido: (id: string) => Promise<boolean>
  total: () => number
  reset: () => void
}
const initial = {
  carrito: [],
  compras: [],
  detalle_compra: [],
  detalleId: null,
  status: 'idle' as LoadStatus,
  error: null,
  busy: false,
  comprasStatus: 'idle' as LoadStatus,
  comprasError: null,
  detalleStatus: 'idle' as LoadStatus,
  detalleError: null
}
let cartRequest = 0
let detailRequest = 0
let purchasesRequest = 0
export const carrito_store = create<State>((set, get) => {
  const mutate = async (task: () => Promise<item_carrito[]>) => {
    if (get().busy) return false
    set({ busy: true, error: null })
    const request = ++cartRequest
    return userTask(
      task,
      (carrito) => {
        if (request === cartRequest) set({ carrito, status: 'success', busy: false })
      },
      (error) => {
        if (request === cartRequest) set({ error, busy: false, status: 'error' })
      }
    )
  }
  const changeQuantity = async (id: string, delta: number) => {
    const item = get().carrito.find((item) => item.id === id)
    if (!item) return false
    const cantidad = item.cantidad + delta
    if (
      !Number.isSafeInteger(cantidad) ||
      cantidad < 1 ||
      cantidad > MAX_CART_QUANTITY ||
      (item.stock != null && cantidad > item.stock)
    )
      return false
    return mutate(async () => {
      await api.cambiar_cantidad(id, cantidad)
      return get().carrito.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      )
    })
  }
  const updatePurchase = async (id: string, received: boolean) => {
    if (get().busy) return false
    set({ busy: true, detalleError: null })
    return userTask(
      async () => {
        await (received ? api.marcar_recibido(id) : api.marcar_enviado(id))
      },
      () => {
        const flags = received ? { recibido: true } : { enviado: true }
        set((state) => ({
          busy: false,
          detalle_compra:
            state.detalleId === id
              ? state.detalle_compra.map((item) => ({ ...item, ...flags }))
              : state.detalle_compra,
          compras: state.compras.map((item) =>
            item.sesion_id_compra === id ? { ...item, ...flags } : item
          )
        }))
      },
      (detalleError) => set({ detalleError, busy: false })
    )
  }
  return {
    ...initial,
    reset: () => {
      cartRequest++
      detailRequest++
      purchasesRequest++
      set(initial)
    },
    agregar: async (id, cantidad = 1) => {
      if (
        !id ||
        !Number.isSafeInteger(cantidad) ||
        cantidad < 1 ||
        cantidad > MAX_CART_QUANTITY
      )
        return false
      return mutate(async () => {
        await api.agregar_carrito(id, cantidad)
        return api.carrito()
      })
    },
    aumentar: (id) => changeQuantity(id, 1),
    restar: (id) => changeQuantity(id, -1),
    quitar: (id) =>
      mutate(async () => {
        await api.quitar_carrito(id)
        return get().carrito.filter((item) => item.id !== id)
      }),
    encarrito: (id) => get().carrito.some((item) => item.id === id),
    total: () =>
      get().carrito.reduce((sum, item) => sum + (item.precio ?? 0) * item.cantidad, 0),
    solicitar_carrito: deduplicateUserLoad(async () => {
      if (get().busy) return false
      const request = ++cartRequest
      set({ status: 'loading', error: null })
      return userTask(
        api.carrito,
        (carrito) => {
          if (request === cartRequest) set({ carrito, status: 'success' })
        },
        (error) => {
          if (request === cartRequest) set({ status: 'error', error })
        }
      )
    }),
    solicitar_compras: deduplicateUserLoad(async () => {
      const request = ++purchasesRequest
      set({ comprasStatus: 'loading', comprasError: null })
      return userTask(
        api.historial_compras,
        (compras) => {
          if (request === purchasesRequest) set({ compras, comprasStatus: 'success' })
        },
        (comprasError) => {
          if (request === purchasesRequest)
            set({ comprasStatus: 'error', comprasError })
        }
      )
    }),
    solicitar_detalle_compra: async (id) => {
      const request = ++detailRequest
      set({
        detalle_compra: [],
        detalleId: id,
        detalleStatus: 'loading',
        detalleError: null
      })
      return userTask(
        () => api.detalle_compra(id),
        (detalle_compra) => {
          if (request === detailRequest)
            set({ detalle_compra, detalleStatus: 'success' })
        },
        (detalleError) => {
          if (request === detailRequest) set({ detalleError, detalleStatus: 'error' })
        }
      )
    },
    setear_detalle_compra: (detalle_compra, detalleId) => {
      detailRequest++
      set({ detalle_compra, detalleId, detalleStatus: 'success', detalleError: null })
    },
    enviar_compra: (id) => updatePurchase(id, false),
    enviar_recibido: (id) => updatePurchase(id, true)
  }
})
