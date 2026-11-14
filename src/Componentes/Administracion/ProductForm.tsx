import ProductImage from '../../shared/ui/ProductImage'
import Dialog from '../../shared/ui/Dialog'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { AiFillFileAdd } from 'react-icons/ai'
import { toast } from 'sonner'
import {
  categorias,
  crear_categoria,
  crear_producto,
  actualizar_producto,
  subircloudinary
} from '../../Services'
import { MAX_PHOTOS } from '../../features/catalogo/images'
import { textRules } from '../../shared/utils/validation'
import type { tcategorias, Foto, producto, ProductFormValues } from '../types'

type Props = {
  mode: 'create' | 'edit'
  initialProduct?: producto
  initialCategories: tcategorias[]
  id?: string
}
const ProductForm = ({ mode, initialProduct, initialCategories, id }: Props) => {
  const [fotos, setfoto] = useState<Foto[]>(initialProduct?.fotos ?? [])
  const [allCategories, setAllCategories] = useState(initialCategories)
  const [categoriasproducto, setcategoriasproducto] = useState<tcategorias[]>(
    initialProduct?.categorias ?? []
  )
  const [uploading, setUploading] = useState(false)
  const [categoryBusy, setCategoryBusy] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const maxStock = mode === 'create' ? 30 : 10000000
  const minStock = mode === 'create' ? 5 : 0
  const listacategorias = allCategories.filter(
    (category) => !categoriasproducto.some((selected) => selected.id === category.id)
  )
  const {
    register,
    handleSubmit,
    getValues,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<ProductFormValues>({
    defaultValues: {
      nombre: initialProduct?.nombre ?? '',
      precio: initialProduct?.precio,
      stock: initialProduct?.stock,
      estado: initialProduct?.estado ?? 'Disponible',
      descripcion: initialProduct?.descripcion ?? '',
      nuevacategoria: ''
    }
  })
  const preview = useWatch({ control })
  const inputfotos = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file || uploading || fotos.length >= MAX_PHOTOS) return
    setUploading(true)
    try {
      const photo = await subircloudinary({ archivo: file })
      setfoto((current) =>
        current.length < MAX_PHOTOS ? [...current, photo] : current
      )
    } catch {
      /* The upload service displays the error; existing photos remain intact. */
    } finally {
      setUploading(false)
    }
  }
  const agregarcategoriaproducto = (id: string, nombre: string) =>
    setcategoriasproducto((current) =>
      current.some((category) => category.id === id) || current.length >= 3
        ? current
        : [...current, { id, nombre }]
    )
  const quitarcategoriaproducto = (id: string) =>
    setcategoriasproducto((current) => current.filter((category) => category.id !== id))
  const borrarfoto = (id: string) =>
    setfoto((current) => current.filter((photo) => photo.public_id !== id))
  const agregar_categoria = async () => {
    if (categoryBusy) return
    const nombre = getValues('nuevacategoria')?.trim()
    if (!nombre) {
      toast.warning('Escribe el nombre de la categoría.')
      return
    }
    if (nombre.length > 100) {
      toast.warning('La categoría admite un máximo de 100 caracteres.')
      return
    }
    setCategoryBusy(true)
    try {
      await crear_categoria(nombre)
      setAllCategories(await categorias())
      setValue('nuevacategoria', '')
      setCategoryOpen(false)
    } catch {
      /* Keep the category name to retry. */
    } finally {
      setCategoryBusy(false)
    }
  }
  const submit = handleSubmit(async (data) => {
    if (uploading) return
    if (!categoriasproducto.length) {
      toast.warning('Selecciona al menos una categoría.')
      return
    }
    if (!fotos.length) {
      toast.warning('Debes agregar al menos una foto al producto.')
      return
    }
    const payload: producto = {
      nombre: data.nombre,
      precio: Number(data.precio),
      stock: Number(data.stock ?? 0),
      estado: data.estado,
      descripcion: data.descripcion,
      fotos,
      categorias: categoriasproducto
    }
    try {
      if (mode === 'edit' && id) await actualizar_producto(id, payload)
      else await crear_producto(payload)
      if (mode === 'create') {
        reset({ nombre: '', estado: 'Disponible', descripcion: '', nuevacategoria: '' })
        setfoto([])
        setcategoriasproducto([])
      }
    } catch {
      /* Keep the complete draft. The service already displays the failure. */
    }
  })
  return (
    <div className='mb-10 overflow-y-auto flex flex-col flex-1 overflow-hidden'>
      <div className='header my-3 h-12 px-10 flex items-center justify-between'>
        <h1 className='font-medium text-2xl'>
          {mode === 'create' ? 'Creacion de productos' : 'Editor de productos'}{' '}
        </h1>
      </div>
      <div
        className={
          mode === 'create'
            ? 'flex flex-col mx-3 mt-6 lg:flex-row'
            : 'flex flex-col mx-3 mt-6'
        }
      >
        <div className={mode === 'create' ? 'w-full lg:w-1/2 m-1' : 'w-full'}>
          <form onSubmit={submit} className='rounded-2xl w-full bg-white shadow-md p-6'>
            <div className='flex flex-wrap  border-b-2 border-dotted -mx-3 mb-6'>
              <div className='w-full  flex lg:flex-col '>
                <div className='rounded-2xl   w-full   md:w-full px-3 mb-6'>
                  <label
                    htmlFor='product-name'
                    className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'
                  >
                    nombre
                  </label>

                  <input
                    id='product-name'
                    {...register('nombre', {
                      setValueAs: (value: string) => value.trim(),
                      required: {
                        value: true,
                        message: 'el nombre del producto es requerido'
                      },
                      minLength: {
                        value: 4,
                        message: 'minimo 4 caracteres'
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
                  <label
                    htmlFor='product-price'
                    className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'
                  >
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
                      id='product-price'
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
                  <label
                    htmlFor='product-state'
                    className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'
                  >
                    estado
                  </label>
                  <select
                    id='product-state'
                    {...register('estado')}
                    className='w-full border-1 h-12 rounded-lg group  focus:border-[#98c01d] border-black'
                  >
                    <option>Disponible</option>
                    <option>Agotado</option>
                    <option>Pendiente</option>
                  </select>
                </div>
                {preview.estado === 'Disponible' && (
                  <div className='rounded-2xl w-full md:w-full px-3 mb-6'>
                    <label
                      htmlFor='product-stock'
                      className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'
                    >
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
                        id='product-stock'
                        {...register('stock', {
                          required: {
                            value: true,
                            message: 'stock requerido'
                          },
                          min: {
                            value: minStock,
                            message: `mínimo ${minStock} unidades`
                          },
                          max: {
                            value: maxStock,
                            message: `maximo ${maxStock} unidades`
                          },
                          validate: (value) =>
                            Number.isInteger(Number(value)) || 'Usa una cantidad entera'
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

                  <button
                    type='button'
                    aria-label='Agregar categoría'
                    onClick={() => setCategoryOpen(true)}
                    className=' relative group  cursor-pointer  text-green-700 rounded  '
                  >
                    <AiFillFileAdd className='w-6 h-6' />
                    <span className='absolute opacity-0 group-hover:opacity-100 transition duration-200 bg-white text-black px-2 py-1 rounded shadow -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
                      agregar categoria
                    </span>
                  </button>
                </div>

                <Dialog
                  open={categoryOpen}
                  onClose={() => setCategoryOpen(false)}
                  title='Nueva categoría'
                >
                  <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative'>
                    <div className='flex flex-col'>
                      <label
                        htmlFor='new-product-category'
                        className='text-xl font-semibold mb-4'
                      >
                        Nueva categoria de productos
                      </label>
                      <input
                        id='new-product-category'
                        {...register('nuevacategoria')}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault()
                            void agregar_categoria()
                          }
                        }}
                        className='  border-2 border-green-300'
                        type='text'
                      />
                    </div>
                    <div className='flex justify-evenly'>
                      <button
                        type='button'
                        onClick={() => setCategoryOpen(false)}
                        className='mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer'
                      >
                        Cerrar
                      </button>
                      <button
                        type='button'
                        disabled={categoryBusy}
                        onClick={agregar_categoria}
                        className='mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer'
                      >
                        <p>Agregar</p>
                      </button>
                    </div>
                  </div>
                </Dialog>

                <div
                  className={`flex gap-2 border-1 rounded overflow-x-auto    flex-wrap   `}
                >
                  {listacategorias.length > 0 &&
                    categoriasproducto.length < 3 &&
                    listacategorias.map((e) => (
                      <button
                        type='button'
                        key={e.id}
                        onClick={() => {
                          agregarcategoriaproducto(e.id, e.nombre)
                        }}
                        className='border-1 cursor-pointer border-blue-600 rounded bg-gray-200 text-black '
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
                {categoriasproducto.length > 0 && (
                  <div className='flex gap-2 flex-wrap        '>
                    {categoriasproducto.map((e) => (
                      <button
                        key={e.id}
                        type='button'
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
                <label
                  htmlFor='product-description'
                  className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'
                >
                  Descripción
                </label>
                <textarea
                  id='product-description'
                  {...register('descripcion', textRules('La descripción', 10000, 10))}
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
                  disabled={isSubmitting || uploading}
                  className='appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-green-900 focus:border-gray-500'
                >
                  {isSubmitting
                    ? 'Guardando...'
                    : mode === 'create'
                      ? 'Agregar producto'
                      : 'Guardar cambios'}
                </button>
              </div>
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
                  Selecciona imágenes PNG, JPG o WebP de hasta 10 MB.
                </p>

                <input
                  id='dropzone-file'
                  disabled={uploading || isSubmitting || fotos.length >= MAX_PHOTOS}
                  type='file'
                  name='category_image'
                  onChange={inputfotos}
                  accept='image/png, image/jpeg, image/webp'
                />
              </label>
              {fotos.length < 1 && (
                <span className='text-red-600  font-bold ml-2'>
                  Se debe subir almenos una foto del producto
                </span>
              )}
            </div>
          </form>
        </div>
        <div className='w-full rounded-2xl lg:w-2/3 m-1  bg-white shadow-lg text-lg border border-gray-200'>
          <div className={`overflow-x-auto rounded-2xl p-3    overflow-y-auto   `}>
            <div className='min-w-screen  min-h-screen        bg-gray-100 flex items-center p-5 lg:p-10 overflow-hidden  '>
              <div className='w-full bg-white  max-w-6xl rounded    shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left'>
                <div className='md:flex items-center -mx-10'>
                  <div className='w-full md:w-1/2 px-10 mb-10 md:mb-0'>
                    <div className='relative z-1'>
                      <ProductImage
                        src={
                          fotos.length > 0
                            ? fotos[0].url
                            : 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRuC1CD6ZmBOBzoBpQl5RazYdooleZ2RdTvCEuSYjT3IFxoal60rTsy0-OoqerUBGWXx5p-tHGGw_4ety8vZlTSMfcciaRA3-pX4_QVDpTUCRgt29GfbOnK9w'
                        }
                        className='relative z-10'
                        alt='Vista previa del producto'
                      ></ProductImage>
                      <div className='flex justify-between'>
                        {fotos.length > 0 ? (
                          fotos.map((e) => (
                            <div key={e.public_id} className='bg-green-400 h-20 w-30'>
                              <button
                                type='button'
                                onClick={() => {
                                  borrarfoto(e.public_id)
                                }}
                              >
                                <ProductImage
                                  src={e.url}
                                  alt='Vista previa del producto'
                                  className='h-30 w-30 absolute  hover:bg-red-600'
                                />
                                <div className='  w-30 h-30 hover:bg-red-500 opacity-60 hover:text-red-500'></div>
                              </button>
                            </div>
                          ))
                        ) : (
                          <ProductImage
                            src={
                              'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRuC1CD6ZmBOBzoBpQl5RazYdooleZ2RdTvCEuSYjT3IFxoal60rTsy0-OoqerUBGWXx5p-tHGGw_4ety8vZlTSMfcciaRA3-pX4_QVDpTUCRgt29GfbOnK9w'
                            }
                            className='h-20 w-30'
                            alt='Vista previa del producto'
                          ></ProductImage>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-1/2 px-10'>
                    <div className='mb-10'>
                      <div className='mb-5'>
                        <h1 className='font-semibold uppercase break-all s text-lg mb-1'>
                          {preview.nombre}
                        </h1>
                        <p className='text-sm flex  flex-wrap break-all '>
                          {categoriasproducto &&
                            categoriasproducto.length > 0 &&
                            categoriasproducto.map((e) => (
                              <span key={e.id} className='m-2 italic '>
                                {e.nombre}
                              </span>
                            ))}
                        </p>
                      </div>
                      <p className='text-sm  break-all '>{preview.descripcion}</p>
                    </div>
                    <div className='justify-between flex'>
                      <div className='inline-block align-bottom mr-5'>
                        <span className='text-2xl leading-none align-baseline'>$</span>
                        <span className='font-bold text-5xl leading-none align-baseline'>
                          {Number(preview.precio).toLocaleString()}
                        </span>
                      </div>
                      <select aria-label='Cantidad de vista previa'>
                        {[
                          ...Array(
                            Math.max(
                              0,
                              Math.min(maxStock, Math.trunc(Number(preview.stock) || 0))
                            )
                          )
                        ].map((_, i) => (
                          <option value={i + 1} key={i}>
                            {i + 1}
                          </option>
                        ))}
                      </select>

                      <div className='inline-block align-bottom'>
                        <button
                          type='button'
                          disabled
                          title='Vista previa'
                          className='bg-green-600 opacity-75 hover:opacity-100 text-white rounded-full px-10 py-2 font-semibold'
                        >
                          <i className='mdi mdi-cart -ml-2 mr-2'></i> Comprar ahora
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductForm
