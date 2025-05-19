// import { basedatos } from '../bd'
import { useEffect, useState } from 'react'
import Producto from './Producto'
import { productoprops } from './types'
import { useLoaderData } from 'react-router-dom'

const Productos = () => {
  const data = useLoaderData()
  const [productos, setproductos] = useState<productoprops[]>([])
  useEffect(() => {
    if (Array.isArray(data) && data.length) {
      setproductos(data)
    } else {
      setproductos([])
    }
  }, [productos.length])

  return (
    <section className='bg-gray-100     '>
      <div className='container  pt-8  mx-auto'>
        <div className='lg:flex '>
          {/* nombres de categorias */}
          <div className='space-y-3  hidden sm:hidden h-screen  border-r-4 lg:py-20   lg:block xl:block text-black lg:w-1/5 lg:px-4 lg:space-y-4'>
            <a href='#' className='block font-medium    hover:underline'>
              Telefonos
            </a>
            <a href='#' className='block font-medium   hover:underline'>
              Computadoras
            </a>
            <a href='#' className='block font-medium    hover:underline'>
              Escritorio
            </a>
            <a href='#' className='block font-medium   hover:underline'>
              Perifericos
            </a>
            <a href='#' className='block font-medium   hover:underline'>
              Sillas
            </a>
            <a href='#' className='block font-medium   hover:underline'>
              herramientas
            </a>
            <a href='#' className='block font-medium   hover:underline'>
              Ofertas
            </a>
          </div>

          {/* fin nombres de categorias */}
          {/* label de filtros */}
          <div className='mt-6 lg:mt-0 lg:px-2 lg:w-4/5 '>
            <div className='lg:hidden grid grid-cols-2 w-auto justify-between xl:hidden     '>
              <label>Selecionar categoria:</label>
              <select
                className='text-end font-bold'
                name='categorias'
                defaultValue={'todos'}
              >
                <option value='computadoras'>Computadoras</option>
                <option value='telefonos'>Telefonos</option>
                <option value='escritorio'>Escritorio</option>
                <option value='perifericos'>Perifericos</option>
                <option value='sillas'>Sillas</option>
                <option value='herramientas'>Herramientas</option>
                <option value='ofertas'>Ofertas</option>
                <option value='nuevos'>Nuevos</option>
                <option value='recomendados'>Recomendados</option>
                <option value='mas-vendidos'>Mas Vendidos</option>
                <option value='mas-vistos'>Mas Vistos</option>
              </select>
            </div>
            <div className='flex items-center   mt-4  '>
              <p className=' '>Ordenar</p>
              <select className=' text-end font-bold   '>
                {/* <option value='#'>ASC</option>
                <option value='#'>Precio</option> */}
              </select>
            </div>

            <div className='flex items-center justify-between text-sm tracking-widest uppercase '>
              <p className=' '>{productos.length}Productos</p>
              <div className='flex items-center'></div>
            </div>
            {productos && productos.length > 0 ? (
              <div className='grid sm:grid-cols-2 gap-2  m-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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
      </div>
    </section>
  )
}

export default Productos
