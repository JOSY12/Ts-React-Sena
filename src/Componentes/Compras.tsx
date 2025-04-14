import { basedatos } from '../bd'
const Compras = () => {
  return (
    <>
      <div className='  container     py-6 flex justify-center items-center text-black'>
        <div className='flex flex-col jusitfy-start items-start'>
          <div>
            {/* <p className='text-sm leading-4   text-black'>Inicio</p> */}
          </div>

          <h1
            className='text-3xl lg:text-4xl tracking-tight font-semibold 
            leading-8 lg:leading-9 text-black'
          >
            Historial de compras
          </h1>
        </div>
      </div>

      <div className=' h-screen m-5 border '>
        <div className='w-full flex justify-between items-center mb-3 mt-12 pl-3'>
          <div className='mx-3'>
            <div className='w-full max-w-sm min-w-[200px] relative'></div>
          </div>
        </div>

        <div className='  flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border'>
          <table className='w-full text-left table-auto min-w-max'>
            <thead>
              <tr className='  bg-slate-50'>
                <th className='p-4 text-sm font-normal leading-none text-slate-500'>
                  Producto
                </th>
                <th className='p-4 text-sm font-normal leading-none text-slate-500'>
                  Nombre
                </th>
                <th className='p-4 text-sm font-normal leading-none text-slate-500'>
                  Cantidad
                </th>
                <th className='p-4 text-sm font-normal leading-none text-slate-500'>
                  Precio de item
                </th>
                <th className='p-4 text-sm font-normal leading-none text-slate-500'>
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {basedatos?.map((e, k) => (
                <tr className='hover:bg-slate-50  ' key={k}>
                  <td className='p-4 border-b   py-5'>
                    <img
                      src={e.imagen}
                      alt='Product 1'
                      className='w-16 h-16 object-cover   rounded'
                    />
                  </td>
                  <td className='p-4 border-b border-slate-200 py-5'>
                    <p className='block font-semibold text-sm text-slate-800'>
                      {e.nombre}
                    </p>
                  </td>
                  <td className='p-4 border-b border-slate-200 py-5'>
                    <p className='text-sm text-slate-500'>{e.cantidad}</p>
                  </td>
                  <td className='p-4 border-b border-slate-200 py-5'>
                    <p className='text-sm text-slate-500'>${e.precio}</p>
                  </td>
                  <td className='p-4 border-b border-slate-200 py-5'>
                    <p className='text-sm text-slate-500'>${e.total}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Compras
