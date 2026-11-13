import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiStar } from 'react-icons/fi'
import ProductImage from '../shared/ui/ProductImage'
import type { productoprops } from './types'
const Producto_landing = ({ producto }: { producto: productoprops }) => (
  <Link className='product-card landing-card' to={`/productos/${producto.id}`}>
    <div className='product-media'>
      <div className='product-badges'>
        {producto.nuevo && <span className='tag tag-lime'>Nuevo</span>}
        {Number(producto.calificacion) > 0 && (
          <span className='tag'>
            <FiStar aria-hidden='true' />
            {producto.calificacion}
          </span>
        )}
      </div>
      <ProductImage src={producto.imagen} alt={producto.nombre} loading='lazy' />
    </div>
    <div className='product-info'>
      <h3>{producto.nombre}</h3>
      <div className='product-price'>
        <span>${Number(producto.precio).toLocaleString()}</span>
        <span className='card-arrow'>
          <FiArrowUpRight aria-hidden='true' />
        </span>
      </div>
    </div>
  </Link>
)
export default Producto_landing
