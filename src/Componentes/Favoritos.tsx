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
            {favoritos &&
              favoritos.length > 0 &&
              favoritos.map((producto) => (
                <Favorito key={producto.id} producto={producto} />
              ))}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default Favoritos
