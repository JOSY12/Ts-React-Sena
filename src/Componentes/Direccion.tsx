// import { obtener_usuario } from '../Services'
// import { useEffect, useState } from 'react'
import { Direcciones_usuario } from '../Zustand/Direcciones_usuario'
import { direccion } from './types'

const Direccion = ({
  id,
  nombre_comprador,
  ciudad,
  direccion,
  nota,
  codigo_postal,
  telefono,
  predeterminada
}: direccion) => {
  const quitar = Direcciones_usuario((state) => state.quitar)
  const cambiar_predeterminado = Direcciones_usuario(
    (state) => state.cambiar_predeterminado
  )

  return (
    <>
      <div className=' border-t-1 m-3 border-black '>
        {/* tarjeta de direcciones */}
        <div className='flex flex-col '>
          <button
            onClick={() => quitar(id ? id : '')}
            className='justify-end flex ml-auto   rounded-tr-2xl  rounded-tl-2xl text-sm font-semibold text-gray-700 px-4 py-2  bg-red-200   focus:outline-none hover:bg-red-400'
          >
            <span>Remover direccion</span>
          </button>

          <div className='text-gray-700  bg-gray-100  hover:bg-gray-300  font-bold   hover:text-black hover:font-bold  rounded-tl-2xl  rounded-b-2xl roun'>
            <div className='grid md:grid-cols-2 text-sm'>
              <div className='grid grid-cols-2'>
                <div className='px-4 py-2 font-semibold'>Nombre completo</div>
                <div className='px-4 py-2'>{nombre_comprador}</div>
              </div>

              <div className='grid grid-cols-2'>
                <div className='px-4 py-2 font-semibold'>
                  Telefono conctacto
                </div>
                <div className='px-4 py-2'>{telefono}</div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='px-4 py-2 font-semibold'>
                  Direccion de entrega
                </div>
                <div className='px-4 py-2'>{direccion}</div>
              </div>

              <div className='grid grid-cols-2'>
                <div className='px-4 py-2 font-semibold'>Direccion Postal</div>
                <div className='px-4 py-2'>{codigo_postal}</div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='px-4 py-2 font-semibold'>Ciudad de entrega</div>
                <div className='px-4 py-2'>{ciudad}</div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='px-4 py-2 font-semibold'>
                  Detalles de la direccion
                </div>
                <div className='px-4 py-2'>{nota}</div>
              </div>
            </div>
            <div className='flex justify-end text-center'>
              {predeterminada ? (
                <div className='justify-end w-full  text-sm font-semibold text-gray-700 px-4 py-2 rounded-b-2xl bg-green-200 hover:text-white hover:bg-green-400 focus:outline-none  '>
                  Direccion predeterminada de envios
                </div>
              ) : (
                <button
                  onClick={() => cambiar_predeterminado(id ? id : '')}
                  className='justify-end w-full  text-sm font-semibold text-gray-700 px-4 py-2 rounded-b-2xl bg-blue-200 hover:text-white hover:bg-blue-400 focus:outline-none  '
                >
                  <div>Guardar como predeterminado</div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* tarjeta de direcciones */}
      </div>
    </>
  )
}

export default Direccion
