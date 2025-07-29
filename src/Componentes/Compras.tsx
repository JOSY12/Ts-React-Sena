import { carrito_store } from '../Zustand/Carrito_store'
import { Compra } from './Compra'

const Compras = () => {
  const compras = carrito_store((state) => state.compras)
  return (
    <>
      <div className='min-w-screen container mx-auto bg-gray-100  p-8 antialiased'>
        <div className='flex items-center justify-between'>
          <p className='focus:outline-none   mx-2 py-4 text-2xl font-semibold   text-gray-800'>
            Historial de compras
          </p>
        </div>
        <div className='flex flex-col  gap-3'>
          {/* compra card */}
          {Array.isArray(compras) &&
            compras.map((compra, k) => (
              <Compra
                key={k}
                direccion_compra={compra.direccion_compra}
                sesion_id_compra={compra.sesion_id_compra}
                estado={compra.estado}
                fecha_compra={compra.fecha_compra}
                momento_compra={compra.momento_compra}
              />
            ))}

          {/* fin compra */}
        </div>
      </div>
    </>
  )
}

export default Compras
