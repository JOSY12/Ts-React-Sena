import { productos_store } from '../../Zustand/Productos_store'
import { carrito_store } from '../../Zustand/Carrito_store'
import { favoritos_store } from '../../Zustand/Favoritos_store'
import { Direcciones_usuario } from '../../Zustand/Direcciones_usuario'
import { Notificaciones_store } from '../../Zustand/Notificaciones_store'
import { Stripe_store } from '../../Zustand/Stripe_store'
import { configureSession } from './client'

let activeSession: string | null | undefined
let access = { userId: null as string | null, admin: false }
export const sessionAccess = () => access
export function syncSession(
  id: string | null,
  token: () => Promise<string | null>,
  userId: string | null = id,
  admin = false
) {
  access = { userId, admin }
  configureSession(id, token)
  if (id === activeSession) return
  activeSession = id
  productos_store.getState().resetAdmin()
  carrito_store.getState().reset()
  favoritos_store.getState().reset()
  Direcciones_usuario.getState().reset()
  Notificaciones_store.getState().reset()
  Stripe_store.getState().reset()
  // Discard the old unscoped cache, never hydrate another user's purchases.
  try {
    localStorage.removeItem('micarrito')
    localStorage.removeItem('misfavoritos')
  } catch {
    /* Storage may be unavailable. */
  }
}
