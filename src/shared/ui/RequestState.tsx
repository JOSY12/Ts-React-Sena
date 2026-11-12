import type { LoadStatus } from '../../Componentes/types'

export default function RequestState({
  status,
  error,
  empty = false,
  emptyText = 'No hay datos para mostrar.',
  retry
}: {
  status: LoadStatus
  error?: string | null
  empty?: boolean
  emptyText?: string
  retry?: () => unknown
}) {
  if (error)
    return (
      <div
        role='alert'
        className='m-4 rounded-lg border border-red-200 bg-white p-4 text-red-700'
      >
        <p>{error}</p>
        {retry && (
          <button
            type='button'
            onClick={() => {
              retry()
            }}
            className='mt-2 underline'
          >
            Reintentar
          </button>
        )}
      </div>
    )
  if (status === 'loading' || status === 'idle')
    return (
      <p role='status' className='m-4 animate-pulse p-4'>
        Cargando...
      </p>
    )
  if (empty)
    return (
      <p role='status' className='m-4 p-4 text-gray-600'>
        {emptyText}
      </p>
    )
  return null
}
