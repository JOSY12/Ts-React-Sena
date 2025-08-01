import { Link } from 'react-router-dom'
import { productos_store } from '../Zustand/Productos_store'
import Producto_landing from './Producto_landing'
const Landing_page = () => {
  const imageUrlcomputadoras =
    'https://concepto.de/wp-content/uploads/2020/06/Computadora-de-escritorio-scaled-e1724955496406-2048x1041.jpg'
  const telefonos =
    'https://media.es.wired.com/photos/646402de88218b01bf4a1a59/master/pass/Best-Android-Phones-2023-Featured-2023.jpg'
  const consolas =
    'https://tecstore.pe/media/catalog/category/TEC_Banner-Web_Categoria_ACCESORIOS.jpg'
  const lading_page_datos = productos_store((state) => state.lading_page_datos)
  return (
    <>
      <div className='bg-gray-100        '>
        <main className='py-5 '>
          <div className='container mx-auto px-6 '>
            <div
              className={`h-64 rounded-2xl bg-cover bg-center `}
              style={{ backgroundImage: `url(${imageUrlcomputadoras})` }}
            >
              <div className='  bg-opacity-50 flex items-center   h-full  border border-b-4 rounded-2xl '>
                <div className='px-10 max-w-xl h-full py-5  flex flex-col justify-between '>
                  <h2 className='text-2xl text-white  font-semibold'>
                    Computadoras
                  </h2>
                  <Link to={`/productos?Categorias=Computadoras`}>
                    <button className='flex items-center mt-4 px-3 py-2 bg-blue-900 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
                      <span>Ir a comprar</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className='md:flex mt-8 md:-mx-4'>
              <div
                className='w-full h-64 md:mx-4 rounded-2xl overflow-hidden bg-cover bg-center md:w-1/2'
                style={{ backgroundImage: `url(${telefonos})` }}
              >
                <div className='  bg-opacity-50 flex items-center  border border-b-4  h-full'>
                  <div className='px-10  max-w-xl h-full py-5  flex flex-col justify-between '>
                    <h2 className='text-2xl text-white font-semibold'>
                      Telefonos
                    </h2>
                    <Link to={`/productos?Categorias=Telefonos`}>
                      <button className='flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none'>
                        <span>Ir a comprar</span>
                        <svg
                          className='h-5 w-5 mx-2'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className='w-full h-64 mt-8 md:mx-4 rounded-2xl overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2'
                style={{
                  backgroundImage: `url(${consolas})`
                }}
              >
                <div className='   bg-opacity-50 flex items-center     border border-b-4 h-full'>
                  <div className='px-10 max-w-xl h-full py-5  flex flex-col justify-between '>
                    <h2 className='text-2xl text-white  font-semibold'>
                      Accesorios Digitales
                    </h2>
                    <Link to={`/productos?Categorias=Accesorios`}>
                      <button className='flex items-center mt-4 text-white  text-sm uppercase font-medium rounded hover:underline focus:outline-none'>
                        <span>Ir a comprar</span>
                        <svg
                          className='h-5 w-5 mx-2'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Mejor Valorados */}
            <div className='mt-16'>
              {lading_page_datos.Valorados &&
                lading_page_datos.Valorados.length > 0 && (
                  <div>
                    <h3 className='text-gray-600 text-2xl font-medium'>
                      Mejor Valorados
                    </h3>
                    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
                      {lading_page_datos.Valorados.map((producto) => (
                        <Producto_landing
                          key={producto.id}
                          producto={producto}
                        />
                      ))}
                    </div>
                  </div>
                )}
            </div>
            {/* NOVEDADES */}
            <div className='mt-16'>
              {lading_page_datos.Recientes &&
                lading_page_datos.Recientes.length > 0 && (
                  <div>
                    <h3 className='text-gray-600 text-2xl font-medium'>
                      Novedades
                    </h3>
                    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
                      {lading_page_datos.Recientes.map((producto) => (
                        <Producto_landing
                          key={producto.id}
                          producto={producto}
                        />
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
export default Landing_page
