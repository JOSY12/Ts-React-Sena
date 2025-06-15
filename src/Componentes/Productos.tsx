import Producto from './Producto'
import { productos_store } from '../Zustand/Productos_store'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { filtros_store } from '../Zustand/Filtros_store'
import Paginado from './Paginado'

const Productos = () => {
  const productos = productos_store((state) => state.productos)
  const buscar_con_filtros = filtros_store((state) => state.buscar_con_filtros)

  const [parametrosUrl] = useSearchParams()
  useEffect(() => {
    const parametros = Object.fromEntries(parametrosUrl.entries())
    console.log(parametros)
    buscar_con_filtros({
      Nombre: parametros.Nombre ?? '',
      Maximo: parametros.Maximo ?? '',
      Minimo: parametros.Minimo ?? '',
      // Paginas: parametros.paginPaginasas ?? 1,
      Pagina: parametros.Pagina ?? 1,
      Categorias: parametros.Categorias && parametros.Categorias.split(',')
    })
  }, [])
  return (
    <div>
      {/* display de  productos   */}
      <div className={`mt-6  lg:mt-0 lg:px-2 `}>
        <div className='flex items-center justify-between text-sm tracking-widest uppercase '>
          <p className='ml-6 '>Productos encontrados:{productos.length}</p>
          <div className='flex items-center'></div>
        </div>

        {productos && productos.length > 0 ? (
          <div className='grid sm:grid-cols-2 gap-2  m-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {/* mi tarjeta de prueba */}
            {productos.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))}

            {/* fin de tarjeta */}
          </div>
        ) : (
          <div className='flex w-full  items-center  ml-5'>
            <div className='w-1/3'>
              <div className='max-w-sm rounded overflow-hidden shadow-lg animate-pulse'>
                <div className='h-48 flex justify-center  bg-gray-300'>
                  <div className='flex space-x-2  animate-pulse'>
                    <div className='w-3 m-auto mx-2 h-3 bg-gray-500 rounded-full'></div>
                    <div className='w-3 m-auto mx-2 h-3 bg-gray-500 rounded-full'></div>
                    <div className='w-3 m-auto mx-2 h-3 bg-gray-500 rounded-full'></div>
                  </div>
                </div>
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
      {productos && productos.length > 0 && <Paginado />}
    </div>
  )
}

export default Productos
