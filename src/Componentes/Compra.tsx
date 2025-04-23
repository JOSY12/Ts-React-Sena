export const Compra = () => {
  return (
    <div className=' bg-yellow-200 mx-auto border-gray-500 border rounded-sm text-gray-700 mb-0.5 '>
      <div className='xl:flex md:flex lg:flex sm:flex grid grid-col-1 items-center p-3 border-l-8 border-yellow-600'>
        <img
          className='bg-cover rounded-2xl h-14 w-14 mr-4'
          src='https://img.global.news.samsung.com/mx/wp-content/uploads/2019/01/Notebook-9-Pro-3.jpg'
          alt='img
              '
        />
        <div className='   grid-cols-2  pl-3 pr-3'>
          {/* <div className=' text-sm leading-5 font-semibold'>
            <span className='text-xs leading-4 font-normal text-gray-500'>
              IDC #
            </span>
            LTC08762304
          </div> */}
          <div className='text-sm leading-5 font-semibold'>
            <span className='text-xs leading-4 font-normal text-gray-500 pr'>
              IDP #
            </span>
            10937
          </div>
          <div className='  text-sm leading-5 font-semibold'>
            JUN 14. 9:30 PM
          </div>
        </div>
        <div className='flex-1 sm:border-l-2  '>
          <div className='ml-3 space-y-1  sm:border-r-2 pr-3'>
            <div className='text-base leading-6 font-normal'>computadora</div>
            {/* <div className='text-sm leading-4 font-normal'>
              <span className='text-xs leading-4 font-normal text-gray-500'>
                Carrier
              </span>
              PAPER TRANSPORT INC.
            </div> */}
            <div className='text-sm leading-4 font-normal'>
              <span className='text-xs leading-4 font-normal text-gray-500'>
                Direccion de entrega:{'--->'}
              </span>
              WestRock Jacksonville - 9469 Eastport Rd, Jacksonville, FL 32218
            </div>
          </div>
        </div>
        <div className=' sm:border-r-2 pr-3'>
          <div>
            <div className='ml-3 my-3 border-gray-200 border-2 bg-gray-300 p-1'>
              <div className='uppercase text-xs leading-4 font-medium'></div>
              <div className='text-center text-sm leading-4 font-semibold text-gray-800'>
                89732
              </div>
            </div>
          </div>
        </div>
        <div className='pr-3'>
          <div className='ml-3 my-5   bg-yellow-600 p-1 '>
            <div className='uppercase  text-xs leading-4 font-semibold text-center text-yellow-100'>
              en camino
            </div>
          </div>
        </div>
        {/* <div>
          <button className='text-gray-100 rounded-sm my-5 ml-2 focus:outline-none bg-gray-500'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </button>
        </div> */}
      </div>
    </div>
  )
}
