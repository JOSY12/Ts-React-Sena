import Producto from './Producto'
import { productos_store } from '../Zustand/Productos_store'
import Paginado from './Paginado'
import { useCatalog } from '../features/catalogo/useCatalog'
import RequestState from '../shared/ui/RequestState'

const Productos = () => {
  const retry = useCatalog()
  const productos = productos_store((state) => state.productos)
  const status = productos_store((state) => state.status)
  const error = productos_store((state) => state.error)
  return (
    <div>
      <div className='mt-6 lg:mt-0 lg:px-2'>
        <div className='flex items-center justify-between text-sm tracking-widest uppercase'>
          <p className='ml-6'>Productos encontrados: {productos.length}</p>
        </div>
        <RequestState
          status={status}
          error={error}
          empty={!productos.length}
          emptyText='No se encontraron productos con estos filtros.'
          retry={retry}
        />
        {status === 'success' && (
          <div className='grid sm:grid-cols-2 gap-2 m-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {productos.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
      {status === 'success' && productos.length > 0 && <Paginado />}
    </div>
  )
}
export default Productos
