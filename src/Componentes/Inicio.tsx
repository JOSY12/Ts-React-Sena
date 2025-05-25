import { TbFilterSearch } from 'react-icons/tb'
import { useState } from 'react'
import Filtros from './Filtros'
import Productos from './Productos'

const Inicio = () => {
  const [filtro, setfiltro] = useState(false)

  return (
    <section className='bg-gray-100 w-full overflow-x-hidden'>
      <div className='pt-8 mx-auto  '>
        <div className='lg:flex'>
          <div
            className={`   ${filtro ? ' lg:block    ' : ' hidden lg:block  '} `}
          >
            <Filtros />
          </div>

          <div className={` ${filtro ? 'hidden lg:block' : 'lg:block '} `}>
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
