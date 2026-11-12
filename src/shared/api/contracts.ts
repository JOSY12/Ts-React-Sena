import { ApiError } from './errors'
import type {
  DetalleProducto,
  Foto,
  producto,
  ProductListResponse,
  productoprops,
  tcategorias
} from '../../Componentes/types'

export function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new ApiError('El servidor devolvió datos no válidos.')
  return value as Record<string, unknown>
}

export function array<T>(value: unknown): T[] {
  if (!Array.isArray(value))
    throw new ApiError('El servidor devolvió una lista no válida.')
  return value as T[]
}

function number(value: unknown): number {
  if (
    (typeof value !== 'number' && typeof value !== 'string') ||
    value === '' ||
    !Number.isFinite(Number(value))
  ) {
    throw new ApiError('El servidor devolvió un valor numérico no válido.')
  }
  return Number(value)
}

function text(value: unknown): string {
  if (typeof value !== 'string')
    throw new ApiError('El servidor devolvió un texto no válido.')
  return value
}

export function normalizePhoto(value: unknown): Foto {
  if (typeof value === 'string') return { url: value, public_id: value }
  const photo = record(value)
  return { url: text(photo.url ?? photo.secure_url), public_id: text(photo.public_id) }
}

export function normalizeEditableProduct(value: unknown): producto {
  const data = record(value)
  return {
    nombre: text(data.nombre),
    descripcion: text(data.descripcion),
    estado: text(data.estado),
    precio: number(data.precio),
    stock: number(data.stock),
    fotos: array<unknown>(data.fotos).map(normalizePhoto),
    categorias: array<unknown>(data.categorias).map((value) => {
      const category = record(value)
      return {
        id: text(category.id),
        nombre: text(category.nombre)
      } satisfies tcategorias
    }),
    nuevo: data.nuevo === true
  }
}

export function normalizePublicProduct(value: unknown): DetalleProducto {
  const data = record(value)
  const stock = number(data.stock)
  if (!Number.isSafeInteger(stock) || stock < 0)
    throw new ApiError('El stock recibido no es válido.')
  return {
    nombre: text(data.nombre),
    descripcion: text(data.descripcion),
    estado: text(data.estado),
    precio: number(data.precio),
    stock,
    fotos: array<unknown>(data.fotos).map((value) => normalizePhoto(value).url),
    categorias: array<unknown>(data.categorias).map((value) =>
      typeof value === 'string' ? value : text(record(value).nombre)
    ),
    nuevo: data.nuevo === true
  }
}

export function normalizeProductList(value: unknown): ProductListResponse {
  const data = record(value)
  // APIGeneral's existing successful empty-list response, kept during its refactor.
  if (data.error === 'No hay productos disponibles')
    return { Productos: [], totalPaginas: 1, Pagina: 1 }
  return {
    Productos: array<productoprops>(data.Productos),
    totalPaginas: Math.max(1, Math.trunc(number(data.totalPaginas ?? 1))),
    Pagina: Math.max(1, Math.trunc(number(data.Pagina ?? 1)))
  }
}
