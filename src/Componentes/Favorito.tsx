import { favoritos_store } from '../Zustand/Favoritos_store'
import { favorito } from './types'

const Favorito = ({ producto }: { producto: favorito }) => {
  const quitar = favoritos_store((state) => state.quitar)
  return (
    <div className='flex flex-col'>
      <div className='  relative'>
        <img
          className='lg:h-100 bg-center bg-cover'
          src={producto.imagen}
          alt={producto.nombre}
        />

        <div className='flex absolute bottom-0 jusitfy-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8'>
          <div className='w-full'>
            <button className='cursor-pointer focus:outline-none  focus:ring-offset-2 focus:ring-2 text-green-600 w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-200    hover:text-white'>
              Agregar al carrito
            </button>
          </div>
        </div>
        <button
          onClick={() => {
            quitar(producto.id)
          }}
          className='top-0 cursor-pointer right-0 text-white  absolute px-3 py-2  bg-red-600  '
        >
          X
        </button>
      </div>
      <div className='mt-6 truncate flex justify-between items-center'>
        <div className='flex justify-center items-center'>
          <p className='tracking-tight text-2xl font-semibold leading-6  text-black'>
            {producto.nombre}
          </p>
        </div>
      </div>
      <p className='mt-2 tracking-tight text-2xl font-semibold leading-6  text-black'>
        ${producto.precio}
      </p>
      <div className='flex flex-col jusitfy-start items-start mt-12'></div>
    </div>
  )
}

export default Favorito
