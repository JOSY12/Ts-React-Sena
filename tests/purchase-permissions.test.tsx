import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import type { item_carrito } from '../src/Componentes/types'
import DetallesCompra from '../src/Componentes/Detalles_compra'
import { carrito_store } from '../src/Zustand/Carrito_store'
import * as api from '../src/features/compras/api'

const fixture = vi.hoisted(() => ({ rows: [] as item_carrito[] }))
vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal<typeof import('react-router-dom')>()),
  useLoaderData: () => fixture.rows,
  useParams: () => ({ id: 'cs_test_order' })
}))
beforeEach(() => {
  carrito_store.getState().reset()
  fixture.rows = [
    {
      id: 'product',
      nombre: 'Producto local',
      precio: 20,
      cantidad: 1,
      enviado: false,
      recibido: false,
      puede_marcar_enviado: false,
      puede_marcar_recibido: false
    }
  ]
})
function open() {
  render(
    <MemoryRouter>
      <DetallesCompra />
    </MemoryRouter>
  )
}
describe('acciones de pedido autorizadas por APIGeneral', () => {
  it('el comprador confirma su pedido enviado sin ofrecer acciones de administrador', async () => {
    fixture.rows[0].enviado = true
    fixture.rows[0].puede_marcar_recibido = true
    const received = vi.spyOn(api, 'marcar_recibido').mockResolvedValue()
    open()
    expect(screen.queryByRole('button', { name: 'Marcar como enviado' })).toBeNull()
    await userEvent.click(
      await screen.findByRole('button', { name: 'Marcar como recibido' })
    )
    await waitFor(() => expect(received).toHaveBeenCalledWith('cs_test_order'))
  })
  it('el administrador envia un pedido ajeno sin poder confirmar su recepcion', async () => {
    fixture.rows[0].puede_marcar_enviado = true
    const shipped = vi.spyOn(api, 'marcar_enviado').mockResolvedValue()
    open()
    await userEvent.click(
      await screen.findByRole('button', { name: 'Marcar como enviado' })
    )
    await waitFor(() => expect(shipped).toHaveBeenCalledWith('cs_test_order'))
    expect(screen.queryByRole('button', { name: 'Marcar como recibido' })).toBeNull()
  })
  it('un administrador puede confirmar una compra propia si el servidor lo autoriza', async () => {
    fixture.rows[0].enviado = true
    fixture.rows[0].puede_marcar_enviado = true
    fixture.rows[0].puede_marcar_recibido = true
    const received = vi.spyOn(api, 'marcar_recibido').mockResolvedValue()
    open()
    await userEvent.click(
      await screen.findByRole('button', { name: 'Marcar como recibido' })
    )
    await waitFor(() => expect(received).toHaveBeenCalledWith('cs_test_order'))
  })
  it('no ofrece acciones si el servidor las deniega, aunque el pedido este enviado', () => {
    fixture.rows[0].enviado = true
    open()
    expect(screen.queryByRole('button', { name: 'Marcar como enviado' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Marcar como recibido' })).toBeNull()
  })
})
