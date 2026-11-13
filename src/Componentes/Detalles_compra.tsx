import { Link, useLoaderData, useParams } from 'react-router-dom'
import { carrito_store } from '../Zustand/Carrito_store'
import { useEffect } from 'react'
import RequestState from '../shared/ui/RequestState'
import { AiFillMessage } from 'react-icons/ai'
import ProductImage from '../shared/ui/ProductImage'

const Detalles_compra = () => {
  const data = useLoaderData<import('./types').item_carrito[]>()
  const { id } = useParams()
  const detalle_compra = carrito_store((state) => state.detalle_compra)
  const solicitar_detalle_compra = carrito_store(
    (state) => state.solicitar_detalle_compra
  )
  const enviar_compra = carrito_store((state) => state.enviar_compra)
  const enviar_recibido = carrito_store((state) => state.enviar_recibido)

  const setear_detalle_compra = carrito_store((state) => state.setear_detalle_compra)
  const status = carrito_store((state) => state.detalleStatus)
  const error = carrito_store((state) => state.detalleError)
  const busy = carrito_store((state) => state.busy)
  const total = detalle_compra.reduce(
    (acc, item) => acc + (item.precio ?? 0) * item.cantidad,
    0
  )
  const order = detalle_compra[0]
  useEffect(() => {
    if (data) {
      setear_detalle_compra(data, id ?? '')
    } else {
      solicitar_detalle_compra(id ? id : '')
    }
  }, [data, id, setear_detalle_compra, solicitar_detalle_compra])
  return (
    <div className=' container mx-auto '>
      <RequestState
        status={status}
        error={error}
        empty={!detalle_compra.length}
        emptyText='No hay productos en esta compra.'
        retry={() => id && solicitar_detalle_compra(id)}
      />
      <div className='w-full flex justify-between items-center mb-3 mt-12 pl-3'>
        <div>
          <h3 className='text-lg font-semibold text-slate-800'>
            Informacion general de la compra
          </h3>
          <p className='text-slate-500'>Productos relacionados a la compra </p>
        </div>
        <div className='flex gap-2'>
          {order?.puede_marcar_enviado && !order.enviado && (
            <button
              disabled={busy}
              onClick={() => id && enviar_compra(id)}
              className='bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-colors'
            >
              Marcar como enviado
            </button>
          )}
          {order?.puede_marcar_recibido && order.enviado && !order.recibido && (
            <button
              disabled={busy}
              onClick={() => id && enviar_recibido(id)}
              className='bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-colors'
            >
              Marcar como recibido
            </button>
          )}
          {order?.enviado && (
            <span className='text-green-500 px-4 py-2'>Producto enviado</span>
          )}
          {order?.recibido && (
            <span className='text-green-500 px-4 py-2'>Producto Recibido</span>
          )}
        </div>
      </div>

      <div className='relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border'>
        <table className='w-full text-left table-auto min-w-max'>
          <thead>
            <tr className='border-b border-slate-300 bg-slate-50'>
              <th className='p-4 text-md font-bold    leading-none text-slate-500'>
                Producto
              </th>
              <th className='p-4 text-md font-bold  leading-none text-slate-500'>
                nombre
              </th>
              <th className='p-4 text-md font-bold leading-none text-slate-500'>
                cantidad
              </th>
              <th className='p-4 text-md font-bold leading-none text-slate-500'>
                Precio
              </th>
              <th className='p-4 text-md font-bold  leading-none text-slate-500'>
                Precio total
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(detalle_compra) &&
              detalle_compra.map((item, k) => (
                <tr className='hover:bg-slate-50' key={k}>
                  <td className=' border-b justify-center flex  border-slate-200 py-5'>
                    <Link to={`/productos/${item.id}`}>
                      <ProductImage
                        src={item.imagen ?? ''}
                        alt={item.nombre ?? 'Producto de la compra'}
                        className='w-30 h-30 object-cover rounded'
                      />
                    </Link>
                  </td>
                  <td className='p-4 border-b border-slate-200 py-5'>
                    <Link to={`/productos/${item.id}`}>
                      <p className='block  text-md text-slate-800'>{item.nombre}</p>
                    </Link>
                  </td>
                  <td className='p-4 border-b border-slate-200 py-5'>
                    <p className='text-md text-slate-500'>{item.cantidad}</p>
                  </td>
                  <td className='p-4 border-b border-slate-200 py-5'>
                    <p className='text-md text-slate-500'>{item.precio}</p>
                  </td>
                  <td className='p-4 border-b border-slate-200 py-5'>
                    <p className='text-md text-slate-500'>
                      ${item.cantidad * (item.precio ?? 0)}
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className='p-4 border-t self-center border-slate-200'>
          Total pagado: ${total.toLocaleString()}
        </div>
      </div>
      <div className='flex items-end justify-end fixed bottom-0   rounded-2xl right-0 mb-4 mr-4 z-10'>
        <div className='flex items-end justify-end  fixed bottom-0 right-5 sm:bottom-5   bg-yellow-400 p-4 m-4  rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-300 z-10'>
          <div className='w-10 group relative'>
            <span className='absolute bottom-15  whitespace-nowrap pointer-events-none  -right-6 group-hover:opacity-100 opacity-0 font-bold   text-black rounded-md'>
              Consulta sobre compra
            </span>
            <a
              href={`mailto:josmer1997@hotmail.es ?subject=Consulta sobre compra ${id}`}
              target='_blank'
              rel='noreferrer'
            >
              <AiFillMessage className='size-10 text-black' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detalles_compra
