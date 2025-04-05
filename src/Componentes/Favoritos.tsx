import { basedatos } from '../bd'
const Favoritos = () => {
  return (
    <>
      <div className='mx-auto   container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center text-black'>
        <div className='flex flex-col jusitfy-start items-start'>
          <div>
            {/* <p className='text-sm leading-4   text-black'>Home</p> */}
          </div>
          <div className='mt-3'>
            <h1
              className='text-3xl lg:text-4xl tracking-tight font-semibold 
            leading-8 lg:leading-9 text-black'
            >
              Mis favoritos
            </h1>
          </div>
          <div className='mt-4'>
            <p className='text-2xl tracking-tight leading-6 text-black'>
              {basedatos.length} items
            </p>
          </div>
          <div className='mt-10 lg:mt-12 grid   grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0'>
            {/* tarjeta de producto */}
            {basedatos.map((e, k) => (
              <div key={k} className='flex flex-col    '>
                <div className='  -z-1 relative  '>
                  <img
                    className='   lg:h-100 bg-center bg-cover'
                    src={e.imagen}
                  />

                  <div className='flex  absolute bottom-0 jusitfy-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8'>
                    <div className='w-full'>
                      <button className='cursor-pointer focus:outline-none  focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'>
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                  <button
                    aria-label='close'
                    className='top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute p-1.5 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400'
                  >
                    <svg
                      className='fil-current'
                      width='14'
                      height='14'
                      viewBox='0 0 14 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M13 1L1 13'
                        stroke='currentColor'
                        stroke-width='1.25'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                      <path
                        d='M1 1L13 13'
                        stroke='currentColor'
                        stroke-width='1.25'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  </button>
                </div>
                <div className='mt-6 flex justify-between items-center'>
                  <div className='flex justify-center items-center'>
                    <p className='tracking-tight text-2xl font-semibold leading-6  text-black'>
                      {e.nombre}
                    </p>
                  </div>
                </div>
                {/* <div className='flex flex-col jusitfy-start items-start mt-12'></div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Favoritos
