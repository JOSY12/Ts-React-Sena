import { useState } from 'react'

const Comentarios = () => {
  const [estrellas] = useState(2)

  return (
    <div className='w-full flex justify-start items-start flex-col bg-white   p-8'>
      <div className='flex  md:flex-row justify-between w-full'>
        <div className='  flex-row justify-between items-start'>
          <div className='mt-6 flex justify-start items-center flex-row '>
            <div>
              <img
                src='https://i.ibb.co/QcqyrVG/Mask-Group.png'
                alt='girl-avatar'
              />
            </div>
            <div className='flex flex-col justify-start items-start  '>
              <p className='text-base font-medium   text-gray-800  '>
                nombre usuario
              </p>
              <p className='text-sm  text-gray-600  '>fecha de comentario</p>
            </div>
          </div>
          <p className='text-xl md:text-2xl font-medium leading-normal   text-black'>
            titulo de comentario
          </p>
        </div>
        <div className='flex flex-row justify-center text-3xl pt-4'>
          {[...Array(5)].map((_, i) => (
            <label
              key={i}
              className={`  text-gray-400 ${
                i < estrellas ? 'text-yellow-400' : ''
              }`}
            >
              ★
            </label>
          ))}
        </div>
      </div>
      <div id='menu' className='md:block'>
        <p className='mt-3 text-base leading-normal text-black  w-full md:w-9/12 xl:w-5/6'>
          Comentario de producto + calificacion de usuario
        </p>
      </div>
    </div>
  )
}

export default Comentarios
