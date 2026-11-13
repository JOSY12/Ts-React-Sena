import { useSearchParams } from 'react-router-dom'
import { productos_store } from '../Zustand/Productos_store'
import { parseFilters, serializeFilters } from '../shared/utils/filters'

const Paginado = ({ admin = false }: { admin?: boolean }) => {
  const paginas = productos_store((state) =>
    admin ? state.paginas_admin : state.paginas
  )
  const [params, setParams] = useSearchParams()
  const filters = parseFilters(params)
  const current = filters.Pagina
  const start = Math.max(1, Math.min(current - 2, paginas - 4))
  const pages = Array.from({ length: Math.min(5, paginas) }, (_, i) => start + i)
  const go = (page: number) => setParams(serializeFilters({ ...filters, Pagina: page }))
  return (
    <nav
      aria-label='Paginación de productos'
      className='pagination flex flex-wrap justify-center items-center my-4'
    >
      <button
        type='button'
        disabled={current <= 1}
        onClick={() => go(current - 1)}
        className='p-2 disabled:opacity-50'
      >
        Anterior
      </button>
      {pages.map((page) => (
        <button
          type='button'
          key={page}
          aria-current={page === current ? 'page' : undefined}
          disabled={page === current}
          onClick={() => go(page)}
          className='m-2 border rounded-md p-2 disabled:text-blue-600 disabled:border-blue-500'
        >
          {page}
        </button>
      ))}
      <button
        type='button'
        disabled={current >= paginas}
        onClick={() => go(current + 1)}
        className='p-2 disabled:opacity-50'
      >
        Siguiente
      </button>
    </nav>
  )
}
export default Paginado
