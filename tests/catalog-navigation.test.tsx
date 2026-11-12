import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import Filtros from '../src/Componentes/Filtros'
import Productos from '../src/Componentes/Productos'
import * as api from '../src/features/catalogo/api'
import { filtros_store } from '../src/Zustand/Filtros_store'

function Back() {
  const navigate = useNavigate()
  return <button onClick={() => navigate(-1)}>Atrás</button>
}

describe('búsqueda e historial', () => {
  it('URL, formulario y consulta vuelven juntos al navegar atrás', async () => {
    filtros_store.setState({ categorias: [], status: 'success', error: null })
    const load = vi
      .spyOn(api, 'todo_productos')
      .mockResolvedValue({ Productos: [], Pagina: 1, totalPaginas: 1 })
    render(
      <MemoryRouter initialEntries={['/productos?Nombre=primero&Pagina=2']}>
        <Filtros />
        <Productos />
        <Back />
      </MemoryRouter>
    )
    await waitFor(() =>
      expect(load).toHaveBeenCalledWith(
        expect.objectContaining({ Nombre: 'primero', Pagina: 2 }),
        expect.any(AbortSignal)
      )
    )
    const input = screen.getByRole('textbox', {
      name: 'Buscar producto'
    }) as HTMLInputElement
    const user = userEvent.setup()
    await user.clear(input)
    await user.type(input, 'segundo')
    await user.click(screen.getByRole('button', { name: 'Buscar productos' }))
    await waitFor(() =>
      expect(load).toHaveBeenLastCalledWith(
        expect.objectContaining({ Nombre: 'segundo', Pagina: 1 }),
        expect.any(AbortSignal)
      )
    )
    await user.click(screen.getByRole('button', { name: 'Atrás' }))
    await waitFor(() => expect(input.value).toBe('primero'))
    expect(load).toHaveBeenLastCalledWith(
      expect.objectContaining({ Nombre: 'primero', Pagina: 2 }),
      expect.any(AbortSignal)
    )
    expect(
      screen.getByText('No se encontraron productos con estos filtros.')
    ).toBeTruthy()
  })
})
