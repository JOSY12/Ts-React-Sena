import { useEffect, useState } from 'react'
import { useParams, useLoaderData, Link } from 'react-router-dom'
import Comentarios from './Comentarios'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import Agregar_comentario from './Agregar_comentario'
import { BsCartPlus, BsCartCheckFill } from 'react-icons/bs'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { favoritos_store } from '../Zustand/Favoritos_store'
import { carrito_store } from '../Zustand/Carrito_store'
import Cargando from './Cargando'
import { producto_store } from '../Zustand/Producto_store'
// import { Stripe_store } from '../Zustand/Stripe_store'

const DetallesProducto = () => {
  const data = useLoaderData()
  const { id } = useParams()
  const favorito = favoritos_store((state) => state.favorito(id || ''))
  const encarrito = carrito_store((state) => state.encarrito(id || ''))
  const quitar = favoritos_store((state) => state.quitar)
  const agregar = favoritos_store((state) => state.agregar)
  // const pagar = Stripe_store((state) => state.pagar)

  const agregar_carrito = carrito_store((state) => state.agregar)
  const quitar_carrito = carrito_store((state) => state.quitar)
  const solicitar_comentarios = producto_store(
    (state) => state.solicitar_comentarios
  )
  const producto = producto_store((state) => state.producto)
  const comentarios = producto_store((state) => state.comentarios)
  const solicitar_producto = producto_store((state) => state.solicitar_producto)
  const setear_producto = producto_store((state) => state.setear_producto)
  const [fotoactual, setfotoactual] = useState<string>(
    (Array.isArray(producto?.fotos) &&
      typeof producto?.fotos[0] === 'string' &&
      producto?.fotos[0]) ||
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRuC1CD6ZmBOBzoBpQl5RazYdooleZ2RdTvCEuSYjT3IFxoal60rTsy0-OoqerUBGWXx5p-tHGGw_4ety8vZlTSMfcciaRA3-pX4_QVDpTUCRgt29GfbOnK9w'
  )

  const [isLoading, setIsLoading] = useState(true)
  const [cantidad, setcantidad] = useState<number>(1)

  useEffect(() => {
    if (data) {
      setfotoactual(
        (Array.isArray(producto?.fotos) &&
          typeof producto?.fotos[0] === 'string' &&
          producto?.fotos[0]) ||
          ' '
      )
      setIsLoading(false)
      solicitar_comentarios(id ? id : '')
      setear_producto(data.producto[0])
    } else {
      setIsLoading(true)
      solicitar_producto(id ? id : '')
      solicitar_comentarios(id ? id : '')
    }
  }, [data, id, producto])

  if (isLoading) {
    return <Cargando />
  }
  return (
    <>
      {producto ? (
        <>
          <div className='      bg-gray-100 flex items-center p-5 lg:p-10 overflow-hidden  '>
            <div className='w-full max-w-6xl rounded bg-white shadow-md p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left'>
              <SignedIn>
                <div className='justify-end flex   '>
                  <button
                    onClick={() => {
                      favorito ? quitar(id || '') : agregar(id || '')
                    }}
                    className='  group relative pr-6 cursor-pointer      font-medium rounded-lg text-sm      text-center  '
                  >
                    {favorito ? (
                      <AiFillHeart size={25} className='text-red-600' />
                    ) : (
                      <AiOutlineHeart
                        size={25}
                        className='hover:text-red-500'
                      />
                    )}
                    <span className='absolute bottom-10  whitespace-nowrap pointer-events-none  -right-6 group-hover:opacity-100 opacity-0 font-bold   text-black rounded-md'>
                      guardar/remover en favoritos
                    </span>
                  </button>
                  {producto.estado === 'Disponible' && (
                    <button
                      onClick={() => {
                        encarrito
                          ? quitar_carrito(id || '')
                          : agregar_carrito(id || '')
                      }}
                      className='text-black group  cursor-pointer hover:text-green-600    font-medium rounded-lg text-sm     text-center  '
                    >
                      {encarrito ? (
                        <BsCartCheckFill size={25} className='text-green-600' />
                      ) : (
                        <BsCartPlus
                          size={25}
                          className='hover:text-green-500'
                        />
                      )}
                      <span className='absolute top-11  whitespace-nowrap pointer-events-none  -right-6 group-hover:opacity-100 opacity-0 font-bold   text-black rounded-md'>
                        agregar/remover al carrito de compras
                      </span>
                    </button>
                  )}
                </div>
              </SignedIn>

              <div className='md:flex    items-center -mx-10'>
                <div className='w-full  md:w-1/2 px-10   '>
                  <div className='   relative  '>
                    <div className='flex justify-center  '>
                      <img
                        src={fotoactual}
                        className='     bg-gray-100 -z-0'
                        alt=''
                      ></img>
                    </div>
                    <div className='  flex justify-evenly   '>
                      {Array.isArray(producto.fotos) &&
                      producto.fotos.length > 0 ? (
                        producto.fotos.map((e, k) => (
                          <div key={k} className=' justify-center w-30 h-30 '>
                            <div className='flex justify-center bg-white   w-full  '>
                              {typeof e === 'string' && (
                                <img
                                  onClick={() => setfotoactual(e)}
                                  loading='lazy'
                                  src={e}
                                  className=' h-30  hover:scale-125  '
                                ></img>
                              )}
                            </div>
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
                <div className='w-full   h-100 md:w-1/2 px-10'>
                  <div className='mb-10    '>
                    <div className='mb-5'>
                      <h1 className='font-semibold uppercase break-all s text-lg mb-1'>
                        {producto.nombre}
                      </h1>
                      <p className='text-sm flex  flex-wrap break-all '>
                        {Array.isArray(producto.categorias) &&
                          producto.categorias.length > 0 &&
                          producto.categorias.map((e, k) => (
                            <Link to={`/productos?Categorias=${e}`}>
                              <span
                                key={k}
                                className='mr-1 text-blue-500 justify-start italic '
                              >
                                {String(e)}-
                              </span>
                            </Link>
                          ))}
                      </p>
                      <span className='  text-sm leading-none align-baseline'>
                        Unidades diponibles:{' '}
                        {producto.estado === 'Disponible'
                          ? producto?.stock
                          : producto.estado}
                      </span>
                    </div>
                    <p className='text-sm    '>
                      {producto.descripcion}
                      <br />
                    </p>
                  </div>
                  <div className='justify-between flex  '>
                    <div className='inline-block align-bottom mr-5'>
                      <span className='text-2xl  leading-none align-baseline'>
                        $
                      </span>
                      <span className='font-bold  text-3xl sm:text-4xl  leading-none align-baseline'>
                        {(producto?.precio * cantidad).toLocaleString()}
                      </span>
                    </div>
                    <SignedIn>
                      <div className='    justify-end   align-bottom'>
                        {!encarrito ? (
                          <div>
                            {producto.estado == 'Disponible' && (
                              <select
                                className='border-1 rounded-bl-2xl   py-1.5 rounded-tl-2xl '
                                onChange={(e) =>
                                  setcantidad(Number(e.target.value))
                                }
                              >
                                {[...Array(producto.stock)].map((_, i) => (
                                  <option value={i + 1} key={i}>
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                            )}
                            <button
                              onClick={() => {
                                if (producto.estado == 'Disponible') {
                                  agregar_carrito(id ? id : '', cantidad)
                                }
                              }}
                              className={`${
                                producto.estado == 'Disponible'
                                  ? ' bg-green-600  text-white '
                                  : ' bg-gray-600  text-gray-200 '
                              }opacity-75 hover:opacity-100    rounded-tr-2xl rounded-br-2xl   py-2 font-semibold`}
                            >
                              {/* <span className='mdi mdi-cart -ml-2 mr-2'></span>  */}
                              {producto.estado == 'Disponible'
                                ? 'Comprar ahora'
                                : 'No Disponible'}
                            </button>
                          </div>
                        ) : (
                          'Producto en carrito 😀'
                        )}
                      </div>
                    </SignedIn>
                    <SignedOut>
                      <div className='    justify-end   align-bottom'>
                        {!encarrito ? (
                          <div>
                            {producto.estado == 'Disponible' && (
                              <select
                                className='border-1 rounded-bl-2xl   py-1.5 rounded-tl-2xl '
                                onChange={(e) =>
                                  setcantidad(Number(e.target.value))
                                }
                              >
                                {[...Array(producto.stock)].map((_, i) => (
                                  <option value={i + 1} key={i}>
                                    {i + 1}
                                  </option>
                                ))}
                              </select>
                            )}
                            <Link to={'/iniciarsesion'}>
                              <button
                                onClick={() => {}}
                                className={`${
                                  producto.estado == 'Disponible'
                                    ? ' bg-green-600  text-white '
                                    : ' bg-gray-600  text-gray-200 '
                                }opacity-75 hover:opacity-100    rounded-tr-2xl rounded-br-2xl   py-2 font-semibold`}
                              >
                                {/* <span className='mdi mdi-cart -ml-2 mr-2'></span>  */}
                                {producto.estado == 'Disponible'
                                  ? 'Comprar ahora'
                                  : 'No Disponible'}
                              </button>
                            </Link>
                          </div>
                        ) : (
                          'Producto en carrito 😀'
                        )}
                      </div>
                    </SignedOut>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* agregar comentario  dividible */}
          <SignedIn>
            <Agregar_comentario />
          </SignedIn>
          {/* fin del agregar comentario */}
          <div className='w-full  p-5 lg:p-10  flex mx-auto items-center justify-center   '>
            <div className='w-full  max-w-6xl   bg-white shadow-md p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left   rounded-lg px-4 pt-2'>
              <div className='flex justify-start items-start'>
                <p className='text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-black  '>
                  Comentarios
                </p>
              </div>
              {/* comentario individual para tarjetas separadas */}
              {comentarios && comentarios.length > 0 ? (
                comentarios.map((comentario, k) => (
                  <Comentarios
                    key={k}
                    producto_id={comentario.producto_id}
                    foto_perfil={comentario.foto_perfil}
                    nombre={comentario.nombre}
                    fecha_comentario={comentario.fecha_comentario}
                    titulo={comentario.titulo}
                    calificacion={comentario.calificacion}
                    comentario={comentario.comentario}
                  />
                ))
              ) : (
                <div className='flex flex-col items-center justify-center p-8  rounded-lg  '>
                  <svg
                    className='w-16 h-16 mb-4 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                    />
                  </svg>
                  <h2 className='text-xl font-semibold text-gray-700 mb-2'>
                    No hay comentarios
                  </h2>
                  <p className='text-gray-500 text-center'>
                    Este producto aún no tiene comentarios. Sé el primero en
                    dejar uno.
                  </p>
                </div>
              )}
              {/* fin de comentario unico */}
            </div>
          </div>
        </>
      ) : (
        // <Cargando />
        <div className='h-screen w-screen flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-100   shadow-md'>
          <svg
            className='w-12 h-12  text-black'
            stroke='currentColor'
            fill='currentColor'
            stroke-width='0'
            viewBox='0 0 24 24'
            height='200px'
            width='200px'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='File_Off'>
              <g>
                <path d='M4,3.308a.5.5,0,0,0-.7.71l.76.76v14.67a2.5,2.5,0,0,0,2.5,2.5H17.44a2.476,2.476,0,0,0,2.28-1.51l.28.28c.45.45,1.16-.26.7-.71Zm14.92,16.33a1.492,1.492,0,0,1-1.48,1.31H6.56a1.5,1.5,0,0,1-1.5-1.5V5.778Z'></path>
                <path d='M13.38,3.088v2.92a2.5,2.5,0,0,0,2.5,2.5h3.07l-.01,6.7a.5.5,0,0,0,1,0V8.538a2.057,2.057,0,0,0-.75-1.47c-1.3-1.26-2.59-2.53-3.89-3.8a3.924,3.924,0,0,0-1.41-1.13,6.523,6.523,0,0,0-1.71-.06H6.81a.5.5,0,0,0,0,1Zm4.83,4.42H15.88a1.5,1.5,0,0,1-1.5-1.5V3.768Z'></path>
              </g>
            </g>
          </svg>
          <h3 className='text-xl font-medium mt-4 text-black'>
            Producto no encontado
          </h3>
          <p className=' text-black mt-2'>
            no se pudo localizar el producto requerido
          </p>
        </div>
      )}
    </>
  )
}

export default DetallesProducto
