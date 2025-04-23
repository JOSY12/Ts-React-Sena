import { useAuth } from '@clerk/clerk-react'
import Notificacion from './Notificacion'
import { usuario_notificaciones } from '../Services'
import { useEffect, useState } from 'react'
type NotificacionProps = {
  id: string
  titulo: string
  descripcion: string
  fecha_creacion: string
}
const Notificaciones = () => {
  const { userId } = useAuth()

  const [misnotificaciones, setnotificaciones] = useState<NotificacionProps[]>(
    []
  )

  useEffect(() => {
    const datos = async () => {
      if (userId) {
        const data = await usuario_notificaciones()
        setnotificaciones(data)
      }
    }

    datos()
  }, [userId])

  return (
    <div className='     bg-opacity-90'>
      <div className='w-full     duration-700'>
        <div className=' w-full bg-gray-100  p-8    '>
          <div className='flex items-center justify-between'>
            <p className='focus:outline-none  mx-4 py-4 text-2xl font-semibold leading-6 text-gray-800'>
              Notificaciones
            </p>
          </div>
          {/* ejemplo para multiplicar */}
          {misnotificaciones.map((n) => (
            <Notificacion
              key={n.id}
              id={n.id}
              titulo={n.titulo}
              descripcion={n.descripcion}
              fecha_creacion={n.fecha_creacion}
            />
          ))}

          {/* fin del card */}
          <div className='flex items-center justiyf-between'>
            <hr className='w-full'></hr>
            <p className='focus:outline-none text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500'>
              Eso es todo por ahora :D
            </p>
            <hr className='w-full'></hr>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notificaciones
