import { useEffect } from 'react'
import { UserProfile } from '@clerk/clerk-react'
import RequestState from '../shared/ui/RequestState'
import Modal from './Modal'
import Direccion from './Direccion'
import { Direcciones_usuario } from '../Zustand/Direcciones_usuario'

const Perfil = () => {
  const direcciones = Direcciones_usuario((state) => state.misdirecciones)
  const solicitar = Direcciones_usuario((state) => state.solicitar_direcciones)
  const status = Direcciones_usuario((state) => state.status)
  const error = Direcciones_usuario((state) => state.error)
  useEffect(() => {
    void solicitar()
  }, [solicitar])
  return (
    <div className='profile-page page-width'>
      <section className='profile-account' aria-label='Configuración de la cuenta'>
        <UserProfile />
      </section>
      <section className='address-section' aria-labelledby='delivery-heading'>
        <div className='section-heading'>
          <div>
            <p className='eyebrow'>TU CUENTA / TUS DESTINOS</p>
            <h2 id='delivery-heading'>Información de entrega.</h2>
          </div>
          <Modal />
        </div>
        <RequestState status={status} error={error} retry={solicitar} />
        {status === 'success' && !direcciones.length && (
          <div className='address-empty'>
            <p className='eyebrow'>SIGUIENTE PARADA: TU PUERTA.</p>
            <h3>Aún no tienes direcciones guardadas.</h3>
            <p>
              Agrega tu dirección de entrega y elige dónde recibir tu próximo upgrade.
            </p>
          </div>
        )}
        <div className='address-grid'>
          {direcciones.map((direccion) => (
            <Direccion key={direccion.id} {...direccion} />
          ))}
        </div>
      </section>
    </div>
  )
}
export default Perfil
