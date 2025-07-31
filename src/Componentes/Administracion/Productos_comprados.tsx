import { compras } from '../types'

const Productos_comprados = ({
  id_compra,
  cantidad,
  estado,
  fecha_compra,
  imagen,
  nombre,
  precio,
  usuario
}: compras) => {
  return (
    <tr>
      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
        <div className='flex items-center'>
          <div className='flex-shrink-0 w-10 h-10'>
            {/* {id} */}
            <img className='w-10 h-10  ' src={imagen} alt=''></img>
          </div>
          <div className='ml-4'>
            <div className='text-sm flex font-medium leading-5 text-gray-900'>
              {nombre}
            </div>
            <span className='text-sm text-black'>
              id:
              <span className='text-sm text-gray-600'>{id_compra}</span>
            </span>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
        <div className='text-sm  flex leading-5 text-gray-900'>
          {fecha_compra}
        </div>
      </td>
      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
        <div className='text-sm leading-5 text-gray-900'>
          <span>{precio.toLocaleString()}</span>
        </div>
      </td>

      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
        <span
          className={`inline-flex px-2 text-xs font-semibold leading-5 ${
            estado == 'Agotado' && 'bg-red-100 text-red-800'
          }     ${estado == 'Pendiente' && 'bg-yellow-100 text-yellow-600'}   ${
            estado == 'Disponible' && 'bg-green-100 text-green-600'
          }  text-green-800 bg-green-100 rounded-full`}
        >
          {estado}
        </span>
      </td>
      <td className='px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200'>
        <span className=' flex'>{cantidad}</span>
      </td>

      <td className='px-6 py-4 text-sm font-medium leading-5     whitespace-no-wrap border-b border-gray-200'>
        <div className='flex    flex-col'>
          <div className='flex-shrink-0 w-10 h-10'>{usuario}</div>
        </div>
      </td>
    </tr>
  )
}

export default Productos_comprados
