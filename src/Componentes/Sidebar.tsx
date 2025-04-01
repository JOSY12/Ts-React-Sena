// import React from 'react'

import { Link } from 'react-router-dom'
import Login from './Login'
import Logout from './Logout'
import { useAuth0 } from '@auth0/auth0-react'
const Sidebar = () => {
  const { isAuthenticated } = useAuth0()
  return (
    <>
      <div
        className={`  
        } max-w-2xl absolute right-0 mt-20 mx-auto`}
      >
        <aside className='w-64' aria-label='Sidebar'>
          <div className='px-3 py-4 overflow-y-auto rounded   bg-gray-900'>
            <ul className='space-y-2'>
              {isAuthenticated ? (
                <>
                  {/* dashboard */}
                  <li>
                    <a
                      href='#'
                      className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    >
                      <svg
                        className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
                        <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
                      </svg>
                      <span className='ml-3'>Dashboard</span>
                    </a>
                  </li>
                  <li></li>
                  {/* mensajes de usuarios */}
                  <li>
                    <a
                      href='#'
                      target='_blank'
                      className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    >
                      <svg
                        className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
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
                      {/* <span className='inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200'>
                        3
                      </span> */}
                    </a>
                  </li>
                  {/* administracion de usuarios */}
                  <li>
                    <button className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                      <svg
                        className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
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

                      <Link to={'/usuarios'}>
                        <span className='flex-1 ml-3 whitespace-nowrap'>
                          Perfil
                        </span>
                      </Link>
                    </button>
                  </li>

                  <li>
                    <a
                      href='#'
                      className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
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
                    </a>
                  </li>

                  {/* productos de tienda */}
                  <li>
                    <a
                      href='#'
                      className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    >
                      <svg
                        className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
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
                    </a>
                  </li>
                  {/* cerrar sesion */}
                  <li>
                    <Logout />{' '}
                  </li>
                </>
              ) : (
                <li>
                  <Login />
                </li>
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
