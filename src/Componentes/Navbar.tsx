import { useState } from 'react'
// import Login from './Login'
import { useAuth0 } from '@auth0/auth0-react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
const Navbar = () => {
  const { isAuthenticated } = useAuth0()

  const [sidebar, Setsidbar] = useState<boolean>(false)

  return (
    <>
      <div className='flex flex-wrap place-items-center  '>
        <section className='relative mx-auto'>
          <nav className='flex justify-between bg-gray-900 text-white w-screen'>
            <div className='px-5 xl:px-12 py-6 flex w-full items-center'>
              <a className='text-3xl font-bold font-heading'>
                {/* <img className='h-9' src='logo.png' alt='logo' /> */}
                Techsells
              </a>
              <ul className='hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12'>
                <li>
                  <a className='hover:text-gray-200' href='#'>
                    Inicio
                  </a>
                </li>
                <li>
                  <a className='hover:text-gray-200' href='#'>
                    Categorias
                  </a>
                </li>
                <li>
                  <a className='hover:text-gray-200' href='#'>
                    Productos
                  </a>
                </li>
                <li>
                  <a className='hover:text-gray-200' href='#'>
                    Contacto
                  </a>
                </li>
              </ul>
              <div className='hidden xl:flex   space-x-5 items-center'>
                {/* // aqui comienzan mis favoritos de usuarios */}
                {isAuthenticated && (
                  <>
                    <Link to={'/favoritos'}>
                      <button className='hover:text-gray-200 cursor-pointer '>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
                          fill='red'
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
                      </button>
                    </Link>

                    {/* aqui comienza mis carrito de compras de usuarios */}

                    <Link to={'/carrito'}>
                      <button className='flex cursor-pointer  items-center hover:text-gray-200'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                          />
                        </svg>
                        <span className='flex absolute -mt-5 ml-4'>
                          {/* animacion de carrito cando tiene items buena idea */}
                          {/* <span className='animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75'></span>
                        {carrito.length && } */}
                          <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                        </span>
                      </button>
                    </Link>
                  </>
                )}

                {/* boton de lineas para barra lateral en xl */}

                <button
                  className='flex cursor-pointer  items-center hover:text-gray-200'
                  onClick={() => {
                    Setsidbar(!sidebar)
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 hover:text-gray-200'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </button>
              </div>
            </div>
            {isAuthenticated && (
              <>
                {/* aqui comienza carrito en resolucion mobil*/}
                <Link
                  className='xl:hidden cursor-pointer flex mr-6 items-center'
                  to={'/carrito'}
                >
                  <button>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 hover:text-gray-200'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                      />
                    </svg>
                    {/* notificacion del carrito */}
                    <span className='flex absolute -mt-5 ml-4'>
                      <span className='animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75'></span>
                      <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                    </span>
                  </button>
                </Link>
              </>
            )}
            {/* barra burger de navbar para resolucion mobil */}

            <button
              onClick={() => {
                Setsidbar(!sidebar)
              }}
              className='navbar-burger cursor-pointer self-center mr-12 xl:hidden'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 hover:text-gray-200'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>

            {sidebar && <Sidebar />}
          </nav>
        </section>
      </div>
    </>
  )
}

export default Navbar
