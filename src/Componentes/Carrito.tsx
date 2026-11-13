import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiShoppingBag } from 'react-icons/fi'
import RequestState from '../shared/ui/RequestState'
import { carrito_store } from '../Zustand/Carrito_store'
import { Stripe_store } from '../Zustand/Stripe_store'
import Producto_carrito from './Producto_carrito'
const Carrito = () => {
  const carrito = carrito_store((state) => state.carrito)
  const solicitar = carrito_store((state) => state.solicitar_carrito)
  const status = carrito_store((state) => state.status)
  const error = carrito_store((state) => state.error)
  const cartBusy = carrito_store((state) => state.busy)
  const total = carrito_store((state) => state.total())
  const pagar = Stripe_store((state) => state.pagar)
  const checkoutBusy = Stripe_store((state) => state.busy)
  const checkoutError = Stripe_store((state) => state.error)
  const reset = Stripe_store((state) => state.reset)
  const url = Stripe_store((state) => state.url)
  useEffect(() => () => reset(), [reset])
  useEffect(() => {
    void solicitar()
  }, [solicitar])
  useEffect(() => {
    if (url) window.location.href = url
  }, [url])
  return (
    <section className='cart-page page-width'>
      <div className='section-heading'>
        <div>
          <p className='eyebrow'>YA CASI ES TUYO</p>
          <h1>Tu próximo upgrade.</h1>
        </div>
        <Link className='text-link' to='/productos'>
          Seguir explorando <FiArrowUpRight aria-hidden='true' />
        </Link>
      </div>
      <RequestState status='success' error={checkoutError} />
      <RequestState status={status} error={error} retry={solicitar} />
      <div className='cart-layout'>
        <div>
          {carrito.map((item) => (
            <Producto_carrito key={item.id} {...item} />
          ))}
          {status === 'success' && carrito.length === 0 && (
            <div className='cart-empty'>
              <FiShoppingBag aria-hidden='true' />
              <h2>Tu carrito está vacío</h2>
              <p>Encuentra algo que conecte contigo.</p>
              <Link className='button button-lime' to='/productos'>
                Explorar productos <FiArrowUpRight aria-hidden='true' />
              </Link>
            </div>
          )}
        </div>
        {carrito.length > 0 && (
          <aside className='cart-summary' aria-label='Resumen de compra'>
            <p className='eyebrow'>BUENA ELECCIÓN.</p>
            <h2>Tu resumen</h2>
            <div className='summary-row'>
              <span>Productos</span>
              <span>{carrito.reduce((sum, item) => sum + item.cantidad, 0)}</span>
            </div>
            <div className='summary-row'>
              <span>Subtotal</span>
              <span>${total.toLocaleString()} USD</span>
            </div>
            <div className='summary-total'>
              <span>Total</span>
              <strong>
                ${total.toLocaleString()} <small>USD</small>
              </strong>
            </div>
            <button
              className='button button-lime'
              disabled={checkoutBusy || cartBusy || status !== 'success'}
              onClick={() => void pagar('')}
            >
              {checkoutBusy ? 'Preparando pago…' : 'Pagar ahora'}
              <FiArrowUpRight aria-hidden='true' />
            </button>
            <p className='summary-note'>
              Antes de pagar, comprueba tu{' '}
              <Link to='/u/perfil'>dirección de entrega predeterminada</Link>.
            </p>
            <details className='payment-help'>
              <summary>Cómo probar una compra</summary>
              <p>
                Esta demo usa Stripe en modo prueba. Usa la tarjeta{' '}
                <code>4242 4242 4242 4242</code>, una fecha futura y cualquier CVC de
                tres dígitos.
              </p>
            </details>
          </aside>
        )}
      </div>
    </section>
  )
}
export default Carrito
