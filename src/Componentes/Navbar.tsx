import { useState } from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useClerk } from '@clerk/clerk-react'
import { Notificaciones_store } from '../Zustand/Notificaciones_store'
import { carrito_store } from '../Zustand/Carrito_store'
import { favoritos_store } from '../Zustand/Favoritos_store'
const Navbar = () => {
  const { isSignedIn } = useAuth()
  const { user } = useClerk()
  const [sidebar, Setsidbar] = useState<boolean>(false)

  const actualizar = Notificaciones_store(
    (state) => state.solicitar_notificicaciones
  )
  const carrito = carrito_store((state) => state.carrito)
  const favoritos = favoritos_store((state) => state.favoritos)

  const n_vistas = async (sidebar: boolean) => {
    // [] terminar el contador de noficaciones no vistas

    actualizar()
    Setsidbar(sidebar)
  }

  return (
    <>
      <div className='flex flex-wrap place-items-center  '>
        <section className='relative m-auto'>
          <nav className='flex    bg-[#000000] text-white w-screen '>
            <div className='px-5 xl:px-10 py-6 flex w-full items-center'>
              <a className='text-3xl font-bold  flex font-heading' href='/'>
                <img
                  className='h-10'
                  src='https://josmerweb.netlify.app/techsells-high-resolution-logo-white.png'
                  alt='logo'
                />
                Techsells
              </a>
              <ul className=' hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12'>
                <Link to={'/'}>
                  <li>
                    <span className='hover:text-gray-200'>Inicio</span>
                  </li>
                </Link>
                <Link to={'/productos'}>
                  <li>
                    <span className='hover:text-gray-200'>Productos</span>
                  </li>
                </Link>
                {/* <Link to={'/categorias'}>
                  <li>
                    <span className='hover:text-gray-200'>Categorias</span>
                  </li>
                </Link> */}
                <Link to={'/contacto'}>
                  <li>
                    <span className='hover:text-gray-200'>Contacto</span>
                  </li>
                </Link>
              </ul>
              <div className='hidden xl:flex   space-x-5 items-center'>
                {/* // aqui comienzan mis favoritos de usuarios */}
                {isSignedIn && (
                  <>
                    <Link to={'/u/favoritos'}>
                      <button
                        onClick={() => {
                          sidebar && Setsidbar(false)
                        }}
                        className='hover:text-gray-200  cursor-pointer  '
                      >
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
                        {favoritos.length > 0 && (
                          <span className='flex absolute -mt-4 ml-1'>
                            <span className='animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75'></span>
                          </span>
                        )}
                      </button>
                    </Link>

                    {/* aqui comienza mis carrito de compras de usuarios */}

                    <Link to={'/u/carrito'}>
                      <button
                        onClick={() => {
                          sidebar && Setsidbar(false)
                        }}
                        className='flex cursor-pointer  items-center hover:text-gray-200'
                      >
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
                        {/* animacion de carrito cando tiene items buena idea */}
                        {carrito.length > 0 && (
                          <span className='flex absolute -mt-5 ml-4'>
                            <span className='animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75'></span>
                            <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                          </span>
                        )}
                      </button>
                    </Link>
                  </>
                )}
                {/* boton de lineas para barra lateral en xl */}
                <button
                  className='flex cursor-pointer  items-center hover:text-gray-200'
                  onClick={() => {
                    n_vistas(!sidebar)
                  }}
                >
                  {/* foto de perfil condicional */}

                  {isSignedIn ? (
                    <img
                      className='h-10 w-10  rounded-4xl justify-center bg-center'
                      src={user?.imageUrl}
                      alt=''
                    />
                  ) : (
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
                  )}
                </button>
              </div>
            </div>
            {isSignedIn && (
              <>
                {/* aqui comienza carrito en resolucion mobil*/}
                <Link
                  className='xl:hidden cursor-pointer flex mr-6 items-center'
                  to={'/u/carrito'}
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
                n_vistas(!sidebar)
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

            {sidebar && <Sidebar activar={() => Setsidbar(!sidebar)} />}
          </nav>
        </section>
      </div>
    </>
  )
}

export default Navbar
