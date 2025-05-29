// Producto_store.ts
import { create } from 'zustand'
import { comprar_stripe } from '../Services'

type Stripe_store = {
  url: string
  pagar: (id: string) => void
}

export const Stripe_store = create<Stripe_store>((set) => ({
  url: '',
  pagar: async (id) => {
    const link = await comprar_stripe(id)
    console.log('intento de pago')
    set(() => ({
      url: typeof link === 'string' ? link : ''
    }))
  }
}))
