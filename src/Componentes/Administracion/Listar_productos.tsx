import { useEffect, useState } from 'react'
// import { useLoaderData } from 'react-router-dom'
import { TbFilterSearch } from 'react-icons/tb'
import Producto_administrado from './Producto_administrado'
import Filtros from '../Filtros'
import { productos_store } from '../../Zustand/Productos_store'
import Paginado from '../Paginado'
import { filtros_store } from '../../Zustand/Filtros_store'
import { useSearchParams } from 'react-router-dom'

const Listar_productos = () => {
  // const data = useLoaderData()
  const [filtro, setfiltro] = useState(false)
  const productos = productos_store((state) => state.productos_admin)
  const buscar_con_filtros_admin = filtros_store(
    (state) => state.buscar_con_filtros_admin
  )

  const [parametrosUrl] = useSearchParams()
  useEffect(() => {
    const parametros = Object.fromEntries(parametrosUrl.entries())
    buscar_con_filtros_admin({
      Nombre: parametros.Nombre ?? '',
      Maximo: parametros.Maximo ?? '',
      Minimo: parametros.Minimo ?? '',
      Pagina: parametros.Pagina ?? 1,
      Categorias: parametros.Categorias && parametros.Categorias.split(',')
    })
  }, [])
  return (
    <section className='bg-gray-100 w-full  '>
      {/* <button
      onClick={() => {
        test()
      }}
      className=' hidden   bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors'
    >
      agregar muchos productos
    </button> */}
      <div className='  mx-auto  '>
        <div className='lg:flex  '>
          <div
            className={` ${
              filtro ? '  lg:block ' : 'hidden  lg:border-r-4   lg:block'
            } `}
          >
            <Filtros />
          </div>

          <div
            className={`w-full ${filtro ? ' hidden lg:block' : 'lg:block '} `}
          >
            <div className='     px-6 py-8 mx-auto  flex flex-col flex-1  '>
              <div className='flex items-center justify-between text-sm tracking-widest uppercase '>
                <p className='ml-6 '>
                  Productos encontrados:{productos.length}
                </p>
                <div className='flex items-center'></div>
              </div>
              <div className='flex  flex-col  '>
                <div className='py-2 -my-2  overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
                  <div className='inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg'>
                    <table className='min-w-full'>
                      <thead>
                        <tr>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                            Nombre
                          </th>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                            calificacion
                          </th>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                            precio
                          </th>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                            Estado
                          </th>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                            categorias
                          </th>
                          <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                            opciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white'>
                        {/* informacion de usuarios */}
                        {productos.length > 0 ? (
                          productos.map((e, k) => (
                            <Producto_administrado
                              key={k}
                              id={e.id}
                              nombre={e.nombre}
                              precio={e.precio}
                              imagen={e.imagen}
                              estado={e.estado}
                              categorias={e.categorias}
                              calificacion={e.calificacion}
                            />
                          ))
                        ) : (
                          <Producto_administrado
                            key={'test'}
                            id={''}
                            nombre={''}
                            precio={1}
                            imagen={
                              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCJpmc7wNF8Ti2Tuh_hcIRZUGOc23KBTx2A&s'
                            }
                            estado={''}
                            categorias={[]}
                            calificacion={'1'}
                          />
                        )}

                        {/* fin de informacion de usuarios */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <Paginado />
          </div>

          <div className='  lg:hidden  fixed bottom-0 right-0 mb-20 mr-4 z-10'>
            <button
              onClick={() => {
                setfiltro(!filtro)
              }}
              className='flex cursor-pointer   w-16 bg-gray-200 justify-center text-center items-center align-middle h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12'
            >
              <TbFilterSearch size={30} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Listar_productos
