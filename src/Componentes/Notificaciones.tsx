import Notificacion from './Notificacion'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import {
  borrar_notificaciones,
  borrar_todas_notificaciones,
  marcar_visto,
  usuario_notificaciones
} from '../Services'
import { notificacionesprops } from './types'
import { AiOutlineReload, AiFillDelete } from 'react-icons/ai'
import { toast } from 'sonner'

const Notificaciones = () => {
  const data = useLoaderData<notificacionesprops[]>()
  const [misnotificaciones, setnotificaciones] = useState<
    notificacionesprops[]
  >([])

  const borrar_notifiacacion_unica = async (id: string) => {
    await borrar_notificaciones(id)
    const filtrado = misnotificaciones.filter((e) => e.id !== id)
    setnotificaciones(filtrado)
  }

  const Recargar_notificaciones = async () => {
    const datos = await usuario_notificaciones()
    if (datos.length! > misnotificaciones.length) {
      toast.success('nada nuevo que cargar')
    } else if (datos.length) {
      const cantidad = datos.length - misnotificaciones.length
      toast.success(`tienes ${cantidad} notificaciones nuevas `)
    }
    setnotificaciones(datos)
  }
  const borrar_todas_notificaciones_usuario = async () => {
    if (misnotificaciones.length > 0) {
      await borrar_todas_notificaciones()
      setnotificaciones([])
    } else {
      toast.warning('no hay nada que borrar')
    }
  }
  useEffect(() => {
    const marcar_visto_todo = async () => {
      await marcar_visto()
    }
    marcar_visto_todo()
    setnotificaciones(data)
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
                  onClick={borrar_todas_notificaciones_usuario}
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
                  onClick={Recargar_notificaciones}
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
                id={n.id}
                titulo={n.titulo}
                descripcion={n.descripcion}
                fecha_creacion={n.fecha_creacion}
                visto={n.visto}
                borrar={borrar_notifiacacion_unica}
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
