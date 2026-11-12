import ProductImage from '../../shared/ui/ProductImage'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { eliminar_producto } from '../../features/catalogo/api'
import Dialog from '../../shared/ui/Dialog'
import { errorMessage } from '../../shared/api/errors'
import { productoprops } from '../types'

const Producto_administrado = ({
  id,
  nombre,
  precio,
  imagen,
  estado,
  categorias,
  calificacion,
  onDeleted
}: productoprops & { onDeleted?: () => unknown }) => {
  const [confirm, setConfirm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const remove = async () => {
    if (busy) return
    setBusy(true)
    setError(null)
    try {
      await eliminar_producto(id)
      setConfirm(false)
      onDeleted?.()
    } catch (error) {
      setError(errorMessage(error))
    } finally {
      setBusy(false)
    }
  }
  return (
    <tr>
      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
        <div className='flex items-center'>
          <div className='flex-shrink-0 w-10 h-10'>
            <ProductImage className='w-10 h-10  ' src={imagen} alt=''></ProductImage>
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
          <span key={e} className='flex'>
            {e}
          </span>
        ))}
      </td>

      <td className='px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200'>
        <div className='flex   items-end flex-col'>
          <Link to={`/u/v/admin/editor/${id}`}>
            <button className='text-indigo-600 hover:text-indigo-900'>Editar</button>
          </Link>
          <button
            type='button'
            onClick={() => {
              setError(null)
              setConfirm(true)
            }}
            className='text-red-600 hover:text-red-800'
          >
            Eliminar
          </button>
          <Dialog
            open={confirm}
            onClose={() => setConfirm(false)}
            title='Eliminar producto'
          >
            <div className='p-6 text-left whitespace-normal'>
              <h2 className='text-lg font-semibold'>Eliminar producto</h2>
              <p className='my-4'>
                ¿Quieres eliminar «{nombre}»? Esta acción no se puede deshacer.
              </p>
              {error && (
                <p role='alert' className='text-red-700'>
                  {error}
                </p>
              )}
              <div className='flex gap-4 mt-4'>
                <button type='button' disabled={busy} onClick={() => setConfirm(false)}>
                  Cancelar
                </button>
                <button
                  type='button'
                  disabled={busy}
                  onClick={remove}
                  className='rounded bg-red-600 p-2 text-white'
                >
                  Confirmar eliminación
                </button>
              </div>
            </div>
          </Dialog>
        </div>
      </td>
    </tr>
  )
}

export default Producto_administrado
