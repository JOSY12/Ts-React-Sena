import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductForm from '../src/Componentes/Administracion/ProductForm'
import * as services from '../src/Services'
import type { producto } from '../src/Componentes/types'

vi.mock('../src/Services', () => ({
  categorias: vi.fn(),
  crear_categoria: vi.fn(),
  crear_producto: vi.fn(),
  actualizar_producto: vi.fn(),
  subircloudinary: vi.fn()
}))
const product: producto = {
  nombre: 'Producto de prueba',
  precio: 100,
  stock: 10,
  estado: 'Disponible',
  descripcion: 'Descripción suficientemente larga',
  fotos: [{ public_id: 'photo', url: 'https://example.com/photo.webp' }],
  categorias: [{ id: 'category', nombre: 'Telefonos' }]
}

describe('editor compartido', () => {
  it.each([0, 1, 4, 1001])(
    'permite editar con stock válido de %i sin alterar existencias',
    async (stock) => {
      const save = vi.mocked(services.actualizar_producto).mockResolvedValue()
      render(
        <ProductForm
          mode='edit'
          id='p'
          initialCategories={product.categorias}
          initialProduct={{ ...product, stock }}
        />
      )
      await userEvent
        .setup()
        .click(screen.getByRole('button', { name: 'Guardar cambios' }))
      await waitFor(() => expect(save).toHaveBeenCalledWith('p', { ...product, stock }))
    }
  )
  it('rechaza inventarios negativos y conserva el borrador', async () => {
    render(
      <ProductForm
        mode='edit'
        id='p'
        initialCategories={product.categorias}
        initialProduct={{ ...product, stock: -1 }}
      />
    )
    await userEvent
      .setup()
      .click(screen.getByRole('button', { name: 'Guardar cambios' }))
    await screen.findByText('mínimo 0 unidades')
    expect(services.actualizar_producto).not.toHaveBeenCalled()
  })
  it('valida la descripción antes de enviar y recorta espacios del nombre', async () => {
    const save = vi.mocked(services.actualizar_producto).mockResolvedValue()
    render(
      <ProductForm
        mode='edit'
        id='p'
        initialCategories={product.categorias}
        initialProduct={product}
      />
    )
    fireEvent.change(screen.getByLabelText('nombre'), {
      target: { value: '  Nombre actualizado  ' }
    })
    fireEvent.change(screen.getByLabelText('Descripción'), {
      target: { value: 'x'.repeat(10001) }
    })
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Guardar cambios' }))
    await screen.findByText('Usa un máximo de 10000 caracteres.')
    expect(save).not.toHaveBeenCalled()
    fireEvent.change(screen.getByLabelText('Descripción'), {
      target: { value: '  Descripción válida  ' }
    })
    await user.click(screen.getByRole('button', { name: 'Guardar cambios' }))
    await waitFor(() =>
      expect(save).toHaveBeenCalledWith(
        'p',
        expect.objectContaining({
          nombre: 'Nombre actualizado',
          descripcion: 'Descripción válida'
        })
      )
    )
  })
  it('un guardado fallido conserva el borrador, fotos y categorías', async () => {
    const save = vi
      .mocked(services.actualizar_producto)
      .mockRejectedValue(new Error('offline'))
    render(
      <ProductForm
        mode='edit'
        id='p'
        initialCategories={product.categorias}
        initialProduct={product}
      />
    )
    const user = userEvent.setup()
    const name = screen.getByPlaceholderText('Nombre producto') as HTMLInputElement
    await user.clear(name)
    await user.type(name, 'Borrador modificado')
    await user.click(screen.getByRole('button', { name: 'Guardar cambios' }))
    await waitFor(() => expect(save).toHaveBeenCalledTimes(1))
    expect(name.value).toBe('Borrador modificado')
    expect(save.mock.calls[0]).toEqual([
      'p',
      { ...product, nombre: 'Borrador modificado' }
    ])
    expect(
      screen
        .getAllByRole('img')
        .some((img) => img.getAttribute('src') === product.fotos[0].url)
    ).toBe(true)
  })
  it('guardar correctamente no vacía las fotos del editor', async () => {
    const save = vi.mocked(services.actualizar_producto).mockResolvedValue()
    render(
      <ProductForm
        mode='edit'
        id='p'
        initialCategories={product.categorias}
        initialProduct={product}
      />
    )
    await userEvent
      .setup()
      .click(screen.getByRole('button', { name: 'Guardar cambios' }))
    await waitFor(() => expect(save).toHaveBeenCalledTimes(1))
    await waitFor(() =>
      expect(
        (screen.getByPlaceholderText('Nombre producto') as HTMLInputElement).value
      ).toBe(product.nombre)
    )
    expect(
      screen
        .getAllByRole('img')
        .some((img) => img.getAttribute('src') === product.fotos[0].url)
    ).toBe(true)
  })
  it('elegir una categoría no envía el producto', async () => {
    render(
      <ProductForm
        mode='create'
        initialCategories={[{ id: 'c', nombre: 'Accesorios' }]}
      />
    )
    await userEvent.setup().click(screen.getByRole('button', { name: 'Accesorios' }))
    expect(services.crear_producto).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Accesorios' })).toBeTruthy()
  })
  it('Enter en la nueva categoría no envía el formulario del producto', async () => {
    vi.mocked(services.crear_categoria).mockResolvedValue()
    vi.mocked(services.categorias).mockResolvedValue([
      ...product.categorias,
      { id: 'new', nombre: 'Nueva categoría' }
    ])
    render(
      <ProductForm
        mode='create'
        initialProduct={product}
        initialCategories={product.categorias}
      />
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Agregar categoría' }))
    await user.type(
      screen.getByRole('textbox', { name: 'Nueva categoria de productos' }),
      'Nueva categoría{Enter}'
    )
    await waitFor(() =>
      expect(services.crear_categoria).toHaveBeenCalledWith('Nueva categoría')
    )
    expect(services.crear_producto).not.toHaveBeenCalled()
  })
})
