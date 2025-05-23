import { Notificaciones_store } from '../Zustand/Notificaciones_store'
import { notificacionesprops } from './types'

const Notificacion = ({
  id,
  titulo,
  descripcion,
  fecha_creacion,
  visto
}: notificacionesprops) => {
  const borrar = Notificaciones_store((state) => state.quitar)

  return (
    <div
      className={`w-full p-3 mt-4     ${
        visto ? 'bg-gray-200' : 'bg-gray-100'
      } rounded shadow flex flex-shrink-0`}
    >
      <span className='hidden'>{id}</span>
      <div
        aria-label='group icon'
        role='img'
        className='focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex flex-shrink-0 items-center justify-center'
      >
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1.33325 14.6667C1.33325 13.2522 1.89516 11.8956 2.89535 10.8954C3.89554 9.89523 5.2521 9.33333 6.66659 9.33333C8.08107 9.33333 9.43763 9.89523 10.4378 10.8954C11.438 11.8956 11.9999 13.2522 11.9999 14.6667H1.33325ZM6.66659 8.66666C4.45659 8.66666 2.66659 6.87666 2.66659 4.66666C2.66659 2.45666 4.45659 0.666664 6.66659 0.666664C8.87659 0.666664 10.6666 2.45666 10.6666 4.66666C10.6666 6.87666 8.87659 8.66666 6.66659 8.66666ZM11.5753 10.1553C12.595 10.4174 13.5061 10.9946 14.1788 11.8046C14.8515 12.6145 15.2515 13.6161 15.3219 14.6667H13.3333C13.3333 12.9267 12.6666 11.3427 11.5753 10.1553ZM10.2266 8.638C10.7852 8.13831 11.232 7.52622 11.5376 6.84183C11.8432 6.15743 12.0008 5.41619 11.9999 4.66666C12.0013 3.75564 11.7683 2.85958 11.3233 2.06466C12.0783 2.21639 12.7576 2.62491 13.2456 3.2208C13.7335 3.81668 14.0001 4.56315 13.9999 5.33333C14.0001 5.80831 13.8987 6.27784 13.7027 6.71045C13.5066 7.14306 13.2203 7.52876 12.863 7.84169C12.5056 8.15463 12.0856 8.38757 11.6309 8.52491C11.1762 8.66224 10.6974 8.7008 10.2266 8.638Z'
            fill='#047857'
          />
        </svg>
      </div>
      <div className='pl-3 w-full'>
        <div className='flex items-center justify-between w-full'>
          <p className='focus:outline-none text-sm leading-none'>
            <span className='text-indigo-700'>{titulo}</span>:
            <span className='text-indigo-700'> {descripcion}</span>
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
        <p className='focus:outline-none text-xs leading-3 pt-1 flex justify-between text-gray-500'>
          {fecha_creacion}
          <span
            className={`relative rounded-2xl ${
              visto ? ' ' : ' text-green-600 '
            }  text-black font-bold`}
          >
            {visto ? 'Visto' : 'nuevo'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Notificacion
