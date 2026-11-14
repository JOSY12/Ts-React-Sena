import ProductImage from '../shared/ui/ProductImage'
import { Link } from 'react-router-dom'
import { Show } from '@clerk/react'
import { FiArrowUpRight, FiStar } from 'react-icons/fi'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsCartPlus, BsCartCheckFill } from 'react-icons/bs'
import type { productoprops } from './types'
import { favoritos_store } from '../Zustand/Favoritos_store'
import { carrito_store } from '../Zustand/Carrito_store'
const Producto = ({ producto }: { producto: productoprops }) => {
  const favorite = favoritos_store((state) => state.favorito(producto.id))
  const favoriteBusy = favoritos_store((state) => state.busy)
  const inCart = carrito_store((state) => state.encarrito(producto.id))
  const cartBusy = carrito_store((state) => state.busy)
  return (
    <article className='product-card'>
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
        <Link to={`/productos/${producto.id}`}>
          <ProductImage src={producto.imagen} alt={producto.nombre} loading='lazy' />
        </Link>
        <Show when='signed-in'>
          <div className='product-actions'>
            <button
              className='icon-button'
              aria-label='Cambiar favorito'
              aria-pressed={favorite}
              disabled={favoriteBusy}
              onClick={() => {
                const state = favoritos_store.getState()
                void (favorite ? state.quitar(producto.id) : state.agregar(producto.id))
              }}
            >
              {favorite ? (
                <AiFillHeart className='favorite-active' aria-hidden='true' />
              ) : (
                <AiOutlineHeart aria-hidden='true' />
              )}
            </button>
            <button
              className='icon-button'
              aria-label='Cambiar carrito'
              aria-pressed={inCart}
              disabled={cartBusy || (!inCart && producto.estado !== 'Disponible')}
              onClick={() => {
                const state = carrito_store.getState()
                void (inCart ? state.quitar(producto.id) : state.agregar(producto.id))
              }}
            >
              {inCart ? (
                <BsCartCheckFill aria-hidden='true' />
              ) : (
                <BsCartPlus aria-hidden='true' />
              )}
            </button>
          </div>
        </Show>
      </div>
      <div className='product-info'>
        <p className='product-categories'>{producto.categorias.join(' / ')}</p>
        <Link to={`/productos/${producto.id}`}>
          <h3>{producto.nombre}</h3>
        </Link>
        <div className='product-price'>
          <span>${Number(producto.precio).toLocaleString()}</span>
          <Link
            className='card-arrow'
            to={`/productos/${producto.id}`}
            aria-label={`Ver ${producto.nombre}`}
          >
            <FiArrowUpRight aria-hidden='true' />
          </Link>
        </div>
      </div>
    </article>
  )
}
export default Producto
