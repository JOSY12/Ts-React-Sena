import { useEffect } from 'react'
import RequestState from '../shared/ui/RequestState'
import { carrito_store } from '../Zustand/Carrito_store'
import { Compra } from './Compra'

const Compras = () => {
  const compras = carrito_store((state) => state.compras)
  const load = carrito_store((state) => state.solicitar_compras)
  const status = carrito_store((state) => state.comprasStatus)
  const error = carrito_store((state) => state.comprasError)
  useEffect(() => {
    void load()
  }, [load])
  return (
    <>
      <RequestState
        status={status}
        error={error}
        empty={!compras.length}
        emptyText='Todavía no tienes compras.'
        retry={load}
      />
      <div className='min-w-screen container mx-auto bg-gray-100  p-8 antialiased'>
        <div className='flex items-center justify-between'>
          <p className='focus:outline-none   mx-2 py-4 text-2xl font-semibold   text-gray-800'>
            Historial de compras
          </p>
        </div>
        <div className='flex flex-col  gap-3'>
          {Array.isArray(compras) &&
            compras.map((compra) => (
              <Compra
                key={compra.sesion_id_compra}
                enviado={compra.enviado}
                direccion_compra={compra.direccion_compra}
                sesion_id_compra={compra.sesion_id_compra}
                estado={compra.estado}
                fecha_compra={compra.fecha_compra}
                momento_compra={compra.momento_compra}
                email={compra.email}
                recibido={compra.recibido}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default Compras
