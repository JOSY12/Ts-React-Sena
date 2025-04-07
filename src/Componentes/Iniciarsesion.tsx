import { SignIn } from '@clerk/clerk-react'

const Iniciar_sesion = () => {
  return (
    <>
      <div className='flex justify-center h-screen p-15 '>
        <SignIn></SignIn>
      </div>
    </>
  )
}

export default Iniciar_sesion
