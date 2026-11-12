import { axiosbackend, requiredId } from '../../shared/api/client'
import {
  array,
  normalizeEditableProduct,
  normalizeProductList,
  normalizePublicProduct,
  record
} from '../../shared/api/contracts'
import { notify } from '../../shared/api/notifications'
import type { ProductFilters } from '../../shared/utils/filters'
import type {
  comentario,
  comentarios_producto,
  EditableProductResponse,
  landing,
  producto,
  ProductResponse,
  tcategorias
} from '../../Componentes/types'

export const todo_productos = async (filtros: ProductFilters, signal?: AbortSignal) =>
  normalizeProductList(
    (await axiosbackend.get('/pu/productos', { params: filtros, signal })).data
  )

export const todo_productos_admin = async (
  filtros: ProductFilters,
  signal?: AbortSignal
) =>
  normalizeProductList(
    (await axiosbackend.get('/pu/productos_admin', { params: filtros, signal })).data
  )

export const lading_page = async (): Promise<landing> => {
  const data = record((await axiosbackend.get('/pu/inicio_landing_page')).data)
  if (data.error === 'No hay productos disponibles')
    return { Recientes: [], Valorados: [] }
  return { Recientes: array(data.Recientes), Valorados: array(data.Valorados) }
}

export const detalle_producto = async (
  id: string,
  signal?: AbortSignal
): Promise<ProductResponse> => {
  const data = record(
    (await axiosbackend.get(`/pu/productos/${requiredId(id)}`, { signal })).data
  )
  return { producto: array<unknown>(data.producto).map(normalizePublicProduct) }
}

export const detalle_producto_editar = async (
  id: string
): Promise<EditableProductResponse> => {
  const data = record(
    (await axiosbackend.get(`/p/detalle_producto_editar/${requiredId(id)}`)).data
  )
  return { producto: array<unknown>(data.producto).map(normalizeEditableProduct) }
}

export const comentarios_productos = async (id: string, signal?: AbortSignal) => {
  const data = record(
    (await axiosbackend.get(`/pu/comentarios/${requiredId(id)}`, { signal })).data
  )
  return array<comentarios_producto>(data.comentarios)
}

export const crear_comentario = (comentario: comentario) =>
  notify(
    async () => {
      await axiosbackend.post('/p/crear_comentario', comentario)
    },
    'Creando comentario',
    'Comentario publicado correctamente'
  )

export const categorias = async () =>
  array<tcategorias>((await axiosbackend.get('/pu/categorias')).data)
export const crear_categoria = (nombre: string) =>
  notify(
    async () => {
      if (!nombre.trim()) throw new Error('El nombre de la categoría es requerido.')
      await axiosbackend.post('/p/crear_categoria', { nombre: nombre.trim() })
    },
    'Creando categoría',
    'Categoría creada correctamente'
  )

export const crear_producto = (producto: producto) =>
  notify(
    async () => {
      await axiosbackend.post('/p/crear_producto', producto)
    },
    'Creando producto',
    'Producto creado correctamente'
  )
export const actualizar_producto = (id: string, producto: producto) =>
  notify(
    async () => {
      await axiosbackend.put(`/p/productos/${requiredId(id)}`, producto)
    },
    'Actualizando producto',
    'Producto actualizado correctamente'
  )

export const eliminar_producto = (id: string) =>
  notify(
    async () => {
      await axiosbackend.delete(`/p/productos/${requiredId(id)}`)
    },
    'Eliminando producto',
    'Producto eliminado correctamente'
  )
