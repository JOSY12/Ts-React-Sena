import { useForm } from 'react-hook-form'
import { crear_comentario } from '../Services'
import { toast } from 'sonner'
import { useClerk } from '@clerk/clerk-react'
import { useParams } from 'react-router-dom'
import { comentario } from './types'
import { useState } from 'react'

const Agregar_comentario = () => {
  const { id } = useParams()
  const { user } = useClerk()
  const {
    register,
    handleSubmit,
    formState: { errors }
    // watch
    // reset
  } = useForm()
  const [estrellas, setestrellas] = useState<number>(1)
  const submit = handleSubmit(async (data) => {
    if (id && user?.id) {
      const comentario: comentario = {
        usuario_id: user?.id,
        calificacion: estrellas,
        comentario: data.comentario,
        producto_id: id,
        titulo: data.titulo
      }
      await crear_comentario(comentario)
    } else {
      toast.error('error al intentar crear comentario')
    }
  })

  return (
    <div className='w-full  p-5 lg:p-10  flex mx-auto items-center justify-center   '>
      <form
        onSubmit={submit}
        className='w-full  max-w-6xl   bg-white shadow-md p-10  mx-auto text-gray-800 relative md:text-left   rounded-lg px-4 pt-2'
      >
        <div className='flex flex-wrap -mx-3 mb-6'></div>
        <h2 className='px-4 pt-3 pb-2 text-gray-800 text-lg'>
          Agregar comentario
        </h2>
        <div className='w-full md:w-full px-3 mb-2 mt-2'>
          <input
            {...register('titulo', {
              required: {
                value: true,

                message: 'el titulo es necesario'
              },
              minLength: {
                value: 5,
                message: 'el titulo debe tener minimo 5 caracteres'
              }
            })}
            type='text'
            placeholder='Titulo'
            className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full    font-medium placeholder-gray-300 focus:outline-none focus:bg-white'
          />
          {errors.titulo?.message &&
            typeof errors.titulo.message === 'string' && (
              <span className='text-red-600 font-bold ml-2'>
                {errors.titulo.message}
              </span>
            )}
        </div>
        <div className='w-full md:w-full px-3 mb-2 mt-2'>
          <textarea
            {...register('comentario', {
              required: {
                value: true,
                message: 'el comentario es necesario'
              },
              minLength: {
                value: 5,
                message: 'el comentario debe tener minimo 5 caracteres'
              }
            })}
            className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-300 focus:outline-none focus:bg-white'
            placeholder='ejm:El mejor producto del mundo'
          ></textarea>
          {errors.comentario?.message &&
            typeof errors.comentario.message === 'string' && (
              <span className='text-red-600 font-bold ml-2'>
                {errors.comentario.message}
              </span>
            )}
        </div>
        <div className='w-full  flex items-start md:w-full px-3'>
          <div className='flex items-start w-1/2 text-gray-700  mr-auto'>
            <div className='flex flex-row-reverse justify-center text-3xl'>
              <input
                type='radio'
                id='star5'
                name='rating'
                onClick={() => setestrellas(5)}
                className='peer hidden'
              />
              <label
                htmlFor='star5'
                className='cursor-pointer text-gray-400 peer-checked:text-yellow-400'
              >
                ★
              </label>

              <input
                type='radio'
                id='star4'
                name='rating'
                onClick={() => setestrellas(4)}
                className='peer hidden'
              />
              <label
                htmlFor='star4'
                className='cursor-pointer text-gray-400 peer-checked:text-yellow-400'
              >
                ★
              </label>

              <input
                type='radio'
                id='star3'
                name='rating'
                onClick={() => setestrellas(3)}
                className='peer hidden'
              />
              <label
                htmlFor='star3'
                className='cursor-pointer text-gray-400 peer-checked:text-yellow-400'
              >
                ★
              </label>

              <input
                type='radio'
                id='star2'
                name='rating'
                onClick={() => setestrellas(2)}
                className='peer hidden'
              />
              <label
                htmlFor='star2'
                className='cursor-pointer text-gray-400 peer-checked:text-yellow-400'
              >
                ★
              </label>

              <input
                type='radio'
                id='star1'
                name='rating'
                onClick={() => setestrellas(1)}
                className='peer hidden'
              />
              <label
                htmlFor='star1'
                className='cursor-pointer text-gray-400 peer-checked:text-yellow-400'
              >
                ★
              </label>
            </div>
          </div>
          <div className='-mr-1'>
            <button
              type='submit'
              className='bg-white text-gray-700 font-medium py-1 px-4 border
        border-gray-400 rounded-lg tracking-wide mr-1
        hover:bg-gray-100'
            >
              Enviar comentario
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Agregar_comentario
