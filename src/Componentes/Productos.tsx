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
      <div>
        <div className='catalog-count'>
          <p>Productos encontrados: {productos.length}</p>
          <span>TECH / SELECT</span>
        </div>
        <RequestState
          status={status}
          error={error}
          empty={!productos.length}
          emptyText='No se encontraron productos con estos filtros.'
          retry={retry}
        />
        {status === 'success' && (
          <div className='product-grid catalog-products'>
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
