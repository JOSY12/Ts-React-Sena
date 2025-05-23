import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'

const DashboardGeneral_movil = ({ ventanas, setventana }: any) => {
  const [activar, setactivar] = useState<boolean>()

  return (
    <>
      <button
        onClick={() => {
          setactivar(!activar)
        }}
        className={`    justify-center w-full cursor-pointer  ${
          activar ? 'bottom-0 ' : 'bottom-10'
        }  flex fixed lg:hidden `}
      >
        {activar ? (
          <span className='text-3xl         '>
            <AiOutlineCaretUp />
          </span>
        ) : (
          <span className='text-3xl         '>
            <AiOutlineCaretDown />
          </span>
        )}
      </button>
      <div className={`   ${activar ? 'hidden' : ''}  lg:hidden`}>
        <nav className=' flex    w-full justify-evenly bottom-0    fixed   '>
          <Link className='w-1/2     ' to={'/u/v/admin/usuarios'}>
            <button
              onClick={() =>
                setventana({
                  ...ventanas,
                  usuarios: true,
                  productos: false,
                  tablas: false
                })
              }
              className={`w-full flex items-center    justify-center px-6 py-2   ${
                ventanas?.usuarios
                  ? 'text-gray-200  bg-gray-700 bg-opacity-25'
                  : 'text-gray-600  bg-gray-900 bg-opacity-25'
              }  `}
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
            </button>
          </Link>
          <Link className='w-1/2   ' to={'/u/v/admin/productos'}>
            <button
              onClick={() =>
                setventana({
                  ...ventanas,
                  usuarios: false,
                  productos: true,
                  tablas: false
                })
              }
              className={`w-full flex items-center  justify-center px-6 py-2   ${
                ventanas?.productos
                  ? 'bg-gray-700 text-gray-100 bg-opacity-25'
                  : 'text-gray-600  bg-gray-900 bg-opacity-25'
              }  `}
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
                  d='M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z'
                ></path>
              </svg>
            </button>
          </Link>
          <Link className='w-1/2   ' to={'/u/v/admin/listado_p'}>
            <button
              onClick={() =>
                setventana({
                  ...ventanas,
                  usuarios: false,
                  productos: false,
                  misproductos: true
                })
              }
              className={`w-full flex items-center  justify-center px-6 py-2   ${
                ventanas?.tablas
                  ? 'bg-gray-700  text-gray-100 bg-opacity-25'
                  : 'text-gray-600  bg-gray-900 bg-opacity-25'
              }  `}
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
            </button>
          </Link>
          {/* <Link className='w-1/2   ' to={'/'}>
            <button
              onClick={() =>
                setventana({
                  ...ventanas,
                  usuarios: false,
                  productos: false,
                  misproductos: true
                })
              }
              className={`w-full flex items-center  justify-center px-6 py-2 ${
                ventanas?.misproductos
                  ? 'bg-gray-700 text-gray-100 bg-opacity-25'
                  : 'text-gray-600  bg-gray-900 bg-opacity-25'
              }  `}
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
            </button>
          </Link> */}
        </nav>
      </div>
    </>
  )
}

export default DashboardGeneral_movil
