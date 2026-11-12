import { useLoaderData, useParams } from 'react-router-dom'
import type { EditableProductResponse, tcategorias } from '../types'
import ProductForm from './ProductForm'
const Editor_productos = () => {
  const { id } = useParams()
  const data = useLoaderData<{
    categorias: tcategorias[]
    detalle: EditableProductResponse
  }>()
  const product = data.detalle.producto[0]
  if (!product)
    return (
      <p role='alert' className='p-6'>
        No se encontr? el producto.
      </p>
    )
  return (
    <ProductForm
      key={id}
      id={id}
      mode='edit'
      initialCategories={data.categorias}
      initialProduct={product}
    />
  )
}
export default Editor_productos
