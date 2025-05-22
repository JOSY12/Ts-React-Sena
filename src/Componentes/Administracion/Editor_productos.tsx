import React, { useEffect, useState } from 'react'
import {
  actualizar_producto,
  categorias,
  crear_categoria,
  subircloudinary
} from '../../Services'
import { tcategorias, Foto, producto } from '../types'
import { useForm } from 'react-hook-form'
import { AiFillFileAdd } from 'react-icons/ai'
import { useLoaderData, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const Editor_productos = () => {
  const data = useLoaderData()
  const [fotoslist, setfotoslist] = useState<File[]>([])
  const { id } = useParams()
  const [fotos, setfoto] = useState<Foto[]>([])
  const [listacategorias, setcategorias] = useState<tcategorias[]>([])
  const [categoriasproducto, setcategoriasproducto] = useState<tcategorias[]>(
    []
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm()

  const inputfotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setfotoslist(Array.from(e.target.files))
    }
  }

  const agregarcategoriaproducto = (id: string, nombre: string) => {
    setcategoriasproducto([...categoriasproducto, { id: id, nombre: nombre }])
    setcategorias(listacategorias.filter((e) => e.id !== id))
  }
  const solicitarcategorias = async () => {
    const res = (await categorias()) as tcategorias[]

    const listado = res.filter(
      (cat) => !categoriasproducto.some((prod) => prod.id === cat.id)
    )
    setcategorias(listado)
  }
  const agregar_categoria = async () => {
    await crear_categoria(watch('nuevacategoria'))
    solicitarcategorias()
  }

  const quitarcategoriaproducto = (id: string) => {
    const agregar = categoriasproducto.filter((e) => e.id === id)
    const quitar = categoriasproducto.filter((e) => e.id !== id)

    setcategoriasproducto(quitar)
    setcategorias([
      ...listacategorias,
      { id: agregar[0].id, nombre: agregar[0].nombre }
    ])
  }

  const submit = handleSubmit(async (data) => {
    const nuevoproducto: producto = {
      nombre: data.nombre,
      precio: Number(data.precio),
      stock: Number(data.stock),
      estado: data.estado,
      descripcion: data.descripcion,
      fotos: fotos,
      categorias: categoriasproducto
    }
    console.log(id, nuevoproducto)
    await actualizar_producto(id ? id : '', nuevoproducto)
  })

  const subirfoto = async () => {
    if (fotos.length < 4 && fotoslist.length > 0) {
      const foto = (await subircloudinary({
        archivo: fotoslist[0]
      })) as Foto
      setfoto([...fotos, foto])
    }

    setfotoslist([])
  }

  const borrarfoto = (id: string) => {
    const filtrado = fotos.filter((e) => e.public_id !== id)
    if (filtrado) {
      setfoto(filtrado)
    }
  }
  useEffect(() => {
    subirfoto()
  }, [fotoslist.length])
  useEffect(() => {
    if (data?.length > 0 && data[1]?.producto?.length > 0) {
      const producto = data[1].producto[0]
      reset({
        nombre: producto.nombre,
        precio: producto.precio,
        stock: producto.stock,
        descripcion: producto.descripcion,
        estado: producto.estado
      })
      setfoto(producto.fotos)
      setcategoriasproducto(producto.categorias)
      setcategorias(data[0])
    } else {
      setcategorias([])
      toast.warning('No hay producto/categorías que cargar')
    }
  }, [])
  console.log('test')

  return (
    <div className='mb-10 overflow-y-auto flex flex-col flex-1 overflow-hidden'>
      <div className='header my-3 h-12 px-10 flex items-center justify-between'>
        <h1 className='font-medium text-2xl'>Editor de productos</h1>
      </div>
      {/* <button>SSSSSSSSSSSs</button> */}
      <div className='flex flex-col     mx-3 mt-6 lg:flex-row'>
        <div className='w-full lg:w-1/2 m-1'>
          <form
            onSubmit={submit}
            className='rounded-2xl w-full bg-white shadow-md p-6'
          >
            <div className='flex flex-wrap  border-b-2 border-dotted -mx-3 mb-6'>
              <div className='w-full  flex lg:flex-col '>
                <div className='rounded-2xl   w-full   md:w-full px-3 mb-6'>
                  <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                    nombre
                  </label>

                  <input
                    {...register('nombre', {
                      required: {
                        value: true,
                        message: 'el nombre del producto es requerido'
                      },
                      minLength: {
                        value: 10,
                        message: 'minimo 10 caracteres'
                      },
                      maxLength: {
                        value: 70,
                        message: 'maximo 70 caracteres'
                      }
                    })}
                    className='appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]'
                    type='text'
                    placeholder='Nombre producto'
                  />
                  {errors.nombre?.message &&
                    typeof errors.nombre.message === 'string' && (
                      <span className='text-red-600 font-bold ml-2'>
                        {errors.nombre.message}
                      </span>
                    )}
                </div>
                <div className='rounded-2xl w-full md:w-full px-3 mb-6'>
                  <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                    Precio
                  </label>
                  <div
                    className=' group
                    appearance-none flex  w-full
                     bg-white text-gray-900 
                     font-medium border  
                      rounded-lg  leading-tight focus:outline-none hover:border-[#98c01d]  focus:border-[#98c01d]    '
                  >
                    <span className='w-3 mt-3  group-hover:text-[#98c01d]    ml-1   text-gray-400 font-medium   '>
                      $
                    </span>
                    <input
                      className='
                    appearance-none   w-full
                     bg-white text-gray-900 
                     font-medium    
                      rounded-lg py-3  leading-tight focus:outline-none  focus:border-[#98c01d]    '
                      type='number'
                      placeholder='120'
                      {...register('precio', {
                        required: { value: true, message: 'precio requerido' },
                        min: { value: 10, message: 'minimo $10' },
                        max: { value: 9999, message: 'maximo $9999' }
                      })}
                    />
                  </div>
                  {errors.precio?.message &&
                    typeof errors.precio.message === 'string' && (
                      <span className='text-red-600 font-bold ml-2'>
                        {errors.precio.message}
                      </span>
                    )}
                </div>
              </div>

              <div className='w-full  flex lg:flex-col '>
                <div className='rounded-2xl   w-full   md:w-full px-3 mb-6'>
                  <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                    estado
                  </label>
                  <select
                    {...register('estado')}
                    className='w-full border-1 h-12 rounded-lg group  focus:border-[#98c01d] border-black'
                  >
                    <option>Disponible</option>
                    <option>Agotado</option>
                    <option>Pendiente</option>
                  </select>
                </div>
                {watch('estado') === 'Disponible' && (
                  <div className='rounded-2xl w-full md:w-full px-3 mb-6'>
                    <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                      stock
                    </label>
                    <div
                      className=' group
                    appearance-none flex  w-full
                     bg-white text-gray-900 
                     font-medium border  
                      rounded-lg  leading-tight focus:outline-none hover:border-[#98c01d]  focus:border-[#98c01d]    '
                    >
                      <span className='w-3 mt-3  group-hover:text-[#98c01d]       text-gray-400 font-medium   '></span>
                      <input
                        {...register('stock', {
                          required: {
                            value: true,
                            message: 'stock requerido'
                          },
                          min: {
                            value: 5,
                            message: 'minimo 5 unidades'
                          },
                          max: { value: 1000, message: 'maximo 1000 unidades' }
                        })}
                        className='
                    appearance-none   w-full
                     bg-white text-gray-900 
                     font-medium    
                      rounded-lg py-3  leading-tight focus:outline-none  focus:border-[#98c01d]    '
                        type='number'
                        placeholder='30'
                      />
                    </div>
                    {errors.stock?.message &&
                      typeof errors.stock.message === 'string' && (
                        <span className='text-red-600 font-bold ml-2'>
                          {errors.stock.message}
                        </span>
                      )}
                  </div>
                )}
              </div>

              <div className='w-full md:w-full px-3 mb-6'>
                <div className='flex justify-between'>
                  <label className='block uppercase  tracking-wide text-gray-700 text-sm font-bold mb-2'>
                    Categorias
                  </label>

                  <label
                    htmlFor='my-modal'
                    className=' relative group  cursor-pointer  text-green-700 rounded  '
                  >
                    <AiFillFileAdd className='w-6 h-6' />
                    <span className='absolute opacity-0 group-hover:opacity-100 transition duration-200 bg-white text-black px-2 py-1 rounded shadow -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
                      agregar categoria
                    </span>
                  </label>
                </div>
                {/* modal para agregar categoria */}

                <input
                  type='checkbox'
                  id='my-modal'
                  className='peer hidden'
                ></input>

                <div className='peer-checked:flex hidden fixed inset-0 z-50 items-center justify-center bg-black/50'>
                  <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative'>
                    <label
                      htmlFor='my-modal'
                      className='absolute top-2 right-2 text-gray-500 hover:text-red-500 cursor-pointer text-2xl'
                    ></label>
                    <div className='flex flex-col'>
                      <label className='text-xl font-semibold mb-4'>
                        Nueva categoria de productos
                      </label>
                      <input
                        {...register('nuevacategoria')}
                        className='  border-2 border-green-300'
                        type='text'
                      />
                    </div>
                    <div className='flex justify-evenly'>
                      <label
                        htmlFor='my-modal'
                        className='mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer'
                      >
                        Cerrar
                      </label>
                      <label
                        htmlFor='my-modal'
                        className='mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer'
                      >
                        <button
                          onClick={() => {
                            agregar_categoria()
                          }}
                        >
                          Agregar
                        </button>
                      </label>
                    </div>
                  </div>
                </div>
                {/* fin del modal */}
                <div
                  className={`flex gap-2 border-1 rounded overflow-x-auto    flex-wrap   `}
                >
                  {listacategorias.length > 0 &&
                    categoriasproducto.length < 3 &&
                    listacategorias.map((e, k) => (
                      <button
                        key={k}
                        onClick={() => {
                          agregarcategoriaproducto(e.id, e.nombre)
                        }}
                        className='border-1 border-blue-600 rounded bg-gray-200 text-black '
                      >
                        {e.nombre}
                      </button>
                    ))}
                </div>
              </div>
              <div className='w-full  md:w-full px-3 mb-6'>
                <label
                  className='block uppercase 
                 tracking-wide text-gray-700 text-sm font-bold mb-2'
                >
                  Categorias agregadas
                </label>
                <input
                  type='hidden'
                  {...register('categorias', {
                    validate: () =>
                      categoriasproducto.length > 0 ||
                      'Debes seleccionar al menos una categoría'
                  })}
                />
                {errors.categorias?.message &&
                  typeof errors.categorias.message === 'string' && (
                    <span className='text-red-600 font-bold ml-2'>
                      {errors.categorias.message}
                    </span>
                  )}
                {categoriasproducto.length > 0 && (
                  <div className='flex gap-2 flex-wrap        '>
                    {categoriasproducto.map((e, k) => (
                      <button
                        key={k}
                        onClick={() => {
                          quitarcategoriaproducto(e.id)
                        }}
                        className=' bg-gray-200 rounded cursor-pointer '
                      >
                        {e.nombre}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className='w-full px-3 mb-6'>
                <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                  Descripcion
                </label>
                <textarea
                  {...register('descripcion', {
                    required: {
                      value: true,
                      message: 'la descripcion del producto es requerida'
                    },
                    minLength: {
                      value: 10,
                      message: 'minimo 5 caracteres por descripcion'
                    }
                  })}
                  className='appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]'
                ></textarea>
                {errors.descripcion?.message &&
                  typeof errors.descripcion.message === 'string' && (
                    <span className='text-red-600 font-bold ml-2'>
                      {errors.descripcion.message}
                    </span>
                  )}
              </div>

              <div className='w-full md:w-full px-3 mb-6'>
                <button
                  type='submit'
                  className='appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-green-900 focus:border-gray-500'
                >
                  rectificar/Actualizar
                </button>
              </div>
              {/* <button className='self-center ml-10' onClick={subirfoto}>
                 Previsualizar
               </button> */}
            </div>
            <div className='w-full justify-center items-center text-center px-3  mb-10'>
              <label
                className='mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center'
                htmlFor='dropzone-file'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-10 w-10 text-green-800'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                  />
                </svg>

                <h2 className='mt-4 text-xl font-medium text-gray-700 tracking-wide'>
                  Cargar imagenes("maximo 4 por producto")
                </h2>

                <p className='mt-2 text-gray-500 tracking-wide'>
                  carga o arrastra y suelta tus fotos SVG, PNG, JPG or GIF.
                </p>

                <input
                  id='dropzone-file'
                  type='file'
                  name='category_image'
                  onChange={inputfotos}
                  accept='image/png, image/jpeg, image/webp'
                />
              </label>
              {/* {fotos.length < 1 && (
                <span className='text-red-600  font-bold ml-2'>
                  Se debe subir almenos una foto del producto
                </span>
              )} */}
              {errors.fotos?.message &&
                typeof errors.fotos.message === 'string' && (
                  <span className='text-red-600 font-bold ml-2'>
                    {errors.fotos.message}
                  </span>
                )}
              <input
                type='hidden'
                {...register('fotos', {
                  validate: () =>
                    fotos.length > 0 ||
                    'Debes agregar al menos una foto al producto'
                })}
              />
            </div>
          </form>
        </div>
        <div className='w-full rounded-2xl lg:w-2/3 m-1  bg-white shadow-lg text-lg border border-gray-200'>
          <div
            className={`overflow-x-auto rounded-2xl p-3    overflow-y-auto   `}
          >
            {/* empieza el preview de creacion de productos deberia ser opcional? */}
            <div className='min-w-screen  min-h-screen       bg-gray-100 flex items-center p-5 lg:p-10 overflow-hidden  '>
              <div className='w-full  bg-white   max-w-6xl rounded    shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left'>
                <div className='md:flex items-center -mx-10'>
                  <div className='w-full md:w-1/2 px-10 mb-10 md:mb-0'>
                    <div className='relative'>
                      <img
                        src={
                          fotos.length > 0
                            ? fotos[0].url
                            : 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRuC1CD6ZmBOBzoBpQl5RazYdooleZ2RdTvCEuSYjT3IFxoal60rTsy0-OoqerUBGWXx5p-tHGGw_4ety8vZlTSMfcciaRA3-pX4_QVDpTUCRgt29GfbOnK9w'
                        }
                        className='relative z-10'
                        alt=''
                      ></img>
                      <div className='flex justify-between'>
                        {fotos.length > 0 ? (
                          fotos.map((e, k) => (
                            <div
                              key={k}
                              className='       bg-green-400 h-20  w-30'
                            >
                              <button
                                onClick={() => {
                                  borrarfoto(e.public_id)
                                }}
                              >
                                <img
                                  src={e.url}
                                  alt=''
                                  className='h-30 w-30 absolute  hover:bg-red-600'
                                />
                                <div className='  w-30 h-30 hover:bg-red-500 opacity-60 hover:text-red-500'></div>
                              </button>
                            </div>
                          ))
                        ) : (
                          <img
                            src={
                              'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRuC1CD6ZmBOBzoBpQl5RazYdooleZ2RdTvCEuSYjT3IFxoal60rTsy0-OoqerUBGWXx5p-tHGGw_4ety8vZlTSMfcciaRA3-pX4_QVDpTUCRgt29GfbOnK9w'
                            }
                            className='h-20 w-30'
                            alt=''
                          ></img>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-1/2 px-10'>
                    <div className='mb-10'>
                      <div className='mb-5'>
                        <h1 className='font-semibold uppercase break-all s text-lg mb-1'>
                          {watch('nombre')}
                        </h1>
                        <p className='text-sm flex  flex-wrap break-all '>
                          {watch('categorias')}
                          {categoriasproducto &&
                            categoriasproducto.length > 0 &&
                            categoriasproducto.map((e, k) => (
                              <span key={k} className='m-2 italic '>
                                {e.nombre}
                              </span>
                            ))}
                        </p>
                      </div>
                      <p className='text-sm  break-all '>
                        {watch('descripcion')}
                        {/* <a
                           href='#'
                           className='opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900'
                         >
                           MORE <i className='mdi mdi-arrow-right'></i>
                         </a> */}
                      </p>
                    </div>
                    <div className='justify-between flex'>
                      <div className='inline-block align-bottom mr-5'>
                        <span className='text-2xl leading-none align-baseline'>
                          $
                        </span>
                        <span className='font-bold text-5xl leading-none align-baseline'>
                          {watch('precio')}
                        </span>
                        {/* <span className='text-2xl leading-none align-baseline'>
                           .99
                         </span> */}
                      </div>
                      <div className='inline-block align-bottom'>
                        <button className='bg-green-600 opacity-75 hover:opacity-100 text-white rounded-full px-10 py-2 font-semibold'>
                          <i className='mdi mdi-cart -ml-2 mr-2'></i> Comprar
                          ahora
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* termina el preview de producto en creacion */}
            {/* <div className='flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10'>
               <div>
                 <a
                   title='Buy me a beer'
                   href='https://www.buymeacoffee.com/scottwindon'
                   target='_blank'
                   className='block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12'
                 >
                   <img
                     className='object-cover object-center w-full h-full rounded-full'
                     src='https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg'
                   />
                 </a>
               </div>
             </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor_productos
