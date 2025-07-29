// import { basedatos } from '../bd'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineSearch } from 'react-icons/ai'
import { useSearchParams } from 'react-router-dom'
import { filtros_store } from '../Zustand/Filtros_store'

const Filtros = () => {
  const solicitar_categorias = filtros_store(
    (state) => state.solicitar_categorias
  )
  const [admin] = useState({
    admin: window.location.pathname.includes('admin') ? true : false
  })
  const buscar_con_filtros = filtros_store((state) => state.buscar_con_filtros)
  const buscar_con_filtros_admin = filtros_store(
    (state) => state.buscar_con_filtros_admin
  )
  const quitar = filtros_store((state) => state.quitar_check)
  const agregar = filtros_store((state) => state.agregar_check)
  const check_categoria = filtros_store((state) => state.check_categoria)

  const filtros = filtros_store((state) => state.filtros)
  const [parametrosUrl, setSearchParams] = useSearchParams()
  const categorias = filtros_store((state) => state.categorias)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const submit = handleSubmit(async (data) => {
    const nuevosParametros = new URLSearchParams(parametrosUrl)
    data.Categorias && data.Categorias.length > 0
      ? nuevosParametros.set('Categorias', data.Categorias)
      : nuevosParametros.delete('Categorias')
    data.Minimo
      ? nuevosParametros.set('Minimo', data.Minimo)
      : nuevosParametros.delete('Minimo')
    data.Maximo
      ? nuevosParametros.set('Maximo', data.Maximo)
      : nuevosParametros.delete('Maximo')
    data.Nombre
      ? nuevosParametros.set('Nombre', data.Nombre.trim())
      : nuevosParametros.delete('Nombre')

    nuevosParametros.set('Pagina', '1')

    setSearchParams(nuevosParametros)
    if (admin.admin) {
      buscar_con_filtros_admin({
        Categorias: filtros.Categorias ? filtros.Categorias : data.Categorias,
        Nombre: data.Nombre.trim().toLowerCase(),
        Minimo: data.Minimo,
        Maximo: data.Maximo
      })
    } else {
      buscar_con_filtros({
        Categorias: filtros.Categorias ? filtros.Categorias : data.Categorias,
        Nombre: data.Nombre.trim().toLowerCase(),
        Minimo: data.Minimo,
        Maximo: data.Maximo
      })
    }
  })

  useEffect(() => {
    solicitar_categorias()
  }, [])

  return (
    <form
      onSubmit={submit}
      className={`space-y-3      justify-end h-screen   p-20 lg:ml-10 lg:py-10   lg:block xl:block text-black lg:px-4 lg:space-y-4`}
    >
      <p className='  font-bold   mb-2    justify-center'>Categorias</p>
      <div className='flex flex-col space-y-3 ml-2   justify-center'>
        {categorias && categorias.length > 0
          ? categorias.map((e, k) => (
              <div className='flex items-center space-x-2' key={k}>
                <input
                  {...register('Categorias')}
                  id={e.nombre}
                  onClick={() => {
                    if (check_categoria(e.nombre)) {
                      quitar(e.nombre)
                    } else {
                      agregar(e.nombre)
                    }
                  }}
                  checked={filtros.Categorias.includes(e.nombre)}
                  value={e.nombre}
                  type='checkbox'
                  className=' hidden peer    '
                />
                <label
                  className={`  cursor-pointer peer-checked:text-blue-700   `}
                  htmlFor={e.nombre}
                >
                  {e.nombre}
                </label>
                <label
                  htmlFor={e.nombre}
                  className={`peer-checked:opacity-100 opacity-0   cursor-pointer`}
                >
                  <AiOutlineSearch />
                </label>
              </div>
            ))
          : ''}
      </div>
      <div className='flex flex-col space-y-3    justify-center'>
        <span className=' font-bold      justify-center'>Buscar</span>
        <div className=' flex-col sm:flex    ml-2   '>
          <input
            {...register('Minimo', {
              min: {
                value: 10,
                message: 'El precio minimo es 10'
              }
            })}
            placeholder='Minimo'
            type='number'
            className='bg-gray-100   w-full  text-black border-1 rounded-md focus:bg-white focus:outline-black'
          />
          <span>-</span>
          <input
            {...register('Maximo', {
              max: {
                value: 9999,
                message: 'El precio maximo es 9999'
              },
              validate: () => {
                const min = watch('Minimo')
                const max = watch('Maximo')
                if (min && max) {
                  return (
                    parseInt(min) < parseInt(max) ||
                    'El precio maximo debe ser mayor que el minimo'
                  )
                }
                return true
              }
            })}
            placeholder='Maximo'
            type='number'
            className='bg-gray-100    w-full     text-black border-1 rounded-md focus:bg-white focus:outline-black'
          />
        </div>
        {errors.Minimo?.message && (
          <span className='text-red-500   text-sm'>
            {errors.Minimo.message &&
              typeof errors.Minimo.message === 'string' &&
              errors.Minimo.message}
          </span>
        )}
        {errors.Maximo?.message && (
          <span className='text-red-500    text-sm'>
            {errors.Maximo.message &&
              typeof errors.Maximo.message === 'string' &&
              errors.Maximo.message}
          </span>
        )}
      </div>
      <div className='flex flex-col space-y-3    justify-center'>
        <span className=' font-bold      justify-center'>Buscar</span>
        <div className='relative   ml-2   '>
          <input
            {...register('Nombre', {})}
            placeholder='Buscar producto'
            id={'buscador'}
            type='text'
            className='bg-gray-100 py-1 w-full text-black border-1 rounded-md focus:bg-white focus:outline-black '
          />
          <div className=' absolute right-0 -top-2 '>
            <button
              type='submit'
              className='  cursor-pointer p-1 mt-2 border-2  rounded-md'
            >
              <AiOutlineSearch size={21} />
            </button>
          </div>
        </div>
      </div>
      {errors.Nombre?.message && (
        <span className='text-red-500    text-sm'>
          {errors.Nombre.message &&
            typeof errors.Nombre.message === 'string' &&
            errors.Nombre.message}
        </span>
      )}
    </form>
  )
}

export default Filtros
