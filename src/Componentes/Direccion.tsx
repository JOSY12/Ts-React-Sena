import { FiCheck, FiMapPin, FiTrash2 } from 'react-icons/fi'
import { Direcciones_usuario } from '../Zustand/Direcciones_usuario'
import type { direccion } from './types'

const Direccion = ({
  id,
  nombre_comprador,
  ciudad,
  direccion,
  nota,
  codigo_postal,
  telefono,
  predeterminada
}: direccion) => {
  const quitar = Direcciones_usuario((state) => state.quitar)
  const cambiarPredeterminada = Direcciones_usuario(
    (state) => state.cambiar_predeterminado
  )
  const busy = Direcciones_usuario((state) => state.busy)
  return (
    <article
      className='address-card'
      data-default={predeterminada}
      aria-label={`Dirección de ${nombre_comprador}`}
    >
      <header className='address-card-header'>
        <span className='address-icon'>
          <FiMapPin aria-hidden='true' />
        </span>
        <div>
          <p className='eyebrow'>DIRECCIÓN DE ENTREGA</p>
          <h3>{nombre_comprador}</h3>
        </div>
      </header>
      <dl className='address-fields'>
        <div className='address-field-wide'>
          <dt>Dirección</dt>
          <dd>{direccion}</dd>
        </div>
        <div>
          <dt>Ciudad</dt>
          <dd>{ciudad}</dd>
        </div>
        <div>
          <dt>Código postal</dt>
          <dd>{codigo_postal}</dd>
        </div>
        <div>
          <dt>Teléfono de contacto</dt>
          <dd>{telefono}</dd>
        </div>
        {nota && (
          <div className='address-field-wide'>
            <dt>Detalles de entrega</dt>
            <dd>{nota}</dd>
          </div>
        )}
      </dl>
      <footer className='address-card-footer'>
        {predeterminada ? (
          <p className='address-default'>
            <FiCheck aria-hidden='true' />
            <span>Dirección predeterminada de envíos</span>
          </p>
        ) : (
          <button
            type='button'
            className='address-set-default'
            disabled={busy || !id}
            onClick={() => {
              if (id) void cambiarPredeterminada(id)
            }}
          >
            <FiCheck aria-hidden='true' />
            Guardar como predeterminada
          </button>
        )}
        <button
          type='button'
          className='address-remove'
          disabled={busy || !id}
          onClick={() => {
            if (id) void quitar(id)
          }}
        >
          <FiTrash2 aria-hidden='true' />
          Remover dirección
        </button>
      </footer>
    </article>
  )
}
export default Direccion
