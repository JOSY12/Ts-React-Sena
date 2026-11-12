import {
  isRouteErrorResponse,
  Link,
  useNavigate,
  useRouteError
} from 'react-router-dom'
import { IoIosHome } from 'react-icons/io'
import { errorMessage, errorStatus } from '../shared/api/errors'

export default function PaginaError() {
  const error: unknown = useRouteError()
  const navigate = useNavigate()
  const status = isRouteErrorResponse(error)
    ? error.status
    : error
      ? errorStatus(error)
      : 404
  const title =
    status === 404
      ? 'Pagina no encontrada'
      : status === 403
        ? 'Acceso restringido'
        : status === 401
          ? 'Inicia sesión para continuar'
          : 'No se pudo cargar la página'
  const message =
    status === 404
      ? 'La pagina que intentas acceder no existe.'
      : status === 403
        ? 'No tienes permisos para acceder a esta página.'
        : error
          ? errorMessage(error)
          : 'Intenta nuevamente.'
  return (
    <div className='bg-gray-200 w-full px-16 md:px-0 min-h-screen flex items-center justify-center'>
      <div
        role='alert'
        className='bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl'
      >
        <p className='text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-red-500'>
          {status}
        </p>
        <h1 className='text-2xl md:text-3xl lg:text-5xl font-bold text-gray-500 mt-4'>
          {title}
        </h1>
        <p className='text-gray-500 mt-4 pb-4 border-b-2 text-center'>{message}</p>
        <button
          type='button'
          onClick={() => navigate(-1)}
          className='bg-blue-600 text-gray-100 px-4 py-2 mt-6 rounded'
        >
          Volver a la Página Anterior
        </button>
        {status !== 404 && status !== 403 && (
          <button
            type='button'
            onClick={() => window.location.reload()}
            className='text-blue-700 underline mt-4'
          >
            Reintentar
          </button>
        )}
        <Link
          to='/'
          className='flex items-center space-x-2 bg-blue-600 text-gray-100 px-4 py-2 mt-6 rounded'
        >
          <IoIosHome />
          <span>Regresar al inicio</span>
        </Link>
      </div>
    </div>
  )
}
