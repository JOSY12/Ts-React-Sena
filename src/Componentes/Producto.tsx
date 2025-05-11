import { Link } from 'react-router-dom'
import { productoprops } from './types'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsCartPlus, BsCartCheckFill } from 'react-icons/bs'

import { favoritos_store } from '../Zustand/Favoritos_store'
import { useState } from 'react'
import { useClerk } from '@clerk/clerk-react'

const Producto = ({ producto }: { producto: productoprops }) => {
  const agregar = favoritos_store((state) => state.agregar)
  const favorito = favoritos_store((state) => state.favorito(producto.id))
  const quitar = favoritos_store((state) => state.quitar)
  const [carrito] = useState(true)
  const { isSignedIn } = useClerk()
  return (
    <div className=' hover:scale-102 transition '>
      <div className='bg-white shadow-md rounded-lg max-w-sm    '>
        <Link to={`${producto.id}`}>
          <button className='flex justify-center'>
            <img
              className='rounded-t-lg p-3 sm:h-60  '
              src={producto.imagen}
              alt='product image'
            ></img>
          </button>
        </Link>
        <div className='px-5 pb-4 '>
          <a>
            <h3 className='text-gray-900 font-semibold truncate text-sm tracking-tight :text-white'>
              {producto.nombre}
            </h3>
          </a>
          {/* putuacion y comentarios  */}
          {/* <div className='flex items-center mt-2.5 mb-5'>
            <svg
              className='w-5 h-5 text-yellow-300'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>
            <svg
              className='w-5 h-5 text-yellow-300'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>
            <svg
              className='w-5 h-5 text-yellow-300'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>
            <svg
              className='w-5 h-5 text-yellow-300'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>
            <svg
              className='w-5 h-5 text-yellow-300'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>
            <span className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded :bg-blue-200 :text-blue-800 ml-3'>
              5.0
            </span>
          </div> */}
          <div className='flex items-center justify-between'>
            <span className='text-md font-bold text-gray-900 :text-white'>
              ${producto.precio}
            </span>
            {isSignedIn && (
              <div className='justify-end flex   '>
                <button
                  onClick={() => {
                    favorito ? quitar(producto.id) : agregar(producto)
                  }}
                  className='  pr-6 cursor-pointer      font-medium rounded-lg text-sm      text-center  '
                >
                  {favorito ? (
                    <AiFillHeart size={25} className='text-red-600' />
                  ) : (
                    <AiOutlineHeart size={25} className='hover:text-red-500' />
                  )}
                </button>
                <button className='text-black  cursor-pointer hover:text-green-600    font-medium rounded-lg text-sm     text-center  '>
                  {carrito ? (
                    <BsCartCheckFill size={25} className='text-green-600' />
                  ) : (
                    <BsCartPlus size={25} className='hover:text-green-500' />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Producto
