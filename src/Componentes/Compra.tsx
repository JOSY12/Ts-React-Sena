import { Link } from 'react-router-dom'
import { compras_hechas } from './types'
import { useAuth, useClerk } from '@clerk/clerk-react'

export const Compra = ({
  email,
  recibido,
  enviado,
  sesion_id_compra,
  estado,
  fecha_compra,
  momento_compra,
  direccion_compra
}: compras_hechas) => {
  const { user } = useClerk()
  const { isSignedIn } = useAuth()
  return (
    <div className='flex relative group  hover:scale-101 hover:border-green-600 hover:border-1 transition-all  '>
      <div
        className={`   w-full  bg-white shadow p-2 border-t-4 border-green-600 ${
          estado === 'Compra exitosa' ? 'border-green-600' : 'border-red-600'
        } rounded`}
      >
        <Link to={`/u/compras/${sesion_id_compra}`} className='w-full '>
          <button className='absolute  cursor-pointer left-40 m-2 hover:bg-green-100 sm:text-md text-sm bg-white border border-gray-300 px-4 py-2    '>
            Ver compra
          </button>
        </Link>

        <header className='p-2 border-b flex justify-between'>
          <div className='flex flex-col'>
            <h4 className='text-xs font-semibold'>Estado de compra</h4>
            <h1 className='text-lg font-mono text-green-600'>{estado}</h1>
            <span
              className={`text-md ${enviado ? 'text-green-600' : 'text-yellow-600'}`}
            >
              {enviado ? 'Enviado' : 'En proceso de envio'}
              {enviado && recibido ? (
                <span className='text-green-600'> - Recibido y completado</span>
              ) : (
                <span className='text-red-600'> - No recibido</span>
              )}
            </span>
          </div>
        </header>

        <div className='flex   flex-col p-2 w-full gap-4'>
          <div className='flex flex-col w-full overflow-x-auto truncate'>
            <h4 className='text-md'>Direccion entrega</h4>
            <h1 className='text-xs'>{direccion_compra}</h1>
            {user &&
              isSignedIn &&
              typeof user.publicMetadata === 'object' &&
              user.publicMetadata.administrador === true && (
                <div>
                  <h1 className='text-xs'>{recibido}</h1>
                </div>
              )}
          </div>

          {user &&
            isSignedIn &&
            typeof user.publicMetadata === 'object' &&
            user.publicMetadata.administrador === true && (
              <div className='flex flex-col w-full overflow-x-auto truncate'>
                <h4 className='text-md'>Email de comprador</h4>
                <div>
                  {email ? (
                    <a
                      className='text-xs text-blue-500'
                      href={`mailto:${email}?subject=Consulta sobre compra ${sesion_id_compra}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {email}
                    </a>
                  ) : (
                    <span>Sin correo registrado</span>
                  )}
                </div>
              </div>
            )}
          <div className='flex flex-col'>
            <h4 className='text-xs'>Fecha de compra</h4>
            <h1 className='text-md'>{fecha_compra}</h1>
            <h1 className='text-md'>{momento_compra}</h1>
          </div>

          <div className='flex flex-col overflow-x-auto truncate '>
            <h4 className='text-xs'>ID compra</h4>
            <h1 className='text-md font-thin break-all'>{sesion_id_compra}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
