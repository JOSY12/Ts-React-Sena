import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineSearch } from 'react-icons/ai'
import { useSearchParams } from 'react-router-dom'
import { filtros_store } from '../Zustand/Filtros_store'
import {
  parseFilters,
  serializeFilters,
  type ProductFilters
} from '../shared/utils/filters'
import RequestState from '../shared/ui/RequestState'

const Filtros = () => {
  const solicitar_categorias = filtros_store((state) => state.solicitar_categorias)
  const categorias = filtros_store((state) => state.categorias)
  const status = filtros_store((state) => state.status)
  const error = filtros_store((state) => state.error)
  const [params, setParams] = useSearchParams()
  const query = params.toString()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<ProductFilters>({ defaultValues: parseFilters(params) })
  const selected = watch('Categorias') ?? []
  useEffect(() => {
    reset(parseFilters(new URLSearchParams(query)))
  }, [query, reset])
  useEffect(() => {
    void solicitar_categorias()
  }, [solicitar_categorias])
  const submit = handleSubmit((data) =>
    setParams(
      serializeFilters({
        ...data,
        Nombre: data.Nombre.trim(),
        Categorias: data.Categorias || [],
        Pagina: 1
      })
    )
  )
  return (
    <form
      onSubmit={submit}
      className={`space-y-3      justify-end h-screen   p-20 lg:ml-10 lg:py-10   lg:block xl:block text-black lg:px-4 lg:space-y-4`}
    >
      <RequestState status={status} error={error} retry={solicitar_categorias} />
      <p className='  font-bold   mb-2    justify-center'>Categorias</p>
      <div className='flex flex-col space-y-3 ml-2   justify-center'>
        {categorias && categorias.length > 0
          ? categorias.map((e) => (
              <div className='flex items-center space-x-2' key={e.id}>
                <input
                  {...register('Categorias')}
                  id={e.nombre}
                  value={e.nombre}
                  type='checkbox'
                  className='sr-only peer'
                />
                <label
                  className={`  cursor-pointer peer-checked:text-blue-700   `}
                  htmlFor={e.nombre}
                >
                  {e.nombre}
                </label>
                <label
                  htmlFor={e.nombre}
                  className={selected.includes(e.nombre) ? 'opacity-100' : 'opacity-0'}
                >
                  <AiOutlineSearch />
                </label>
              </div>
            ))
          : ''}
      </div>
      <div className='flex flex-col space-y-3    justify-center'>
        <span className=' font-bold      justify-center'>Precio</span>
        <div className=' flex-col sm:flex    ml-2   '>
          <input
            {...register('Minimo', {
              min: {
                value: 10,
                message: 'El precio minimo es 10'
              }
            })}
            aria-label='Precio mínimo'
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
                    Number(min) < Number(max) ||
                    'El precio maximo debe ser mayor que el minimo'
                  )
                }
                return true
              }
            })}
            aria-label='Precio máximo'
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
            aria-label='Buscar producto'
            placeholder='Buscar producto'
            id={'buscador'}
            type='text'
            className='bg-gray-100 py-1 w-full text-black border-1 rounded-md focus:bg-white focus:outline-black '
          />
          <div className=' absolute right-0 -top-2 '>
            <button
              aria-label='Buscar productos'
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
