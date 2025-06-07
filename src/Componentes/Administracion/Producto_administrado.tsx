import { Link } from 'react-router-dom'
import { productoprops } from '../types'

const Producto_administrado = ({
  id,
  nombre,
  precio,
  imagen,
  estado,
  categorias,
  calificacion
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
            <div className='text-sm flex font-medium leading-5 text-gray-900'>
              {nombre}
            </div>
            <span className='text-sm text-gray-600'>id:{id}</span>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
        <div className='text-sm  flex leading-5 text-gray-900'>
          <svg
            className='w-5 h-5 text-yellow-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
          </svg>
          {calificacion}
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
