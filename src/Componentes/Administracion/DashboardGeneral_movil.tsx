import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import { IoStatsChart } from 'react-icons/io5'
import { FaEdit } from 'react-icons/fa'
import { FaListUl } from 'react-icons/fa6'
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
        }  flex fixed lg:hidden z-2  `}
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
      <div className={`   ${activar ? 'hidden' : ''} z-2 lg:hidden`}>
        <nav className=' flex    w-full justify-evenly bottom-0    fixed   '>
          <Link className='w-1/2     ' to={'/u/v/admin/usuarios'}>
            <button
              onClick={() =>
                setventana({
                  ...ventanas,
                  usuarios: true,
                  productos: false,
                  misproductos: false
                })
              }
              className={`w-full flex items-center    justify-center px-6 py-2   ${
                ventanas?.usuarios
                  ? 'text-gray-200  bg-gray-700 bg-opacity-25'
                  : 'text-gray-600  bg-gray-900 bg-opacity-25'
              }  `}
            >
              <IoStatsChart size={30} />
            </button>
          </Link>
          <Link className='w-1/2   ' to={'/u/v/admin/productos'}>
            <button
              onClick={() =>
                setventana({
                  ...ventanas,
                  usuarios: false,
                  productos: true,
                  misproductos: false
                })
              }
              className={`w-full flex items-center  justify-center px-6 py-2   ${
                ventanas?.productos
                  ? 'bg-gray-700 text-gray-100 bg-opacity-25'
                  : 'text-gray-600  bg-gray-900 bg-opacity-25'
              }  `}
            >
              <FaEdit size={30} />
            </button>
          </Link>
          <Link className='w-1/2   ' to={'/u/v/admin/listado_p'}>
            <button
              onClick={() =>
                setventana({
                  ...ventanas,
                  misproductos: true,
                  usuarios: false,
                  productos: false
                })
              }
              className={`w-full flex items-center  justify-center px-6 py-2   ${
                ventanas?.misproductos
                  ? 'bg-gray-700 text-gray-100 bg-opacity-25'
                  : 'text-gray-600  bg-gray-900 bg-opacity-25'
              }  `}
            >
              <FaListUl size={30} />
            </button>
          </Link>
        </nav>
      </div>
    </>
  )
}

export default DashboardGeneral_movil
