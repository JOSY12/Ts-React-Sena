import Notificacion from './Notificacion'

import { AiOutlineReload, AiFillDelete } from 'react-icons/ai'
import { Notificaciones_store } from '../Zustand/Notificaciones_store'
import { useEffect } from 'react'

const Notificaciones = () => {
  // const data = useLoaderData<notificacionesprops[]>()
  const misnotificaciones = Notificaciones_store(
    (state) => state.misnotificaciones
  )
  const borrar_todo = Notificaciones_store((state) => state.borrar_todo)
  const actualizar = Notificaciones_store(
    (state) => state.solicitar_notificicaciones
  )
  const marcar_vistos = Notificaciones_store((state) => state.marcar_vistos)

  const recargar = () => {
    marcar_vistos()
    actualizar()
  }
  useEffect(() => {
    marcar_vistos()
  }, [])

  return (
    <div className='     bg-opacity-90'>
      <div className='w-full     duration-700'>
        <div className=' w-full bg-gray-100  p-8    '>
          <div className='flex items-center justify-between'>
            <p className='focus:outline-none  mx-4 py-4 text-2xl font-semibold leading-6 text-gray-800'>
              Notificaciones
            </p>

            <div className='flex'>
              <div className='relative group inline-block'>
                <button
                  onClick={borrar_todo}
                  className='flex focus:outline-none cursor-pointer  mx-4 py-4 text-2xl font-semibold leading-6 text-gray-800'
                >
                  <AiFillDelete />
                  <div className='absolute top-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm rounded px-2 py-1 pointer-events-none'>
                    Borrar todo
                  </div>
                </button>
              </div>

              <div className='relative group inline-block'>
                <button
                  onClick={recargar}
                  className='flex focus:outline-none cursor-pointer  mx-4 py-4 text-2xl font-semibold leading-6 text-gray-800'
                >
                  <AiOutlineReload />
                  <div className='absolute top-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm rounded px-2 py-1 pointer-events-none'>
                    Recargar
                  </div>
                </button>
              </div>
            </div>
          </div>
          {/* ejemplo para multiplicar */}
          {misnotificaciones && misnotificaciones?.length > 0 ? (
            misnotificaciones.map((n) => (
              <Notificacion
                key={n.id}
                fecha_relativa={n.fecha_relativa}
                id={n.id}
                icono={n.icono}
                titulo={n.titulo}
                descripcion={n.descripcion}
                fecha_creacion={n.fecha_creacion}
                visto={n.visto}
              />
            ))
          ) : (
            <div className='flex items-center justiyf-between'>
              <hr className='w-full'></hr>
              <p className='focus:outline-none text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500'>
                Eso es todo por ahora :D
              </p>
              <hr className='w-full'></hr>
            </div>
          )}

          {/* fin del card */}
        </div>
      </div>
    </div>
  )
}

export default Notificaciones
