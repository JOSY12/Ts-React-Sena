import { comentarios_producto } from './types'

const Comentarios = ({ comentario }: { comentario: comentarios_producto }) => {
  return (
    <div className='w-full   flex justify-start items-start flex-col bg-white   p-8'>
      <span className='hidden'>{comentario.producto_id}</span>
      <div className='flex  md:flex-row justify-between w-full'>
        <div className='  flex-row justify-between items-start'>
          <div className='   flex justify-start items-center flex-row '>
            <div>
              <img
                className='h-10  mr-3 rounded-2xl w-10'
                src={comentario.foto_perfil}
                alt='girl-avatar'
              />
            </div>
            <div className='flex flex-col justify-start items-start  '>
              <p className='text-base font-medium   text-gray-800  '>
                {comentario.nombre}
              </p>
              <p className='text-sm  text-gray-600  '>
                {comentario.fecha_comentario}
              </p>
            </div>
          </div>
          <p className='text-xl md:text-2xl font-medium leading-normal   text-black'>
            {comentario.titulo}
          </p>
        </div>
        <div className='flex flex-row justify-center text-3xl  '>
          {[...Array(5)].map((_, i) => (
            <label
              key={i}
              className={`  text-gray-400 ${
                i < comentario.calificacion ? 'text-yellow-400' : ''
              }`}
            >
              ★
            </label>
          ))}
        </div>
      </div>
      <div id='menu' className='md:block'>
        <p className='mt-3 text-base leading-normal text-black  w-full md:w-9/12 xl:w-5/6'>
          {comentario.comentario}
        </p>
      </div>
    </div>
  )
}

export default Comentarios
