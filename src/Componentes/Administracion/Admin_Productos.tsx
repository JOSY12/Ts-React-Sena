import { useLoaderData } from 'react-router-dom'
import type { tcategorias } from '../types'
import ProductForm from './ProductForm'
const Admin_Productos = () => {
  const data = useLoaderData<tcategorias[]>()
  return <ProductForm mode='create' initialCategories={data} />
}
export default Admin_Productos
