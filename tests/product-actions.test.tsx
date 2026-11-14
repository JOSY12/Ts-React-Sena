import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import Producto from '../src/Componentes/Producto'
import type { productoprops } from '../src/Componentes/types'
import * as compras from '../src/features/compras/api'
import * as usuario from '../src/features/usuario/api'
import { syncSession } from '../src/shared/api/session'

vi.mock('@clerk/react', () => ({
  Show: ({ children, when }: { children: ReactNode; when: string }) =>
    when === 'signed-in' ? children : null
}))

let session = 0
beforeEach(() =>
  syncSession(`product-actions-${++session}`, async () => 'token', 'buyer')
)
afterEach(() => {
  delete document.documentElement.dataset.theme
})

function deferred() {
  let resolve!: () => void
  let reject!: (error: Error) => void
  const promise = new Promise<void>((done, fail) => {
    resolve = done
    reject = fail
  })
  return { promise, resolve, reject }
}
function show() {
  const product: productoprops = {
    id: 'a',
    nombre: 'Producto A',
    precio: 20,
    imagen: 'https://example.com/product.webp',
    categorias: ['Accesorios'],
    calificacion: '0',
    estado: 'Disponible'
  }
  render(
    <MemoryRouter>
      <Producto producto={product} />
      <Producto producto={{ ...product, id: 'b', nombre: 'Producto B' }} />
      <Producto
        producto={{ ...product, id: 'c', nombre: 'Agotado', estado: 'Agotado' }}
      />
    </MemoryRouter>
  )
  const cards = screen.getAllByRole('article')
  return (index: number, name: string) =>
    within(cards[index]).getByRole('button', { name }) as HTMLButtonElement
}

describe('acciones independientes de las tarjetas del catálogo', () => {
  it.each(['light', 'dark'])(
    'solo el favorito pulsado muestra carga en modo %s',
    async (theme) => {
      document.documentElement.dataset.theme = theme
      const pending = deferred()
      const add = vi.spyOn(usuario, 'agregar_favorito').mockReturnValue(pending.promise)
      vi.spyOn(usuario, 'favoritos').mockResolvedValue([{ id: 'a' }])
      const button = show()
      const selected = button(0, 'Cambiar favorito')
      const other = button(1, 'Cambiar favorito')
      await userEvent.setup().click(selected)
      expect(selected.getAttribute('aria-busy')).toBe('true')
      expect(selected.getAttribute('data-pending-elsewhere')).toBe('false')
      expect(other.getAttribute('aria-busy')).toBe('false')
      expect(other.getAttribute('data-pending-elsewhere')).toBe('true')
      expect(other.getAttribute('aria-pressed')).toBe('false')
      expect(other.disabled).toBe(true)
      expect(button(0, 'Cambiar carrito').disabled).toBe(false)
      await userEvent.setup().click(other)
      expect(add).toHaveBeenCalledExactlyOnceWith('a')
      await act(async () => pending.resolve())
      await waitFor(() => expect(selected.getAttribute('aria-busy')).toBe('false'))
      expect(selected.getAttribute('aria-pressed')).toBe('true')
      expect(other.getAttribute('aria-pressed')).toBe('false')
      expect(other.disabled).toBe(false)
    }
  )
  it.each(['light', 'dark'])(
    'solo el carrito pulsado muestra carga en modo %s',
    async (theme) => {
      document.documentElement.dataset.theme = theme
      const pending = deferred()
      const add = vi.spyOn(compras, 'agregar_carrito').mockReturnValue(pending.promise)
      vi.spyOn(compras, 'carrito').mockResolvedValue([
        { id: 'a', cantidad: 1, stock: 10 }
      ])
      const button = show()
      const selected = button(0, 'Cambiar carrito')
      const other = button(1, 'Cambiar carrito')
      await userEvent.setup().click(selected)
      expect(selected.getAttribute('aria-busy')).toBe('true')
      expect(other.getAttribute('aria-busy')).toBe('false')
      expect(other.getAttribute('data-pending-elsewhere')).toBe('true')
      expect(other.getAttribute('aria-pressed')).toBe('false')
      // Out-of-stock products retain their normal disabled appearance.
      expect(button(2, 'Cambiar carrito').getAttribute('data-pending-elsewhere')).toBe(
        'false'
      )
      await userEvent.setup().click(other)
      expect(add).toHaveBeenCalledExactlyOnceWith('a', 1)
      await act(async () => pending.resolve())
      await waitFor(() => expect(selected.getAttribute('aria-busy')).toBe('false'))
      expect(selected.getAttribute('aria-pressed')).toBe('true')
      expect(other.getAttribute('aria-pressed')).toBe('false')
      expect(button(2, 'Cambiar carrito').disabled).toBe(true)
    }
  )
  it('un fallo termina la carga local sin marcar otros productos', async () => {
    const pending = deferred()
    vi.spyOn(usuario, 'agregar_favorito').mockReturnValue(pending.promise)
    const button = show()
    await userEvent.setup().click(button(0, 'Cambiar favorito'))
    await act(async () => pending.reject(new Error('offline')))
    await waitFor(() =>
      expect(button(0, 'Cambiar favorito').getAttribute('aria-busy')).toBe('false')
    )
    for (const index of [0, 1]) {
      expect(button(index, 'Cambiar favorito').disabled).toBe(false)
      expect(button(index, 'Cambiar favorito').getAttribute('aria-pressed')).toBe(
        'false'
      )
    }
  })
})
