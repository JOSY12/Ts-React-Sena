import { Link, Outlet } from 'react-router-dom'
import DashboardGeneral_movil from './DashboardGeneral_movil'
import { useEffect, useState } from 'react'
import { IoStatsChart } from 'react-icons/io5'
import { FaEdit } from 'react-icons/fa'
import { FaListUl } from 'react-icons/fa6'

const DashboardGeneral = () => {
  const [ventana, setventana] = useState({
    usuarios: window.location.pathname.includes('usuarios') ? true : false,
    productos: window.location.pathname.includes('productos') ? true : false,
    misproductos: window.location.pathname.includes('listado_p') ? true : false
  })

  useEffect(() => {}, [ventana])

  return (
    <>
      <div className='flex    bg-gray-100  '>
        <div className=' inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden'></div>
        {/* inicio de navbar lateral   */}
        <div
          className={`  min-h-screen  hidden  
             lg:block  z-30  
               
             bg-gray-900 
              lg:translate-x-0 lg:static lg:inset-0`}
        >
          <div className='flex items-center justify-center mt-8'>
            <div className='flex items-center'>
              <span className='mx-2 text-2xl font-semibold text-white'>
                Administracion
              </span>
            </div>
          </div>

          <nav className='mt-10  '>
            <Link to={'/u/v/admin/usuarios'}>
              <button
                onClick={() =>
                  setventana({
                    ...ventana,
                    usuarios: true,
                    productos: false,
                    misproductos: false
                  })
                }
                className={`flex
             cursor-pointer w-full items-center
              px-6 py-2 mt-4
               ${
                 ventana.usuarios
                   ? 'bg-gray-700  bg-opacity-25  text-gray-100 '
                   : ' text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 '
               } `}
              >
                <IoStatsChart size={30} />

                <span className='mx-3'>General</span>
              </button>
            </Link>
            <Link to={'/u/v/admin/productos'}>
              <button
                onClick={() =>
                  setventana({
                    ...ventana,
                    usuarios: false,
                    productos: true,
                    misproductos: false
                  })
                }
                className={`flex
             cursor-pointer w-full items-center
              px-6 py-2 mt-4 ${
                ventana.productos
                  ? 'bg-gray-700  bg-opacity-25  text-gray-100 '
                  : ' text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 '
              } `}
              >
                <FaEdit size={30} />

                <span className='mx-3'>Crear Productos</span>
              </button>
            </Link>
            <Link to={'/u/v/admin/listado_p'}>
              <button
                onClick={() =>
                  setventana({
                    ...ventana,
                    misproductos: true,
                    usuarios: false,
                    productos: false
                  })
                }
                className={`flex cursor-pointer w-full items-center px-6 py-2 mt-4 ${
                  ventana.misproductos
                    ? 'bg-gray-700  bg-opacity-25  text-gray-100 '
                    : ' text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 '
                } `}
              >
                <FaListUl size={30} />

                <span className='mx-3'>Productos</span>
              </button>
            </Link>
          </nav>
        </div>

        <DashboardGeneral_movil ventanas={ventana} setventana={setventana} />

        <Outlet />
      </div>
    </>
  )
}

export default DashboardGeneral
