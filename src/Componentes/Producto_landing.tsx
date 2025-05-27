import { Link } from 'react-router-dom'
import { productoprops } from './types'

const Producto_landing = ({ producto }: { producto: productoprops }) => {
  return (
    <Link to={`/productos/${producto.id}`}>
      <div className='w-full hover:scale-104 transition max-w-sm mx-auto rounded-md shadow-md overflow-hidden'>
        <div
          className='flex items-end justify-end h-56 w-full bg-cover'
          style={{
            backgroundImage: `url('${producto.imagen}')`
          }}
        ></div>
        <div className='px-5 py-3'>
          <h3 className='text-gray-700 uppercase'>{producto.nombre}</h3>
          <span className='text-gray-500 mt-2'>${producto.precio}</span>
        </div>
      </div>
    </Link>
  )
}

export default Producto_landing
