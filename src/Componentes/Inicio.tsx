import { TbFilterSearch } from 'react-icons/tb'
import { useState } from 'react'
import Filtros from './Filtros'
import Productos from './Productos'
// import { productos_store } from '../Zustand/Productos_store'

const Inicio = () => {
  const [filtro, setfiltro] = useState(false)
  // const test = productos_store((state) => state.test)

  return (
    <section className='bg-gray-100 w-full overflow-x-hidden'>
      {/* <button
        onClick={() => {
          test()
        }}
        className=' hidden   bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors'
      >
        agregar muchos productos
      </button> */}
      <div className='pt-8 mx-auto  '>
        <div className='lg:flex  '>
          <div
            className={` ${
              filtro ? '  lg:block ' : 'hidden  lg:border-r-4   lg:block'
            } `}
          >
            <Filtros />
          </div>

          <div
            className={`w-full ${filtro ? ' hidden lg:block' : 'lg:block '} `}
          >
            <Productos />
          </div>

          <div className='  lg:hidden  fixed bottom-0 right-0 mb-20 mr-4 z-10'>
            <button
              onClick={() => {
                setfiltro(!filtro)
              }}
              className='flex cursor-pointer   w-16 bg-gray-200 justify-center text-center items-center align-middle h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12'
            >
              <TbFilterSearch size={30} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Inicio
