// import { obtener_usuario } from '../Services'
// import { useEffect, useState } from 'react'
import { UserProfile } from '@clerk/clerk-react'
import { useClerk } from '@clerk/clerk-react'
import Modal from './Modal'

const Perfil = () => {
  const { user } = useClerk()
  console.log(user)
  return (
    <>
      <UserProfile />

      <div className=' border-t-1 m-3 border-black '>
        <div className='     '>
          <div className='     '>
            <div className='    px-2   '>
              <div className='bg-white  p-3    '>
                <div className='flex   items-center space-x-2 font-semibold  text-gray-900  '>
                  <span className='  text-green-500'>
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

                  <span className=' tracking-wide'>Informacion de entrega</span>

                  <Modal />
                </div>
                <div className='text-gray-700'>
                  <div className='grid md:grid-cols-2 text-sm'>
                    <div className='grid grid-cols-2'>
                      <div className='px-4 py-2 font-semibold'>
                        Nombre completo
                      </div>
                      <div className='px-4 py-2'>{user?.fullName}</div>
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
