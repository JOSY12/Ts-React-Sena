const Producto = () => {
  return (
    <div>
      {/* tarjeta de prueba por eliminar o mejorar */}
      <article className='rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 '>
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
            <span className='text-gray-500 mt-2'>$12</span>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Producto
