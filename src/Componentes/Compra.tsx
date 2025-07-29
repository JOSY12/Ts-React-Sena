import { Link } from 'react-router-dom'
import { compras_hechas } from './types'
import { carrito_store } from '../Zustand/Carrito_store'

export const Compra = ({
  sesion_id_compra,
  estado,
  fecha_compra,
  momento_compra
}: compras_hechas) => {
  const solicitar_detalle_compra = carrito_store(
    (state) => state.solicitar_detalle_compra
  )
  return (
    <div className='flex relative group cursor-pointer hover:scale-101 hover:border-green-600 hover:border-1 transition-all  '>
      <div
        className={`   w-full  bg-white shadow p-2 border-t-4 border-green-600 ${
          estado === 'Compra exitosa' ? 'border-green-600' : 'border-red-600'
        } rounded`}
      >
        <Link to={`/u/compras/${sesion_id_compra}`} className='w-full'>
          <button
            onClick={() => {
              solicitar_detalle_compra(sesion_id_compra)
            }}
            className='absolute left-40 m-2 hover:bg-green-100 sm:text-md text-sm bg-white border border-gray-300 px-4 py-2    '
          >
            Ver compra
          </button>
        </Link>
        <header className='p-2 border-b flex justify-between'>
          <div className='flex flex-col'>
            <h4 className='text-xs font-semibold'>Estado de compra</h4>
            <h1 className='text-lg font-mono text-green-600'>{estado}</h1>
          </div>
        </header>
        <div className='flex flex-wrap  p-2 w-full gap-4'>
          <div className='flex flex-col w-full'>
            <h4 className='text-xs'>Direccion entrega</h4>
{/*             <h1 className='text-lg'>6-Frais de scolarité 2eme trimestre</h1> */}
          </div>

          <div className='flex flex-col'>
            <h4 className='text-xs'>Fecha de compra</h4>
            <h1 className='text-md'>{fecha_compra}</h1>
            <h1 className='text-md '>{momento_compra}</h1>
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
