import { useEffect, useState } from 'react'
import { useParams, useLoaderData, Link } from 'react-router-dom'
import { Show } from '@clerk/react'
import { FiArrowLeft, FiArrowUpRight, FiShoppingBag } from 'react-icons/fi'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import ProductImage from '../shared/ui/ProductImage'
import RequestState from '../shared/ui/RequestState'
import Comentarios from './Comentarios'
import Agregar_comentario from './Agregar_comentario'
import { favoritos_store } from '../Zustand/Favoritos_store'
import { carrito_store } from '../Zustand/Carrito_store'
import { producto_store } from '../Zustand/Producto_store'
import { MAX_CART_QUANTITY } from '../features/compras/limits'
const DetallesProducto = () => {
  const { id = '' } = useParams()
  return <ProductDetails key={id} />
}
const ProductDetails = () => {
  const data = useLoaderData<import('./types').ProductResponse>()
  const { id = '' } = useParams()
  const producto = data.producto[0] ?? null
  const favorite = favoritos_store((state) => state.favorito(id))
  const favoriteBusy = favoritos_store((state) => state.busy)
  const inCart = carrito_store((state) => state.encarrito(id))
  const cartBusy = carrito_store((state) => state.busy)
  const load = producto_store((state) => state.solicitar_comentarios)
  const comments = producto_store((state) => state.comentarios)
  const status = producto_store((state) => state.status)
  const error = producto_store((state) => state.error)
  const [photo, setPhoto] = useState('')
  const activePhoto = producto?.fotos.includes(photo)
    ? photo
    : (producto?.fotos[0] ?? '')
  const [quantity, setQuantity] = useState(1)
  useEffect(() => {
    if (id) void load(id)
  }, [id, load])
  if (!producto)
    return (
      <div className='page-width cart-empty'>
        <h1>Producto no encontrado</h1>
        <Link className='button button-lime' to='/productos'>
          Volver al catálogo
        </Link>
      </div>
    )
  const available = producto.estado === 'Disponible' && producto.stock > 0
  const maxQuantity = Math.min(producto.stock, MAX_CART_QUANTITY)
  const validQuantity =
    Number.isSafeInteger(quantity) && quantity >= 1 && quantity <= maxQuantity
  return (
    <div className='product-detail page-width'>
      <Link className='text-link detail-back' to='/productos'>
        <FiArrowLeft aria-hidden='true' />
        Volver al catálogo
      </Link>
      <section className='detail-layout' aria-label='Detalle del producto'>
        <div className='detail-gallery'>
          <div className='detail-main-photo'>
            <ProductImage src={activePhoto} alt={producto.nombre} />
            {producto.nuevo && <span className='tag tag-lime'>Nuevo</span>}
          </div>
          <div className='detail-thumbnails' aria-label='Fotos del producto'>
            {producto.fotos.map((src, index) => (
              <button
                key={src}
                aria-label={`Ver foto ${index + 1}`}
                aria-pressed={activePhoto === src}
                onClick={() => setPhoto(src)}
              >
                <ProductImage src={src} alt='' loading='lazy' />
              </button>
            ))}
          </div>
        </div>
        <div className='detail-copy'>
          <p className='eyebrow'>TU SIGUIENTE NIVEL</p>
          <div className='detail-category-links'>
            {producto.categorias.map((category) => (
              <Link
                key={category}
                to={`/productos?Categorias=${encodeURIComponent(category)}`}
              >
                {category}
              </Link>
            ))}
          </div>
          <h1>{producto.nombre}</h1>
          <p className='detail-description'>{producto.descripcion}</p>
          <div className='detail-stock'>
            <span
              className={available ? 'stock-indicator available' : 'stock-indicator'}
            />
            {available
              ? `${producto.stock} unidades disponibles`
              : producto.estado === 'Disponible'
                ? 'Sin existencias'
                : producto.estado}
          </div>
          <p className='detail-price'>
            ${Number(producto.precio).toLocaleString()}
            <span> USD / unidad</span>
          </p>
          <div className='detail-purchase'>
            <Show when='signed-in'>
              {inCart ? (
                <div>
                  <Link className='button button-lime' to='/u/carrito'>
                    Ver en mi carrito <FiArrowUpRight aria-hidden='true' />
                  </Link>
                  <button
                    className='text-link favorite-toggle'
                    disabled={cartBusy}
                    onClick={() => void carrito_store.getState().quitar(id)}
                  >
                    Quitar del carrito
                  </button>
                </div>
              ) : (
                <div className='detail-buy-row'>
                  <label>
                    Cantidad
                    <input
                      type='number'
                      min={1}
                      max={maxQuantity}
                      step={1}
                      value={quantity}
                      disabled={!available || cartBusy}
                      onChange={(event) => setQuantity(Number(event.target.value))}
                    />
                  </label>
                  <button
                    className='button button-lime'
                    disabled={!available || !validQuantity || cartBusy}
                    onClick={() => void carrito_store.getState().agregar(id, quantity)}
                  >
                    <FiShoppingBag aria-hidden='true' />
                    {available ? 'Agregar al carrito' : 'No disponible'}
                  </button>
                </div>
              )}
              <button
                className='text-link favorite-toggle'
                aria-pressed={favorite}
                disabled={favoriteBusy}
                onClick={() => {
                  const state = favoritos_store.getState()
                  void (favorite ? state.quitar(id) : state.agregar(id))
                }}
              >
                {favorite ? (
                  <AiFillHeart aria-hidden='true' />
                ) : (
                  <AiOutlineHeart aria-hidden='true' />
                )}
                {favorite ? 'Guardado en favoritos' : 'Guardar en favoritos'}
              </button>
            </Show>
            <Show when='signed-out'>
              <Link className='button button-lime' to='/iniciarsesion'>
                Inicia sesión para comprar <FiArrowUpRight aria-hidden='true' />
              </Link>
            </Show>
          </div>
        </div>
      </section>
      <section className='detail-comments'>
        <div className='section-heading'>
          <div>
            <p className='eyebrow'>LA COMUNIDAD OPINA</p>
            <h2>Comentarios</h2>
          </div>
        </div>
        <RequestState status={status} error={error} retry={() => load(id)} />
        <Show when='signed-in'>
          <Agregar_comentario />
        </Show>
        {comments.length
          ? comments.map((comment, index) => (
              <Comentarios key={`${comment.producto_id}-${index}`} {...comment} />
            ))
          : status === 'success' && (
              <div className='comments-empty'>
                <h3>Este producto aún no tiene comentarios.</h3>
                <p>Tu experiencia puede ayudar a alguien a elegir.</p>
              </div>
            )}
      </section>
    </div>
  )
}
export default DetallesProducto
