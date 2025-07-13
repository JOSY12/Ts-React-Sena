import { useForm } from 'react-hook-form'
import { AiFillFolderAdd, AiOutlineClose } from 'react-icons/ai'

const Modal = () => {
  // Aquí puedes manejar la lógica para abrir y cerrar el modal

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({})

  const enviar = handleSubmit((data) => {
    const modalToggle = document.getElementById(
      'modal-toggle'
    ) as HTMLInputElement
    if (modalToggle) modalToggle.checked = false
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    console.log(data)
    reset()
  })
  console.log(errors)

  return (
    <>
      <div className=' ml-auto   '>
        <input type='checkbox' id='modal-toggle' className='hidden peer' />

        <label
          htmlFor='modal-toggle'
          className='cursor-pointer    text-green-600 rounded '
        >
          <AiFillFolderAdd className='size-8 ' />
        </label>

        <form
          onSubmit={enviar}
          className='fixed  inset-0    bg-gray-100 hidden peer-checked:flex items-center justify-center z-50'
        >
          <div className='bg-white     rounded-xl shadow-lg max-w-2xl w-full  relative'>
            <label
              htmlFor='modal-toggle'
              className='cursor-pointer m-3 flex  justify-end  '
            >
              <AiOutlineClose className='size-10  text-black ' />
            </label>
            <div className='flex   '>
              <div className='m-auto '>
                <div>
                  <div className='mt-5 rounded-lg shadow'>
                    <div className='flex'>
                      <div className='flex-1  py-5 pl-5 overflow-hidden'>
                        <svg
                          className='inline align-text-top'
                          height='24px'
                          viewBox='0 0 24 24'
                          width='24px'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='#000000'
                        >
                          <g>
                            <path
                              d='m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z'
                              fill='none'
                              id='svg_1'
                              stroke='null'
                            ></path>
                            <path
                              d='m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z'
                              id='svg_2'
                            ></path>
                            <circle
                              cx='7.04807'
                              cy='6.97256'
                              r='2.5'
                              id='svg_3'
                            ></circle>
                          </g>
                        </svg>
                        <h1 className='inline text-2xl font-semibold leading-none'>
                          Nueva Direccion
                        </h1>
                      </div>
                    </div>
                    <div className='px-5 pb-5 '>
                      <label className='m-2'>Nombre de comprador</label>
                      <input
                        type='text'
                        {...register('Nombre', {
                          required: 'El Nombre es requerido  '
                        })}
                        autoFocus
                        placeholder='ej: Juan Perez'
                        className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                      ></input>
                      {errors.Nombre?.message &&
                        typeof errors.Nombre.message === 'string' && (
                          <span className='text-red-600 font-bold ml-2'>
                            {errors.Nombre.message}
                          </span>
                        )}

                      <div className='mt-2'>
                        <label className='m-2'>Direccion</label>

                        <input
                          type='text'
                          {...register('Direccion', {
                            required: 'la Direccion es requerido   '
                          })}
                          autoFocus
                          placeholder='ejm: Calle 22 # 5-45'
                          className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                        ></input>
                        {errors.Direccion?.message &&
                          typeof errors.Direccion.message === 'string' && (
                            <span className='text-red-600 font-bold ml-2'>
                              {errors.Direccion.message}
                            </span>
                          )}
                      </div>

                      <div className='mt-2'>
                        <label className='m-2'>Telefono de comprador</label>
                        <input
                          type='number'
                          {...register('Telefono', {
                            required: 'el Telefono es requerido   '
                          })}
                          autoFocus
                          placeholder=' ejm: 3001234567'
                          className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                        ></input>
                        {errors.Telefono?.message &&
                          typeof errors.Telefono.message === 'string' && (
                            <span className='text-red-600 font-bold ml-2'>
                              {errors.Telefono.message}
                            </span>
                          )}
                      </div>

                      <div className='flex text-sm'>
                        <div className='flex-grow  pr-2 mt-2'>
                          <label className='m-2'>Codigo Postal </label>
                          <input
                            type='number'
                            {...register('Postal', {
                              required: 'el Telefono es requerido   '
                            })}
                            autoFocus
                            placeholder='ejm: 123456'
                            className=' text-black   w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white   focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                          ></input>
                          {errors.Postal?.message &&
                            typeof errors.Postal.message === 'string' && (
                              <span className='text-red-600 font-bold ml-2'>
                                {errors.Postal.message}
                              </span>
                            )}
                        </div>

                        <div className='flex-grow mt-2'>
                          <label className='m-2'>Ciudad</label>
                          <input
                            type='text'
                            {...register('Ciudad', {
                              required: 'la Ciudad es requerido   '
                            })}
                            autoFocus
                            placeholder='ejm: medellin/antioquia'
                            className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                          ></input>{' '}
                          {errors.Ciudad?.message &&
                            typeof errors.Ciudad.message === 'string' && (
                              <span className='text-red-600 font-bold ml-2'>
                                {errors.Ciudad.message}
                              </span>
                            )}
                        </div>
                      </div>
                      <div className='mt-2'>
                        <label className='m-2'>Detalles de envio</label>
                        <textarea
                          {...register('Detalles', {
                            required: false
                          })}
                          className=' text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                          placeholder='Detalles de la direccion (opcional) ejm: Entregar en la puerta de la casa azul con manchas blancas, llamar al timbre, etc.'
                        ></textarea>
                      </div>

                      <div className='flex items-center pt-3 mt-2'>
                        <label className='flex flex-row items-center cursor-pointer ml-2  text-sm text-gray-900'>
                          <input
                            {...register('Predeterminado', {
                              required: false
                            })}
                            className='   w-4 h-4 mr-2  text-black bg-gray-300 border-none rounded-md focus:ring-transparent'
                            type='checkbox'
                          />
                          <span>Guardar como predeterminado</span>
                        </label>
                      </div>
                    </div>
                    <div className='flex'></div>

                    <div className='flex flex-row-reverse p-3'>
                      <div className='flex-initial pl-3'>
                        <button
                          type='submit'
                          className='flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-900 transition duration-300 transform active:scale-95 ease-in-out'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            height='24px'
                            viewBox='0 0 24 24'
                            width='24px'
                            fill='#FFFFFF'
                          >
                            <path d='M0 0h24v24H0V0z' fill='none'></path>
                            <path
                              d='M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z'
                              opacity='.3'
                            ></path>
                            <path d='M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z'></path>
                          </svg>
                          <span className='pl-2 mx-1'>Guardar direccion</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <label
              htmlFor='modal-toggle'
              className='cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
            >
              Cerrar
            </label> */}
          </div>
        </form>
      </div>
    </>
  )
}

export default Modal
