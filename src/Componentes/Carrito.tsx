import { useEffect } from 'react'
import { carrito_store } from '../Zustand/Carrito_store'
import Producto_carrito from './Producto_carrito'
import { Stripe_store } from '../Zustand/Stripe_store'
import { AiOutlineClose } from 'react-icons/ai'
import { GrHelpBook } from 'react-icons/gr'

// import { basedatos } from '../bd'
const Carrito = () => {
  const carrito = carrito_store((state) => state.carrito)
  const solicitar_carrito = carrito_store((state) => state.solicitar_carrito)
  const total = carrito_store((state) => state.total)
  const pagartodo = Stripe_store((state) => state.pagar)
  const url = Stripe_store((state) => state.url)

  useEffect(() => {
    solicitar_carrito()
  }, [])

  useEffect(() => {
    if (url) {
      window.location.href = url
    } else {
      return
    }
  }, [url])

  return (
    <>
      <div className='  bg-gray-100 pt-10'>
        <div className='mb-10   flex justify-center  text-center text-2xl font-bold'>
          <h1> Carrito de compras</h1>
          <div className='ml-2'>
            <input
              type='checkbox'
              id='modal-toggle'
              className='hidden peer w-20'
            />
            <label
              htmlFor='modal-toggle'
              className='cursor-pointer   w-30 p-2 m-2 text-green-500 rounded '
            >
              <div className='flex  items-end justify-end  fixed bottom-0 right-5 sm:bottom-15   bg-yellow-400 p-4 m-4  rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-300 z-10'>
                <div className='relative group'>
                  <GrHelpBook size={30} color='black' />

                  <span className='absolute bottom-15 text-md  whitespace-nowrap pointer-events-none  -right-6 group-hover:opacity-100 opacity-0 font-bold   text-black rounded-md'>
                    Ayuda
                  </span>
                </div>
              </div>
            </label>

            <form
              // onSubmit={enviar}
              className='fixed  inset-0    bg-gray-100 hidden peer-checked:flex items-center justify-center z-50'
            >
              <div className='bg-white   p-3 rounded-xl shadow-lg max-w-2xl w-full  relative'>
                <label
                  htmlFor='modal-toggle'
                  className='cursor-pointer m-3 flex  justify-end  '
                >
                  <AiOutlineClose className='size-10  text-black ' />
                </label>
                <div className='    '>
                  <div className='  '>
                    <div className='text-center'>
                      Informacion de tarjeta de prueba
                    </div>
                    <div className='flex justify-center items-center m-4'>
                      <div className=' h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110'>
                        <img
                          className='relative object-cover w-full h-full rounded-xl'
                          src='https://i.imgur.com/kGkSg1v.png'
                        ></img>

                        <div className='w-full text-left px-8 absolute top-8'>
                          <div className='flex justify-between'>
                            <div className=''>
                              <p className='font-medium'>Nombre</p>
                              <p className='font-light text-2xl tracking-widest'>
                                Persona de prueba
                              </p>
                            </div>
                            <img
                              className='w-14 h-14'
                              src='https://i.imgur.com/bbPHJVe.png'
                            />
                          </div>
                          <div className='pt-1'>
                            <p className='font-medium'>Numero de tarjeta</p>
                            <p className='font-light tracking-more-wider'>
                              4242 4242 4242 4242
                            </p>
                          </div>
                          <div className='pt-6 pr-6'>
                            <div className='flex justify-between'>
                              <div className=''>
                                <p className='font-light text-xs'>Valid</p>
                                {/* <p className='font-medium tracking-wider text-sm'>
                              11/15
                            </p> */}
                              </div>
                              <div className=''>
                                <p className='font-light  text-xs'>
                                  Fecha Expiracion
                                </p>
                                <p className='font-medium tracking-wider text-sm'>
                                  04 / 44
                                </p>
                              </div>

                              <div className=''>
                                <p className='font-light text-xs'>CVV</p>
                                <p className='font-bold tracking-more-wider text-sm'>
                                  444
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <span className='text-center text-black mt-4'>
                      para poder pagar en la pagina usa estos datos de tarjeta
                      de prueba para poder realizar la compras sin limite
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0'>
          <div className='rounded-lg md:w-2/3'>
            {carrito && carrito.length ? (
              carrito.map((e, k) => (
                <Producto_carrito
                  key={k}
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

          {carrito && carrito.length > 0 && (
            <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'>
              <div className='mb-2 flex justify-between'>
                <p className='text-gray-700'>Subtotal</p>
                <p className='text-gray-700'>${total().toLocaleString()}</p>
              </div>
              {/* <div className='flex justify-between'>
                <p className='text-gray-700'>envio</p>
                <p className='text-gray-700'>$4.99</p>
              </div> */}
              <hr className='my-4' />
              <div className='flex justify-between'>
                <p className='text-lg font-bold'>Total</p>
                <div className=''>
                  <p className='mb-1 text-lg font-bold'>
                    ${total().toLocaleString()} USD
                  </p>
                  {/* <p className='text-sm text-gray-700'>inscluding VAT</p> */}
                </div>
              </div>
              <button
                onClick={() => pagartodo('')}
                className='mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600'
              >
                Pagar ahora
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default Carrito
