// import { basedatos } from '../bd'
import Producto from './Producto'
import { productos_store } from '../Zustand/Productos_store'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const Productos = () => {
  const productos = productos_store((state) => state.productos)
  const [parametrosUrl] = useSearchParams()

  const solicitar_productos = productos_store(
    (state) => state.solicitar_productos
  )
  const buscar_con_filtros = productos_store(
    (state) => state.buscar_con_filtros
  )
  useEffect(() => {
    const parametros = Object.fromEntries(parametrosUrl.entries())

    buscar_con_filtros({
      Nombre: parametros.Nombre ? parametros.Nombre.trim() : '',
      Categorias: parametros.Categorias.split(','),
      Minimo: parametros.Minimo ? parametros.Minimo : '',
      Maximo: parametros.Maximo ? parametros.Maximo : ''
    })

    solicitar_productos()
  }, [])
  // []agregar los filtros o el componente filtros y agregar el slice de zustand para los productos y tener mejor control de ellos
  return (
    <div className='   '>
      {/* label productos   */}
      <div className={`mt-6  lg:mt-0 lg:px-2 `}>
        <div className='flex items-center justify-between text-sm tracking-widest uppercase '>
          <p className='ml-6 '>Productos encontrados:{productos.length}</p>
          <div className='flex items-center'></div>
        </div>
        {productos && productos.length > 0 ? (
          <div className='grid sm:grid-cols-2 gap-2  m-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
            {/* mi tarjeta de prueba */}
            {productos.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))}

            {/* fin de tarjeta */}
          </div>
        ) : (
          <div className='flex   items-center  ml-5'>
            <div className='w-1/3'>
              <div className='max-w-sm rounded overflow-hidden shadow-lg animate-pulse'>
                <div className='h-48 bg-gray-300'></div>
                <div className='px-6 py-4'>
                  <div className='h-6 bg-gray-300 mb-2'></div>
                  <div className='h-4 bg-gray-300 w-2/3'></div>
                </div>
                <div className='px-6 pt-4 pb-2'>
                  <div className='h-4 bg-gray-300 w-1/4 mb-2'></div>
                  <div className='h-4 bg-gray-300 w-1/2'></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Productos
