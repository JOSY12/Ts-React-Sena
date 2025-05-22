import { Link } from 'react-router-dom'
import { productoprops } from '../types'

const Producto_administrado = ({
  id,
  nombre,
  precio,
  imagen,
  estado,
  categorias
}: productoprops) => {
  // []agregar el boton y modal de borrar producto
  //  FIXME cuidado al intenter borrar el producto sin modal podria borrar sin verificiar nada
  return (
    <tr>
      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
        <div className='flex items-center'>
          <div className='flex-shrink-0 w-10 h-10'>
            {/* {id} */}
            <img className='w-10 h-10  ' src={imagen} alt=''></img>
          </div>
          <div className='ml-4'>
            <div className='text-sm font-medium leading-5 text-gray-900'>
              {nombre}
            </div>
            <span>id:{id}</span>
          </div>
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
        {categorias.map((e) => (
          <span className=' flex'>{e}</span>
        ))}
      </td>

      <td className='px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200'>
        <div className='flex   items-end flex-col'>
          <Link to={`/u/v/admin/editor/${id}`}>
            <button className='text-indigo-600 hover:text-indigo-900'>
              Editar
            </button>
          </Link>
          <button className='text-indigo-600 hover:text-indigo-900'>
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  )
}

export default Producto_administrado
