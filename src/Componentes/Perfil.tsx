import { useAuth0 } from '@auth0/auth0-react'
import { obtener_usuario } from '../Services'
import { useEffect, useState } from 'react'

type usuario = {
  id: string
  nombre: string
  email: string
  edad: null | number
  claveacceso: null | string
  fecha_creacion: string
}

interface respuestas {
  Exito: boolean
  Datos?: usuario
  Error?: string
}

const Perfil = () => {
  const { user } = useAuth0()

  const [datos, setdatos] = useState<usuario>()

  const usuariosbd = async (): Promise<respuestas> => {
    if (!user?.sub) {
      return {
        Exito: false,
        Error: 'El usuario no está autenticado o no tiene un ID válido.'
      }
    }

    try {
      const res = await obtener_usuario(user.sub)

      if (res?.Datos?.Perfil?.length > 0) {
        setdatos(res.Datos.Perfil[0])
        return { Exito: true, Datos: res.Datos.Perfil[0] }
      }

      return {
        Exito: false,
        Error: 'No se encontró información del perfil en la base de datos.'
      }
    } catch (error: unknown) {
      console.error('Error al obtener el perfil del usuario:', error)
      return {
        Exito: false,
        Error: 'Ocurrió un error al procesar los datos del perfil.'
      }
    }
  }

  useEffect(() => {
    if (user?.sub) {
      usuariosbd()
    }
  }, [user])

  return (
    <>
      <div className='bg-gray-100  min-h-screen'>
        <div className='container mx-auto my-5 p-5'>
          <div className='md:flex no-wrap md:-mx-2 '>
            {/* <!-- Left Side --> */}
            <div className='w-full md:w-3/12 md:mx-2'>
              {/* <!-- Profile Card --> */}
              <div className='bg-white p-3 border-t-4 border-green-400'>
                <div className='image overflow-hidden'>
                  <img
                    className='h-auto w-full mx-auto'
                    src={user?.picture}
                    alt=''
                  ></img>
                </div>

                <h1 className='text-gray-900 font-bold text-xl leading-8 my-1'>
                  {user?.name}
                </h1>
                <h3 className='text-gray-600 font-lg text-semibold leading-6'>
                  {user?.nickname}
                </h3>

                <ul className='bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm'>
                  <li className='flex items-center py-3'>
                    <span>Estado</span>
                    <span className='ml-auto'>
                      <span className='bg-green-500 py-1 px-2 rounded text-white text-sm'>
                        {/* {user?.profile} */}
                        activo
                      </span>
                    </span>
                  </li>
                  <li className='flex items-center py-3'>
                    <span>Fecha de Registrado</span>
                  </li>
                  <span className='ml-auto text-wrap  '>
                    {datos?.fecha_creacion}
                  </span>
                </ul>
              </div>
              <div className='my-4'></div>
            </div>
            <div className='w-full md:w-9/12 mx-2 h-64'>
              <div className='bg-white p-3 shadow-sm rounded-sm'>
                <div className='flex items-center space-x-2 font-semibold text-gray-900 leading-8'>
                  <span className='text-green-500'>
                    <svg
                      className='h-5'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </span>
                  <span className='tracking-wide'>Informacion</span>
                </div>
                <div className='text-gray-700'>
                  <div className='grid md:grid-cols-2 text-sm'>
                    <div className='grid grid-cols-2'>
                      <div className='px-4 py-2 font-semibold'>Nombre</div>
                      <div className='px-4 py-2'>{user?.given_name}</div>
                    </div>
                    <div className='grid grid-cols-2'>
                      <div className='px-4 py-2 font-semibold'>Apeliido</div>
                      <div className='px-4 py-2'>{user?.family_name}</div>
                    </div>
                    <div className='grid grid-cols-2'>
                      {/* <div className='px-4 py-2 font-semibold'>Genero</div>
                      <div className='px-4 py-2'>Female</div> */}
                    </div>
                    <div className='grid grid-cols-2'>
                      <div className='px-4 py-2 font-semibold'>Contacto</div>
                      <div className='px-4 py-2'>{user?.phone_number}</div>
                    </div>
                    <div className='grid grid-cols-2'>
                      <div className='px-4 py-2 font-semibold'>
                        Direcion Actual
                      </div>
                      <div className='px-4 py-2'>Montelibao cordoba</div>
                    </div>
                    <div className='grid grid-cols-2'>
                      <div className='px-4 py-2 font-semibold'>
                        Direccion de entrega
                      </div>
                      <div className='px-4 py-2'>cr22</div>
                    </div>
                    <div className='grid grid-cols-2'>
                      <div className='px-4 py-2 font-semibold'>Email.</div>
                      <div className='px-4 py-2'>
                        <a
                          className='text-blue-800'
                          href={`mailto:${user?.email}`}
                        >
                          {user?.email}
                        </a>
                      </div>
                    </div>
                    <div className='grid grid-cols-2'>
                      <div className='px-4 py-2 font-semibold'>
                        Fecha de nacimiento
                      </div>
                      <div className='px-4 py-2'>{user?.birthdate}</div>
                    </div>
                  </div>
                </div>
                <button className='block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4'>
                  Modificar
                </button>
              </div>

              <div className='my-4'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Perfil
