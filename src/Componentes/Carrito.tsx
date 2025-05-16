import { useEffect } from 'react'
import { carrito_store } from '../Zustand/Carrito_store'
import Producto_carrito from './Producto_carrito'

// import { basedatos } from '../bd'
const Carrito = () => {
  const carrito = carrito_store((state) => state.carrito)
  const solicitar_carrito = carrito_store((state) => state.solicitar_carrito)
  useEffect(() => {
    solicitar_carrito()
  }, [carrito.length])
  // []terminar los items del carito no se cargan bien en pagina deploy
  console.log(carrito)
  return (
    <>
      <div className='  bg-gray-100 pt-10'>
        <h1 className='mb-10 text-center text-2xl font-bold'>
          Carrito de compras
        </h1>
        <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0'>
          <div className='rounded-lg md:w-2/3'>
            {carrito && carrito.length ? (
              carrito.map((e) => (
                <Producto_carrito
                  id={e.id}
                  nombre={e.nombre}
                  precio={e.precio}
                  stock={e.stock}
                  imagen={e.imagen}
                  cantidad={e.cantidad}
                  // estado={e.estado}
                />
              ))
            ) : (
              <div className='flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg shadow-md'>
                <svg
                  className='w-16 h-16 mb-4 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
                <h2 className='text-xl font-semibold text-gray-700 mb-2'>
                  Tu carrito está vacío
                </h2>
                <p className='text-gray-500 text-center'>
                  No tienes items en el carrito. Agrega productos para continuar
                  con tu compra.
                </p>
              </div>
            )}
          </div>

          <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'>
            <div className='mb-2 flex justify-between'>
              <p className='text-gray-700'>Subtotal</p>
              <p className='text-gray-700'>$2100</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-gray-700'>envio</p>
              <p className='text-gray-700'>$4.99</p>
            </div>
            <hr className='my-4' />
            <div className='flex justify-between'>
              <p className='text-lg font-bold'>Total</p>
              <div className=''>
                <p className='mb-1 text-lg font-bold'>$2105 USD</p>
                {/* <p className='text-sm text-gray-700'>inscluding VAT</p> */}
              </div>
            </div>
            <button className='mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600'>
              Pagar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Carrito
