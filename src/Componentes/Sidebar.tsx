// import React from 'react'

import { Link } from 'react-router-dom'
// import Login from './Login'
import { useAuth } from '@clerk/clerk-react'
import Logout from './Logout'
// import Registrarboton from './Registrarboton'
// import Registrar from './Registrar'
import { FaSignInAlt } from 'react-icons/fa'
import { IoPersonAddSharp } from 'react-icons/io5'

import { useClerk } from '@clerk/clerk-react'
import { activador } from './types'

const Sidebar = ({ activar, cantidad }: activador) => {
  const { isSignedIn } = useAuth()
  const { user } = useClerk()
  return (
    <>
      <div
        className={`  
        } max-w-2xl z-1 absolute right-0  mt-20 mx-auto`}
      >
        <aside className=' ' aria-label='Sidebar'>
          <div className='   px-3 py-4 overflow-y-auto rounded-2xl   bg-gray-900'>
            <ul className='space-y-2 '>
              {isSignedIn ? (
                <>
                  {/* dashboard administrativo para mis productos y usuarios*/}
                  {isSignedIn && user?.publicMetadata?.administrador && (
                    <>
                      <Link to={'/u/v/admin/usuarios'}>
                        <li className='hover:bg-gray-500 rounded-2xl'>
                          <button
                            onClick={activar}
                            className='flex  cursor-pointer items-center p-2 text-base font-normal text-white  '
                          >
                            <svg
                              className='w-6 h-6 text-white  transition duration-75  '
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
                              <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
                            </svg>

                            <span className='flex-1 ml-3 whitespace-nowrap'>
                              Administracion
                            </span>
                          </button>
                        </li>
                      </Link>
                    </>
                  )}

                  {/* Notificaciones de usuarios */}
                  <Link to={'/u/notificaciones'}>
                    <li className='hover:bg-gray-500 rounded-2xl   '>
                      <button
                        onClick={activar}
                        className=' flex cursor-pointer  items-center p-2 pr-15 text-base font-normal text-white-900     '
                      >
                        <svg
                          className='flex-shrink-0 w-6 h-6 text-white transition duration-75  '
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z'></path>
                          <path d='M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z'></path>
                        </svg>
                        <span className='flex-1 ml-3 whitespace-nowrap'>
                          Notificaciones
                        </span>
                        {Number(cantidad) > 0 ? (
                          <span className='inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full  not-visited:'>
                            {Number(cantidad)}
                          </span>
                        ) : (
                          ''
                        )}
                      </button>
                    </li>
                  </Link>
                  {/* administracion de usuarios */}
                  <Link to={'/u/perfil'}>
                    <li className=' hover:bg-gray-500 rounded-2xl '>
                      <button
                        onClick={activar}
                        className='flex cursor-pointer  items-center p-2 pr-15 text-base font-normal text-white-900     '
                      >
                        <svg
                          className='flex-shrink-0 w-6 h-6 text-white transition duration-75   '
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                            clipRule='evenodd'
                          ></path>
                        </svg>

                        <span className='flex-1 ml-3 whitespace-nowrap'>
                          Perfil
                        </span>
                      </button>
                    </li>
                  </Link>

                  <Link className='hover:bg-gray-500' to={'u/favoritos'}>
                    <li className='  xl:hidden rounded-2xl hover:bg-gray-500 '>
                      <button className='flex items-center    cursor-pointer  p-2 text-base font-normal   text-white-900  s    '>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='flex-shrink-0 w-6 h-6 text-white transition duration-75  '
                          fill='currentColor'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                          />
                        </svg>
                        <span className='flex-1 ml-3 whitespace-nowrap'>
                          Favoritos
                        </span>
                      </button>
                    </li>
                  </Link>
                  {/* productos de tienda */}
                  <Link to={'/u/compras'}>
                    <li className='hover:bg-gray-500 rounded-2xl'>
                      <button
                        onClick={activar}
                        className='flex    cursor-pointer  items-center p-2 text-base font-normal  text-white-900     '
                      >
                        <svg
                          className='flex-shrink-0 w-6 h-6 text-white  transition duration-75    '
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z'
                            clipRule='evenodd'
                          ></path>
                        </svg>

                        <span className='flex-1 ml-3 whitespace-nowrap'>
                          Compras
                        </span>
                      </button>
                    </li>
                  </Link>
                  {/* cerrar sesion */}
                  <li className='mt-6 cursor-pointer'>
                    <Logout />
                  </li>
                </>
              ) : (
                <>
                  <Link to={'/iniciarsesion'}>
                    <li className='hover:bg-gray-500 rounded-2xl'>
                      <button onClick={activar} className='   cursor-pointer '>
                        <div className='flex   items-center p-2 text-base font-normal text-white  '>
                          <FaSignInAlt />

                          <span className='  ml-3 whitespace-nowrap'>
                            Iniciar sesion
                          </span>
                        </div>

                        {/* <Login /> */}
                      </button>
                    </li>
                  </Link>
                  <Link to={'/Registrar'}>
                    <li className='hover:bg-gray-500 rounded-2xl'>
                      <button onClick={activar} className='    cursor-pointer '>
                        <div className='flex  items-center p-2 text-base font-normal text-white    '>
                          <IoPersonAddSharp />

                          <span className='  ml-3 whitespace-nowrap'>
                            Registrar
                          </span>
                        </div>
                      </button>
                      {/* <Registrarboton /> */}
                    </li>
                  </Link>
                </>
              )}

              {/* inciarse sesion  */}
            </ul>
          </div>
        </aside>
      </div>
    </>
  )
}

export default Sidebar
