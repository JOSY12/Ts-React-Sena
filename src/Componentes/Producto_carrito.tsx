import { useState } from 'react'
import { item_carrito } from './types'

const Producto_carrito = ({
  // estado,
  nombre,
  precio,
  imagen,
  stock,
  cantidad
}: item_carrito) => {
  const [actual, setcantidad] = useState<number>(cantidad)
  return (
    <div
      // key={k}
      className='justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start'
    >
      <img
        src={imagen || ''}
        alt='product-image'
        className='w-full rounded-lg sm:w-40'
      />
      <div className='truncate sm:ml-4 sm:flex sm:w-full sm:justify-between'>
        <div className=' truncate mt-5 sm:mt-0'>
          <h2 className='  truncate text-lg font-bold text-gray-900'>
            {nombre}
          </h2>
          {/* <p className='mt-1 text-xs text-gray-700'>{estado}</p>  */}
        </div>
        <div className='mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6'>
          <div className='flex  border items-center border-gray-100'>
            <button
              onClick={() => {
                actual > 1 && setcantidad(actual - 1)
              }}
              className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50'
            >
              -
            </button>
            <span className='h-8 w-8 border   content-center   bg-white text-center  '>
              {actual}
            </span>

            <button
              onClick={() => {
                stock && actual < stock && setcantidad(actual + 1)
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
            <p className='text-sm'>{precio} $</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              className='h-5 w-5 cursor-pointer duration-150 hover:text-red-500'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Producto_carrito
