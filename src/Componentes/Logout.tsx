import { SignOutButton } from '@clerk/clerk-react'

const Logout = () => {
  return (
    <div className='cursor-pointer'>
      <a className='flex  cursor-pointer hover:font-bold items-center p-2 text-base font-normal text-white rounded-lg    hover:bg-red-600'>
        <svg
          className='flex-shrink-0 w-6 h-6 text-white cursor-pointer transition duration-75 rounded-lg    '
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z'
            clipRule='evenodd'
          ></path>
        </svg>
        <span className='flex-1    ml-3 cursor-pointer whitespace-nowrap'>
          <SignOutButton>
            <span className='cursor-pointer'>Cerrar sesion</span>
          </SignOutButton>
        </span>
      </a>
    </div>
  )
}

export default Logout
