const Footer = () => {
  return (
    <div>
      <div className='   mx-auto w-full   bottom-0 '>
        <footer className='p-4 bg-white   shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-100'>
          <span className='text-sm text-black sm:text-center '>
            © 2025{' '}
            {/* <a
              href='https://flowbite.com'
              className='hover:underline'
              target='_blank'
            >
              Flowbite™
            </a> */}
            Derechos reservados
          </span>
          <ul className='flex flex-wrap items-center mt-3 sm:mt-0 text-black'>
            <li>
              <a className='mr-4 text-sm text-black hover:underline md:mr-6   '>
                Acerca de
              </a>
            </li>
            <li>
              {/* <a
               
                className='mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400'
              >
                Politicas 
              </a> */}
            </li>
            <li>
              {/* <a className='mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400'>
                Redes
              </a> */}
            </li>
            <li>
              <a className='text-sm text-black  hover:underline  '>Contacto</a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  )
}

export default Footer
