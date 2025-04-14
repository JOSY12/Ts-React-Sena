const Productos = () => {
  return (
    <div>
      <section className='bg-white h-screen lg:mt-20 xl:mt-20  dark:bg-white'>
        <div className='container px-6 py-8 mx-auto'>
          <div className='lg:flex lg:-mx-2'>
            {/* nombres de categorias */}
            <div className='space-y-3 mt-20 hidden sm:hidden       lg:block xl:block text-black lg:w-1/5 lg:px-2 lg:space-y-4'>
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
                <label>Selecionar categoria</label>
                <select
                  className='text-end'
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

              <div className='flex items-center justify-between text-sm tracking-widest uppercase '>
                <p className=' '>6 Productos</p>
                <div className='flex items-center'>
                  <p className=' '>Ordenar</p>
                  <select className='font-medium text-gray-700 bg-transparent dark: focus:outline-none'>
                    <option value='#'>Recomendado</option>
                    <option value='#'>Precio</option>
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {/* mi tarjeta de prueba */}
                <div className='w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden'>
                  <div
                    className='flex items-end justify-end h-56 w-full bg-cover'
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1590664863685-a99ef05e9f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=345&q=80')"
                    }}
                  >
                    <button className='p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
                      <svg
                        className='h-5 w-5'
                        fill='none'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'></path>
                      </svg>
                    </button>
                  </div>
                  <div className='px-5 py-3'>
                    <h3 className='text-gray-700 uppercase'>woman mix</h3>
                    <span className=' mt-2'>$12</span>
                  </div>
                </div>
                {/* fin de tarjeta */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Productos
