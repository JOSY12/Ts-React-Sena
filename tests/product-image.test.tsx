import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import ProductImage from '../src/shared/ui/ProductImage'

describe('imágenes de producto', () => {
  it('usa respaldo local al fallar y recupera una URL nueva sin perder el texto alternativo', () => {
    const { rerender } = render(
      <ProductImage src='https://example.org/failure.png' alt='Teléfono' />
    )
    const image = screen.getByRole('img', { name: 'Teléfono' }) as HTMLImageElement
    fireEvent.error(image)
    expect(image.getAttribute('src')).toBeTruthy()
    expect(image.getAttribute('src')).not.toBe('https://example.org/failure.png')
    rerender(<ProductImage src='https://example.org/new.png' alt='Teléfono' />)
    expect(image.getAttribute('src')).toBe('https://example.org/new.png')
  })
})
