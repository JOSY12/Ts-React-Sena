import { Link, useLoaderData, useParams } from 'react-router-dom'
import { carrito_store } from '../Zustand/Carrito_store'
import { useEffect } from 'react'

const Detalles_compra = () => {
  const data = useLoaderData()
  const { id } = useParams()
  const detalle_compra = carrito_store((state) => state.detalle_compra)
  const solicitar_detalle_compra = carrito_store(
    (state) => state.solicitar_detalle_compra
  )
  const setear_detalle_compra = carrito_store(
    (state) => state.setear_detalle_compra
  )
  const total = detalle_compra.reduce(
    (acc, item) => acc + (item.precio ?? 0) * item.cantidad,
    0
  )

  useEffect(() => {
    if (data) {
      setear_detalle_compra(data)
    } else {
      solicitar_detalle_compra(id ? id : '')
    }
  }, [data, id, detalle_compra])
  return (
    <div className=' container mx-auto'>
      <div className='w-full flex justify-between items-center mb-3 mt-12 pl-3'>
        <div>
          <h3 className='text-lg font-semibold text-slate-800'>
            Informacion general de la compra
          </h3>
          <p className='text-slate-500'>Productos relacionados a la compra </p>
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
                      <img
                        src={item.imagen ?? ''}
                        alt='Product 1'
                        className='w-30 h-30 object-cover rounded'
                      />
                    </Link>
                  </td>
                  <td className='p-4 border-b border-slate-200 py-5'>
                    <Link to={`/productos/${item.id}`}>
                      <p className='block  text-md text-slate-800'>
                        {item.nombre}
                      </p>
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
    </div>
  )
}

export default Detalles_compra
