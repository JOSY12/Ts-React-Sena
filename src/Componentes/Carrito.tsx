import { basedatos } from '../bd'
const Carrito = () => {
  return (
    <>
      <div className='  bg-gray-100 pt-10'>
        <h1 className='mb-10 text-center text-2xl font-bold'>
          Carrito de compras
        </h1>
        <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0'>
          <div className='rounded-lg md:w-2/3'>
            {/* tarjeta de producto */}
            {basedatos.map((e, k) => (
              <div
                key={k}
                className='justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start'
              >
                <img
                  src={e.imagen}
                  alt='product-image'
                  className='w-full rounded-lg sm:w-40'
                />
                <div className='truncate sm:ml-4 sm:flex sm:w-full sm:justify-between'>
                  <div className=' truncate mt-5 sm:mt-0'>
                    <h2 className='  truncate text-lg font-bold text-gray-900'>
                      {e.nombre}
                    </h2>
                    <p className='mt-1 text-xs text-gray-700'>{e.precio}</p>
                  </div>
                  <div className='mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6'>
                    <div className='flex items-center border-gray-100'>
                      <span className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50'>
                        {' '}
                        -{' '}
                      </span>
                      <input
                        className='h-8 w-8 border bg-white text-center text-xs outline-none'
                        type='number'
                        // value={e.cantidad}
                        defaultValue={e.cantidad}
                        min='1'
                        // onChange={undefined}
                      />
                      <span className='cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50'>
                        {' '}
                        +{' '}
                      </span>
                    </div>
                    <div className='flex items-center space-x-4'>
                      <p className='text-sm'>{e.total}</p>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-5 w-5 cursor-pointer duration-150 hover:text-red-500'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'>
            <div className='mb-2 flex justify-between'>
              <p className='text-gray-700'>Subtotal</p>
              <p className='text-gray-700'>$2100</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-gray-700'>envio</p>
              <p className='text-gray-700'>$4.99</p>
            </div>
            <hr className='my-4' />
            <div className='flex justify-between'>
              <p className='text-lg font-bold'>Total</p>
              <div className=''>
                <p className='mb-1 text-lg font-bold'>$2105 USD</p>
                {/* <p className='text-sm text-gray-700'>inscluding VAT</p> */}
              </div>
            </div>
            <button className='mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600'>
              Pagar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Carrito
