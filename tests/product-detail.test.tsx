import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import type { ReactNode } from 'react'
import DetallesProducto from '../src/Componentes/DetallesProducto'
import { carrito_store } from '../src/Zustand/Carrito_store'
import { producto_store } from '../src/Zustand/Producto_store'

vi.mock('@clerk/react', () => ({
  Show: ({ children, when }: { children: ReactNode; when: string }) =>
    when === 'signed-in' ? children : null
}))
beforeEach(() => {
  carrito_store.getState().reset()
  vi.spyOn(producto_store.getState(), 'solicitar_comentarios').mockResolvedValue(true)
})
function show(stock: number) {
  const router = createMemoryRouter(
    [
      {
        path: '/productos/:id',
        loader: () => ({
          producto: [
            {
              nombre: 'Equipo de prueba',
              precio: 20,
              stock,
              estado: 'Disponible',
              descripcion: 'Descripción del equipo',
              fotos: ['https://example.com/photo.webp'],
              categorias: ['Computadoras']
            }
          ]
        }),
        element: <DetallesProducto />
      }
    ],
    { initialEntries: ['/productos/p'] }
  )
  render(<RouterProvider router={router} />)
}
describe('detalle y cantidades después del rediseño', () => {
  it('admite inventario grande sin crear millones de opciones', async () => {
    show(10000000)
    const input = await screen.findByRole('spinbutton', { name: 'Cantidad' })
    expect(input.getAttribute('max')).toBe('10000')
    expect(document.querySelectorAll('option')).toHaveLength(0)
  })
  it('envía la cantidad elegida y bloquea valores fuera del inventario', async () => {
    const add = vi.spyOn(carrito_store.getState(), 'agregar').mockResolvedValue(true)
    show(4)
    const input = await screen.findByRole('spinbutton', { name: 'Cantidad' })
    const button = screen.getByRole('button', {
      name: 'Agregar al carrito'
    }) as HTMLButtonElement
    fireEvent.change(input, { target: { value: '5' } })
    expect(button.disabled).toBe(true)
    fireEvent.change(input, { target: { value: '2' } })
    await userEvent.setup().click(button)
    expect(add).toHaveBeenCalledWith('p', 2)
  })
  it('no permite comprar un producto sin existencias', async () => {
    show(0)
    const button = (await screen.findByRole('button', {
      name: 'No disponible'
    })) as HTMLButtonElement
    expect(button.disabled).toBe(true)
  })
})
