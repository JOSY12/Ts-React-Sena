import { describe, expect, it } from 'vitest'
import { parseFilters, serializeFilters } from '../src/shared/utils/filters'
import {
  normalizeProductList,
  normalizePublicProduct,
  normalizeEditableProduct
} from '../src/shared/api/contracts'

const product = {
  nombre: 'Teléfono',
  precio: '100',
  stock: '5',
  estado: 'Disponible',
  descripcion: 'Descripción de prueba',
  fotos: [{ public_id: 'photo', url: 'https://example.com/photo.webp' }],
  categorias: [{ id: 'cat', nombre: 'Telefonos' }]
}

describe('URL de filtros', () => {
  it('normaliza páginas inválidas y categorías duplicadas', () => {
    const filters = parseFilters(
      new URLSearchParams(
        'Pagina=-2&Categorias=Telefonos,Telefonos,,Computadoras&Minimo=no'
      )
    )
    expect(filters.Pagina).toBe(1)
    expect(filters.Categorias).toEqual(['Telefonos', 'Computadoras'])
    expect(filters.Minimo).toBe('')
  })
  it('conserva la búsqueda al serializar, compartir o volver por historial', () => {
    const filters = parseFilters(
      new URLSearchParams(
        'Nombre=  café &Categorias=Teléfonos&Minimo=50&Maximo=20&Pagina=3'
      )
    )
    expect(filters.Minimo).toBe('20')
    expect(filters.Maximo).toBe('50')
    expect(parseFilters(serializeFilters(filters))).toEqual(filters)
  })
  it('admite el nombre antiguo de categoría y rechaza páginas fraccionarias', () => {
    expect(
      parseFilters(new URLSearchParams('Categoria=Accesorios&Pagina=1.5'))
    ).toMatchObject({ Categorias: ['Accesorios'], Pagina: 1 })
  })
})

describe('contratos del catálogo', () => {
  it('normaliza el detalle público y mantiene objetos para el editor', () => {
    expect(normalizePublicProduct(product)).toMatchObject({
      precio: 100,
      stock: 5,
      fotos: ['https://example.com/photo.webp'],
      categorias: ['Telefonos']
    })
    expect(normalizeEditableProduct(product).fotos).toEqual(product.fotos)
    expect(normalizeEditableProduct(product).categorias).toEqual(product.categorias)
  })
  it('admite las fotos y categorías públicas como strings', () => {
    expect(
      normalizePublicProduct({
        ...product,
        fotos: ['https://example.com/a.webp'],
        categorias: ['Telefonos']
      }).fotos
    ).toEqual(['https://example.com/a.webp'])
  })
  it('distingue una respuesta vacía válida de un error del servidor', () => {
    expect(
      normalizeProductList({ Productos: [], totalPaginas: 0, Pagina: 1 }).Productos
    ).toEqual([])
    expect(() => normalizeProductList({ message: 'falló' })).toThrow()
    expect(() => normalizePublicProduct({ ...product, stock: -1 })).toThrow()
    expect(() => normalizePublicProduct({ ...product, stock: 1.5 })).toThrow()
  })
  it('conserva el caso vacío heredado de APIGeneral sin ocultar otros errores', () => {
    expect(
      normalizeProductList({ error: 'No hay productos disponibles' }).Productos
    ).toEqual([])
    expect(() => normalizeProductList({ error: 'No tienes permisos' })).toThrow()
  })
})
