import { SignInButton } from '@clerk/clerk-react'

const Login = () => {
  return (
    <>
      <button className='cursor-pointer '>
        <a className='flex  items-center p-2 text-base font-normal text-white  '>
          <svg
            className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 :text-gray-400 group-hover:text-gray-900 :group-hover:text-white'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
              clip-rule='evenodd'
            ></path>
          </svg>
          <span className='flex-1 ml-3 whitespace-nowrap'>
            <SignInButton>Iniciar sesion</SignInButton>
          </span>
        </a>
      </button>
    </>
  )
}

export default Login
