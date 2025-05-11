import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { comentarios_producto, producto } from './types'
import Comentarios from './Comentarios'

import Agregar_comentario from './Agregar_comentario'
const DetallesProducto = () => {
  const data = useLoaderData()

  const [producto, setproducto] = useState<producto | undefined>(undefined)
  const [comentarios, setcomentarios] = useState<
    comentarios_producto[] | undefined
  >([])

  useEffect(() => {
    if (data) {
      setproducto(data.producto[0])
      setcomentarios(data.comentarios)
    } else {
      setproducto(undefined)
      setcomentarios(undefined)
    }
  }, [])

  return (
    <>
      {producto && producto.nombre ? (
        <>
          <div className='      bg-gray-100 flex items-center p-5 lg:p-10 overflow-hidden  '>
            <div className='w-full max-w-6xl rounded bg-white shadow-md p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left'>
              <div className='md:flex items-center -mx-10'>
                <div className='w-full md:w-1/2 px-10 mb-10 md:mb-0 '>
                  <div className='relative '>
                    <img
                      src={
                        Array.isArray(producto.fotos) &&
                        producto?.fotos.length > 0 &&
                        typeof producto.fotos[0] === 'string'
                          ? producto.fotos[0]
                          : 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRuC1CD6ZmBOBzoBpQl5RazYdooleZ2RdTvCEuSYjT3IFxoal60rTsy0-OoqerUBGWXx5p-tHGGw_4ety8vZlTSMfcciaRA3-pX4_QVDpTUCRgt29GfbOnK9w'
                      }
                      className='relative z-10'
                      alt=''
                    ></img>
                    <div className='flex    justify-between'>
                      {Array.isArray(producto.fotos) &&
                      producto.fotos.length > 0 ? (
                        producto.fotos.map((e, k) => (
                          <div key={k} className='       w-30'>
                            <button>
                              {typeof e === 'string' && (
                                <img src={e} alt='' className='h-30 w-30    ' />
                              )}
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
                <div className='w-full   h-100 md:w-1/2 px-10'>
                  <div className='mb-10    '>
                    <div className='mb-5'>
                      <h1 className='font-semibold uppercase break-all s text-lg mb-1'>
                        {producto.nombre}
                      </h1>
                      <span className='  text-sm leading-none align-baseline'>
                        diponibles: {producto?.stock}
                      </span>
                      <p className='text-sm flex  flex-wrap break-all '>
                        {Array.isArray(producto.fotos) &&
                          producto.categorias.length > 0 &&
                          producto.categorias.map((e, k) => (
                            <span key={k} className='m-2 italic '>
                              {e.nombre}
                            </span>
                          ))}
                      </p>
                    </div>
                    <p className='text-sm  break-all '>
                      {producto.descripcion}
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
                        {producto?.precio}
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
          {/* agregar comentario  dividible */}
          <Agregar_comentario />
          {/* fin del agregar comentario */}
          <div className='w-full  p-5 lg:p-10  flex mx-auto items-center justify-center   '>
            <div className='w-full  max-w-6xl   bg-white shadow-md p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left   rounded-lg px-4 pt-2'>
              <div className='flex justify-start items-start'>
                <p className='text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-black  '>
                  Comentarios
                </p>
              </div>
              {/* comentario individual para tarjetas separadas */}
              {comentarios &&
                comentarios.length > 0 &&
                comentarios.map((comentario, k) => (
                  <Comentarios key={k} comentario={comentario} />
                ))}
              {/* fin de comentario unico */}
            </div>
          </div>
        </>
      ) : (
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
