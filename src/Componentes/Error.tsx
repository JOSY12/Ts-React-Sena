import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function PaginaError() {
  const navigate = useNavigate()

  return (
    <div className='flex min-h-screen items-center justify-center bg-white text-white px-4'>
      <div className='text-center max-w-md'>
        <h1 className='text-6xl font-bold text-black'>Oops!</h1>
        <p className='mt-4 text-lg text-black'>
          Algo salió mal. No pudimos encontrar la página que buscas.
        </p>
        <p className='mt-2 text-black'></p>
        <button
          className='mt-6 inline-block px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition'
          onClick={() => navigate(-1)} // Navega hacia atrás en el historial
        >
          Volver a la Página Anterior
        </button>
        <Link
          to='/'
          className='mt-6 inline-block px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition'
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
