import { SignIn } from '@clerk/react'

const Iniciar_sesion = () => {
  return (
    <>
      <div className='auth-page'>
        <div className='auth-content'>
          <p className='eyebrow'>TU ESPACIO / TECHSELLS</p>
          <h1>Qué bueno verte.</h1>
          <SignIn />
        </div>
      </div>
    </>
  )
}

export default Iniciar_sesion
