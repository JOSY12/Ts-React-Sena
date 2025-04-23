import { Compra } from './Compra'

const Compras = () => {
  return (
    <>
      <div className='min-w-screen container mx-auto bg-gray-100  p-8 antialiased'>
        <div className='flex items-center justify-between'>
          <p className='focus:outline-none  mx-2 py-4 text-2xl font-semibold   text-gray-800'>
            Historial de compras
          </p>
        </div>
        <div>
          {/* compra card */}
          <Compra />
          {/* fin compra */}
        </div>
      </div>
    </>
  )
}

export default Compras
