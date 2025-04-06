const Inicio = () => {
  const imageUrlcomputadoras =
    'https://concepto.de/wp-content/uploads/2020/06/Computadora-de-escritorio-scaled-e1724955496406-2048x1041.jpg'
  const telefonos =
    'https://media.es.wired.com/photos/646402de88218b01bf4a1a59/master/pass/Best-Android-Phones-2023-Featured-2023.jpg'
  const consolas =
    'https://hardzone.es/app/uploads-hardzone.es/2023/05/consolas.jpeg'
  return (
    <>
      <div className='bg-white '>
        <main className='my-8'>
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

                  <button className='flex items-center mt-4 px-3 py-2 bg-blue-900 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
                    <span>Ir a comprar</span>
                  </button>
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
                  </div>
                </div>
              </div>
              <div
                className='w-full h-64 mt-8 md:mx-4 rounded-2xl overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2'
                style={{
                  backgroundImage: `url(${consolas})`
                }}
              >
                <div className='  bg-opacity-50 flex items-center     border border-b-4 h-full'>
                  <div className='px-10 max-w-xl h-full py-5  flex flex-col justify-between '>
                    <h2 className='text-2xl text-white  font-semibold'>
                      Consolas y juegos
                    </h2>

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
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-16'>
              <h3 className='text-gray-600 text-2xl font-medium'>
                Mas vendidos
              </h3>
              <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
                <div className='w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden'>
                  <div
                    className='flex items-end justify-end h-56 w-full bg-cover'
                    style={{
                      backgroundImage:
                        "url('https://img.global.news.samsung.com/mx/wp-content/uploads/2019/01/Notebook-9-Pro-3.jpg')"
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
                    <h3 className='text-gray-700 uppercase'>Compuador dell</h3>
                    <span className='text-gray-500 mt-2'>$1999</span>
                  </div>
                </div>
                <div className='w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden'>
                  <div
                    className='flex items-end justify-end h-56 w-full bg-cover'
                    style={{
                      backgroundImage:
                        "url('https://http2.mlstatic.com/D_NQ_NP_932200-MLA54147001786_032023-O.webp')"
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
                    <h3 className='text-gray-700 uppercase'>Control xbox </h3>
                    <span className='text-gray-500 mt-2'>$60</span>
                  </div>
                </div>
                <div className='w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden'>
                  <div
                    className='flex items-end justify-end h-56 w-full bg-cover'
                    style={{
                      backgroundImage:
                        "url('https://acf.geeknetic.es/imgri/imagenes/tutoriales/definiciones/2020/11/Nintendo-Switch-nysm.jpg?f=webp')"
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
                    <h3 className='text-gray-700 uppercase'>
                      Consola switch 2
                    </h3>
                    <span className='text-gray-500 mt-2'>$300</span>
                  </div>
                </div>
                <div className='w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden'>
                  <div
                    className='flex items-end justify-end h-56 w-full bg-cover bg-center'
                    style={{
                      backgroundImage:
                        "url('https://megacomputer.com.co/wp-content/uploads/2024/10/1-29.webp')"
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
                    <h3 className='text-gray-700 uppercase'>
                      Telefono samsung 13
                    </h3>
                    <span className='text-gray-500 mt-2'>$1200</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-16'>
              <h3 className='text-gray-600 text-2xl font-medium'>Novedades</h3>
              <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
                <div className='w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden'>
                  <div
                    className='flex items-end justify-end h-56 w-full bg-cover'
                    style={{
                      backgroundImage:
                        "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfZplKlPW9kETIxL0hAqjzwBi-C31mAyckzg&s')"
                    }}
                  >
                    <button className='p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
                      <svg
                        className='h-5 w-5'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'></path>
                      </svg>
                    </button>
                  </div>
                  <div className='px-5 py-3'>
                    <h3 className='text-gray-700 uppercase'>
                      telefono samsung 12x
                    </h3>
                    <span className='text-gray-500 mt-2'>$800</span>
                  </div>
                </div>
                <div className='w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden'>
                  <div
                    className='flex items-end justify-end h-56 w-full bg-cover bg-center'
                    style={{
                      backgroundImage:
                        "url('https://www.kalley.com.co/medias/7705946478533-001-1400Wx1400H?context=bWFzdGVyfGltYWdlc3w0NzMzNnxpbWFnZS93ZWJwfGFEQTVMMmd4TkM4eE5ETTJOakV5T1RVMU16UXpPQzgzTnpBMU9UUTJORGM0TlRNelh6QXdNVjh4TkRBd1YzZ3hOREF3U0F8OTUwOTg1N2IwNjcxZWZiNzBhZTc1ZmZhNTU0M2JlMDRiMGIyN2VkYzFiY2FiYzA4YzMyZWUyMGZjMzU3YTRkMQ')"
                    }}
                  >
                    <button className='p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500'>
                      <svg
                        className='h-5 w-5'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'></path>
                      </svg>
                    </button>
                  </div>
                  <div className='px-5 py-3'>
                    <h3 className='text-gray-700 uppercase'>Teclado Gamer </h3>
                    <span className='text-gray-500 mt-2'>$60</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
export default Inicio
