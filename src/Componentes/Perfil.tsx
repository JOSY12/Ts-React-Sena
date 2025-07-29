// import { obtener_usuario } from '../Services'
// import { useEffect, useState } from 'react'
import { UserProfile } from '@clerk/clerk-react'
import { useClerk } from '@clerk/clerk-react'
import Modal from './Modal'
import { Direcciones_usuario } from '../Zustand/Direcciones_usuario'
import Direccion from './Direccion'
import { useEffect } from 'react'

const Perfil = () => {
  const direciones = Direcciones_usuario((state) => state.misdirecciones)
  const solicitar_direcciones = Direcciones_usuario(
    (state) => state.solicitar_direcciones
  )

  useEffect(() => {
    solicitar_direcciones()
  }, [])

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
                {/* tarjeta de direcciones */}
                {direciones.map((direccion) => {
                  return <Direccion key={direccion.id} {...direccion} />
                })}
                {/* tarjeta de direcciones */}
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
