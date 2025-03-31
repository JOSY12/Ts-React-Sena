import { Link } from 'react-router-dom'
export default function PaginaError() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-black text-white px-4'>
      <div className='text-center max-w-md'>
        <h1 className='text-6xl font-bold text-red-500'>Oops!</h1>
        <p className='mt-4 text-lg'>
          Algo salió mal. No pudimos encontrar la página que buscas.
        </p>
        <p className='mt-2 text-gray-400'></p>
        <Link
          className='mt-6 inline-block px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition'
          to={'/'}
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  )
}
