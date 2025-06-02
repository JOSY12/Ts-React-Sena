import { Notificaciones_store } from '../Zustand/Notificaciones_store'
import { notificacionesprops } from './types'

const Notificacion = ({
  id,
  icono,
  titulo,
  descripcion,
  fecha_creacion,
  visto,
  fecha_relativa
}: notificacionesprops) => {
  const borrar = Notificaciones_store((state) => state.quitar)
  // agregar iconos desde el backend con fs file node en carpeta de iconos en backend

  return (
    <div
      className={`w-full p-3 mt-4     ${
        visto ? 'bg-gray-200' : 'bg-gray-100'
      } rounded shadow flex flex-shrink-0`}
    >
      <span className='hidden'>{id}</span>
      <div className='focus:outline-none    rounded-full flex flex-shrink-0 items-center justify-center'>
        <img src={icono} className=' h-10  justify-center text-center' />
      </div>
      <div className='pl-3 w-full'>
        <div className='flex items-center justify-between w-full'>
          <p className='focus:outline-none text-sm leading-none'>
            <span className='text-indigo-700 truncate font-bold'>{titulo}</span>
            :
            <br />
            <span className='text-blue-600 break-all font-medium'>
              {' '}
              {descripcion}
            </span>
          </p>
          <button
            onClick={() => {
              borrar(id)
            }}
            className='cursor-pointer  items-center'
          >
            <div className='focus:outline-none cursor-pointer   flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-200'>
              <svg
                width='14'
                height='14'
                viewBox='0 0 14 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10.5 3.5L3.5 10.5'
                  stroke='#4B5563'
                  strokeWidth='1.25'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M3.5 3.5L10.5 10.5'
                  stroke='#4B5563'
                  strokeWidth='1.25'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </button>
        </div>
        <div className='focus:outline-none text-xs leading-3 pt-1 flex justify-between text-gray-500'>
          <div className='flex flex-col'>
            <span className='relative rounded-2xl text-black font-normal'>
              {fecha_relativa}
            </span>
            {fecha_creacion}
          </div>

          <span
            className={`relative rounded-2xl ${
              visto ? ' ' : ' text-green-600 '
            }  text-black font-bold`}
          >
            {visto ? 'Visto' : 'nuevo'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Notificacion
