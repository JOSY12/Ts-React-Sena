import { useEffect } from 'react'
import { favoritos_store } from '../Zustand/Favoritos_store'
import Favorito from './Favorito'

const Favoritos = () => {
  const favoritos = favoritos_store((state) => state.favoritos)
  const solicitar_favoritos = favoritos_store(
    (state) => state.solicitar_favoritos
  )
  useEffect(() => {
    solicitar_favoritos()
  }, [])

  return (
    <>
      <div className='mx-auto   container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center text-black'>
        <div className='flex flex-col jusitfy-start items-start'>
          <div>
            {/* <p className='text-sm leading-4   text-black'>Home</p> */}
          </div>
          <div className='mt-3'>
            <h1
              className='text-3xl lg:text-4xl tracking-tight font-semibold 
            leading-8 lg:leading-9 text-black'
            >
              Mis favoritos
            </h1>
          </div>
          <div className='mt-4'>
            <p className='text-2xl tracking-tight leading-6 text-black'>
              tienes {favoritos.length} Favoritos
            </p>
          </div>
          <div className='mt-10 lg:mt-12 grid   grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0'>
            {/* tarjeta de producto */}
            {favoritos && favoritos.length > 0 ? (
              favoritos.map((producto) => (
                <Favorito key={producto.id} producto={producto} />
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
                    d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.951-.69l1.519-4.674z'
                  />
                </svg>
                <h2 className='text-xl font-semibold text-gray-700 mb-2'>
                  No tienes favoritos
                </h2>
                <p className='text-gray-500 text-center'>
                  No tienes items en favoritos. Agrega productos a tu lista de
                  favoritos para guardarlos.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default Favoritos
