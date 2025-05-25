import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { productoprops } from '../types'
import Producto_administrado from './Producto_administrado'

const Listar_productos = () => {
  const data = useLoaderData()
  const [productos, setproductos] = useState<productoprops[]>([])
  useEffect(() => {
    if (Array.isArray(data)) {
      setproductos(data)
    }
  }, [])

  return (
    <div className='  px-6 py-8 mx-auto'>
      <div className='flex flex-col mt-8'>
        <div className='py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
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
  )
  {
    /* fin lista usuarios */
  }
}

export default Listar_productos
