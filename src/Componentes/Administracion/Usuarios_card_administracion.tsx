type Usuario = {
  nombre: string
  apellido: string
  foto_perfil: string
  rol: string
  administrador: boolean
  baneado: boolean
}

const Usuarios_card_administracion = ({
  nombre,
  apellido,
  foto_perfil,
  rol,
  administrador,
  baneado
}: Usuario) => {
  return (
    <tr>
      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
        <div className='flex items-center'>
          <div className='flex-shrink-0 w-10 h-10'>
            <img
              className='w-10 h-10 rounded-full'
              src={foto_perfil}
              alt=''
            ></img>
          </div>

          <div className='ml-4'>
            <div className='text-sm font-medium leading-5 text-gray-900'>
              {nombre}
            </div>
            <div className='text-sm leading-5 text-gray-500'>{apellido}</div>
          </div>
        </div>
      </td>

      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
        <div className='text-sm leading-5 text-gray-900'>
          <span>{administrador ? 'administrador' : 'cliente'}</span>
        </div>
      </td>

      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
        <span
          className={`inline-flex px-2 text-xs font-semibold leading-5 ${
            baneado ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }  text-green-800 bg-green-100 rounded-full`}
        >
          {baneado ? 'baneado' : 'activo'}
        </span>
      </td>

      <td className='px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200'>
        {rol}
      </td>

      <td className='px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200'>
        <a href='#' className='text-indigo-600 hover:text-indigo-900'>
          Editar
        </a>
      </td>
    </tr>
  )
}

export default Usuarios_card_administracion
