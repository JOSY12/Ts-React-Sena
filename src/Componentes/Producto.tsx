type productoprops = {
  nombre: string
  precio: number
  imagen: string
}
import { IoIosHeartEmpty } from 'react-icons/io'
// import { IoMdHeart } from 'react-icons/io'
// ;<IoMdHeart />
const Producto = ({ nombre, precio, imagen }: productoprops) => {
  return (
    <>
      {/* tarjeta de prueba por eliminar o mejorar */}
      <article className='rounded-xl hover:transform hover:scale-105 duration-300 '>
        <div className='w-full  bg-white     hover:shadow-xl max-w-sm mx-auto rounded-md shadow-md overflow-hidden'>
          <div className='  items-end justify-end'>
            <img src={imagen} alt='' className='h-56  w-full bg-cover' />
            <div className='flex justify-end m-0 p-0'>
              <button className='p-2 rounded-full bg-blue-600 text-white mx-1 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
                <svg
                  className='h-5 w-5'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'></path>
                </svg>
              </button>
              <button className='p-2 rounded-full bg-red-600 text-white  -mb-4 hover:bg-red-500 focus:outline-none focus:bg-red-500'>
                <IoIosHeartEmpty className='h-5 w-5' />
              </button>
            </div>
          </div>
          <div className='px-5 py-3'>
            <h3 className=' uppercase'>{nombre}</h3>
            <span className='  mt-2'>{precio}</span>
          </div>
        </div>
      </article>
    </>
  )
}

export default Producto
