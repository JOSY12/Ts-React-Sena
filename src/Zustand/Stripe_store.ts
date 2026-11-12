import { create } from 'zustand'
import { comprar_stripe } from '../features/compras/api'
import { userTask } from '../shared/api/user-task'

type State = {
  url: string
  busy: boolean
  error: string | null
  pagar: (id: string) => Promise<boolean>
  reset: () => void
}
const initial = { url: '', busy: false, error: null }
let request = 0
export const Stripe_store = create<State>((set, get) => ({
  ...initial,
  reset: () => {
    request++
    set(initial)
  },
  pagar: async (id) => {
    if (get().busy) return false
    const current = ++request
    set({ url: '', busy: true, error: null })
    const completed = await userTask(
      () => comprar_stripe(id),
      (url) => {
        if (current === request) set({ url, busy: false })
      },
      (error) => {
        if (current === request) set({ error, busy: false })
      }
    )
    return completed && current === request
  }
}))
