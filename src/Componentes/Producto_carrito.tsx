import { item_carrito } from './types'
import { carrito_store } from '../Zustand/Carrito_store'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

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

  return (
    <div className='justify-between mb-6 rounded-lg overflow-x-auto bg-white p-6 shadow-md sm:flex sm:justify-start'>
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

      <div className='truncate sm:ml-4 sm:flex sm:w-full sm:justify-between'>
        <div className=' truncate mt-5 sm:mt-0'>
          <Link to={`/productos/${id}`}>
            <h2 className='  truncate text-lg font-bold text-gray-900'>
              {nombre}
            </h2>
          </Link>
        </div>
        <div className='mt-4  flex justify-between   sm:mt-0 sm:block sm:space-x-6'>
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
          <div className='flex items-center justify-center space-x-4'>
            <button className='text-green-400 justify-center  group cursor-pointer'>
              <AiOutlineDollarCircle size={30} />
              <span className='absolute   left-0 right-0 whitespace-nowrap pointer-events-none  group-hover:opacity-100 opacity-0 font-bold   text-black rounded-md'>
                Comprar Producto
              </span>
            </button>
            <p className='text-sm'>
              {precio && (precio * cantidad).toLocaleString()} $
            </p>
            <button
              onClick={() => {
                quitar_carrito(id)
              }}
              className='group'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-5 w-5 cursor-pointer     duration-150 hover:text-red-500'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
              <span className='absolute     left-0 right-0  whitespace-nowrap pointer-events-none  group-hover:opacity-100 opacity-0 font-bold   text-black rounded-md'>
                Remover producto
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Producto_carrito
