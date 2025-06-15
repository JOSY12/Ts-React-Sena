import { modalprops } from './types'

const Modal_recursivo = ({ texto, activo, setmodal, icono }: modalprops) => {
  return (
    <div className='bg-white-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0'>
      <div className='bg-white   px-16 py-14 rounded-md '>
        <span className='flex justify-center text-red-600'>{icono}</span>
        <h1 className='text-xl mb-4 font-bold text-black '>{texto}</h1>
        <div className='flex justify-evenly'>
          <button
            onClick={() => setmodal(!activo)}
            className='bg-red-500 px-4 py-2 rounded-md text-md text-white'
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              setmodal(!activo)
            }}
            className='bg-red-500 px-4 py-2 rounded-md text-md text-white'
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal_recursivo
