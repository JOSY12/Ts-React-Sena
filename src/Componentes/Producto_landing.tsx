import { Link } from 'react-router-dom'
import { productoprops } from './types'

const Producto_landing = ({ producto }: { producto: productoprops }) => {
  return (
    <Link to={`/productos/${producto.id}`}>
      <div className='w-full hover:scale-104 transition max-w-sm mx-auto rounded-md shadow-md overflow-hidden'>
        {Number(producto.calificacion) > 1 ? (
          <div className='flex justify-between   mt-2.5 mb-5'>
            <div className='flex items-center  '>
              <svg
                className='w-5 h-5 text-yellow-300'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
              </svg>
              <span className='  bg-blue-200  text-xs font-semibold p-1 rounded-lg :bg-blue-200 m-1 :text-blue-800  '>
                {producto.calificacion}
              </span>
            </div>

            <div className='bg-amber-300 rounded-lg mr-3 p-1'>
              <span className='text-sm'>Nuevo</span>
            </div>
          </div>
        ) : (
          <div className='flex  text-end items-end justify-end  mt-2.5 mb-5'>
            <div className='bg-amber-300 rounded-lg mr-3 p-1'>
              <span className='text-sm'>Nuevo</span>
            </div>
          </div>
        )}
        <div className='flex items-center justify-center   h-56   '>
          <img
            src={producto.imagen}
            className='     h-56 m-auto  bg-cover'
            alt='foto'
          />
        </div>
        <div className='px-5 py-3'>
          <h3 className='text-gray-700 uppercase truncate'>
            {producto.nombre}
          </h3>
          <span className='text-gray-500 mt-2'>${producto.precio}</span>
        </div>
      </div>
    </Link>
  )
}

export default Producto_landing
