import { SignUp } from '@clerk/react'

const Registrar = () => {
  return (
    <>
      <div className='auth-page'>
        <div className='auth-content'>
          <p className='eyebrow'>CONECTA CON LO QUE SIGUE</p>
          <h1>Tu próximo nivel empieza aquí.</h1>
          <SignUp />
        </div>
      </div>
    </>
  )
}

export default Registrar
