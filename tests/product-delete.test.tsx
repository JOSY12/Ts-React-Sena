import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ProductoAdministrado from '../src/Componentes/Administracion/Producto_administrado'
import { eliminar_producto } from '../src/features/catalogo/api'

vi.mock('../src/features/catalogo/api', () => ({ eliminar_producto: vi.fn() }))
function row(onDeleted = vi.fn()) {
  render(
    <MemoryRouter>
      <table>
        <tbody>
          <ProductoAdministrado
            id='product'
            nombre='Teléfono'
            precio={100}
            imagen=''
            estado='Disponible'
            categorias={[]}
            calificacion='4'
            onDeleted={onDeleted}
          />
        </tbody>
      </table>
    </MemoryRouter>
  )
  return onDeleted
}

describe('confirmación de eliminación', () => {
  it('abrir y cancelar el diálogo nunca elimina un producto', async () => {
    row()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))
    expect(screen.getByRole('dialog', { name: 'Eliminar producto' })).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(eliminar_producto).not.toHaveBeenCalled()
  })
  it('solo confirma y actualiza el listado después de una respuesta exitosa', async () => {
    vi.mocked(eliminar_producto).mockResolvedValue()
    const reload = row()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))
    await user.click(screen.getByRole('button', { name: 'Confirmar eliminación' }))
    await waitFor(() => expect(eliminar_producto).toHaveBeenCalledWith('product'))
    await waitFor(() => expect(reload).toHaveBeenCalledTimes(1))
  })
  it('un rechazo conserva el diálogo y no actualiza el listado como si hubiera éxito', async () => {
    vi.mocked(eliminar_producto).mockRejectedValue(new Error('falló'))
    const reload = row()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))
    await user.click(screen.getByRole('button', { name: 'Confirmar eliminación' }))
    await waitFor(() => expect(screen.getByRole('alert')).toBeTruthy())
    expect(reload).not.toHaveBeenCalled()
    expect(screen.getByRole('dialog', { name: 'Eliminar producto' })).toBeTruthy()
  })
})
