import { item_carrito } from './types'
import { carrito_store } from '../Zustand/Carrito_store'
import { Link } from 'react-router-dom'
import { FaDeleteLeft } from 'react-icons/fa6'
import { BsCash } from 'react-icons/bs'
import { Stripe_store } from '../Zustand/Stripe_store'

const Producto_carrito = ({
  id,
  nombre,
  precio,
  imagen,
  stock,
  cantidad
}: item_carrito) => {
  const quitar_carrito = carrito_store((state) => state.quitar)
  const aumentar = carrito_store((state) => state.aumentar)
  const restar = carrito_store((state) => state.restar)
  const pagar = Stripe_store((state) => state.pagar)
  return (
    <div className='justify-between mb-4 relative rounded-lg overflow-x-auto bg-white p-6 shadow-md sm:flex sm:justify-start'>
      <div className='absolute right-0   top-0  '>
        <button
          onClick={() => {
            quitar_carrito(id)
          }}
          className='cursor-pointer px-1  text-red-600'
        >
          <FaDeleteLeft size={30} />
        </button>
      </div>
      <Link to={`/productos/${id}`} className='justify-center flex   '>
        <div className=' justify-center h-30 w-30'>
          <div className='flex justify-center bg-white   w-full  '>
            <img
              loading='lazy'
              src={imagen ? imagen : ''}
              className=' h-30    '
            ></img>
          </div>
        </div>
      </Link>

      <div className='truncate sm:ml-4 sm:flex  sm:w-full sm:justify-between'>
        <div className=' truncate mt-5 sm:mt-0'>
          <Link to={`/productos/${id}`}>
            <h2 className='  truncate text-lg font-bold text-gray-900'>
              {nombre}
            </h2>
          </Link>
        </div>
        <div className='mt-4 s,:flex justify-center items-center align-middle text-center  sm:mt-0 sm:block sm:space-x-6'>
          <div className=' flex    gap-2   mr-4 text-center items-center sm:flex-col align-middle justify-center  '>
            <div className='flex    items-center border-gray-100'>
              <button
                onClick={() => {
                  cantidad > 1 && restar(id)
                }}
                className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50'
              >
                -
              </button>
              <span className='h-8 w-8 border   content-center   bg-white text-center  '>
                {cantidad}
              </span>

              <button
                onClick={() => {
                  stock && cantidad < stock && aumentar(id)
                }}
                className='cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50'
              >
                +
              </button>
            </div>
            <div className='flex items-center justify-center  '>
              <p className='text-sm font-extralight'>{stock} disponibles </p>
            </div>
            <p className='text-sm'>
              {precio && (precio * cantidad).toLocaleString()}$
            </p>
            <div className='flex gap-1 items-center'>
              <button
                onClick={() => {
                  pagar(id)
                }}
                className='text-green-400  justify-center  group cursor-pointer'
              >
                Comprar
              </button>
              <BsCash className='text-green-400' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Producto_carrito
