// import { obtener_usuario } from '../Services'
// import { useEffect, useState } from 'react'
import { UserButton, UserProfile } from '@clerk/clerk-react'
import { useAuth } from '@clerk/clerk-react'
import { useClerk } from '@clerk/clerk-react'
// type usuario = {
//   id: string
//   nombre: string
//   email: string
//   edad: null | number
//   claveacceso: null | string
//   fecha_creacion: string
// }

// interface respuestas {
//   Exito: boolean
//   Datos?: usuario
//   Error?: string
// }

const Perfil = () => {
  const { user } = useClerk()

  // const [datos, setdatos] = useState<usuario>()

  // const usuariosbd = async (): Promise<respuestas> => {
  //   if (!userId?.sub) {
  //     return {
  //       Exito: false,
  //       Error: 'El usuario no está autenticado o no tiene un ID válido.'
  //     }
  //   }

  //   try {
  //     const res = await obtener_usuario(userId)

  //     if (res?.Datos?.Perfil?.length > 0) {
  //       setdatos(res.Datos.Perfil[0])
  //       return { Exito: true, Datos: res.Datos.Perfil[0] }
  //     }

  //     return {
  //       Exito: false,
  //       Error: 'No se encontró información del perfil en la base de datos.'
  //     }
  //   } catch (error: unknown) {
  //     console.error('Error al obtener el perfil del usuario:', error)
  //     return {
  //       Exito: false,
  //       Error: 'Ocurrió un error al procesar los datos del perfil.'
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (userId?.sub) {
  //     usuariosbd()
  //   }
  // }, [userId])
  return (
    <>
      <div className='flex justify-center   bg-gray-100'>
        <UserProfile />
      </div>
      <div className='bg-gray-100 flex justify-center shadow-2xl '>
        <div className='container flex justify-center      '>
          <div className=' flex justify-center   w-full    sm:w-full md:w-full lg:w-4xl   '>
            {/* <!-- Left Side --> */}
            <div className='w-full mt-5 px-4   '>
              <div className='bg-white p-3 shadow-2xl rounded-xl   border-1 border-gray-300 '>
                <div className='flex items-center space-x-2 font-semibold  text-gray-900 leading-8'>
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
                      <div className='px-4 py-2'>{user?.username}</div>
                    </div>
                    <div className='grid grid-cols-2'>
                      <div className='px-4 py-2 font-semibold'>Apeliido</div>
                      <div className='px-4 py-2'>{user?.lastName}</div>
                    </div>
                    <div className='grid grid-cols-2'>
                      {/* <div className='px-4 py-2 font-semibold'>Genero</div>
                      <div className='px-4 py-2'>Female</div> */}
                    </div>
                    <div className='grid grid-cols-2'>
                      <div className='px-4 py-2 font-semibold'>Contacto</div>
                      <div className='px-4 py-2'>{user?.firstName}</div>
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
                          href={`mailto:${user?.emailAddresses}`}
                        >
                          {user?.fullName}
                        </a>
                      </div>
                    </div>
                    <div className='grid grid-cols-2'>
                      <div className='px-4 py-2 font-semibold'>
                        Fecha de nacimiento
                      </div>
                      <div className='px-4 py-2'>{user?.fullName}</div>
                    </div>
                  </div>
                </div>
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
