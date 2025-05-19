import { Link, Outlet } from 'react-router-dom'
import DashboardGeneral_movil from './DashboardGeneral_movil'
import { useEffect, useState } from 'react'

const DashboardGeneral = () => {
  const [ventana, setventana] = useState({
    usuarios: window.location.pathname.includes('usuarios') ? true : false,
    productos: window.location.pathname.includes('productos') ? true : false,
    misproductos: window.location.pathname.includes('listado_p') ? true : false
  })

  useEffect(() => {}, [ventana])

  return (
    <>
      <div className='flex h-screen   bg-gray-100  '>
        <div className=' inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden'></div>
        {/* inicio de navbar lateral   */}
        <div
          className={`  hidden  h-screen  
             lg:block  z-30 w-64 overflow-y-auto 
             transition duration-300 transform 
             bg-gray-900 
             } lg:translate-x-0 lg:static lg:inset-0`}
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
                <svg
                  className='w-6 h-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z'
                  ></path>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z'
                  ></path>
                </svg>

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
                className={`flex cursor-pointer w-full items-center px-6 py-2 mt-4 ${
                  ventana.productos
                    ? 'bg-gray-700  bg-opacity-25  text-gray-100 '
                    : ' text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 '
                } `}
              >
                <svg
                  className='w-6 h-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                  ></path>
                </svg>

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
                <svg
                  className='w-6 h-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                  ></path>
                </svg>

                <span className='mx-3'>Productos</span>
              </button>
            </Link>

            {/* <button className='flex cursor-pointer w-full items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'>
              <svg
                className='w-6 h-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z'
                ></path>
              </svg>
              <span className='mx-3'>////</span>
            </button> */}
          </nav>
        </div>

        <DashboardGeneral_movil ventanas={ventana} setventana={setventana} />

        <Outlet />
      </div>
    </>
  )
}

export default DashboardGeneral
