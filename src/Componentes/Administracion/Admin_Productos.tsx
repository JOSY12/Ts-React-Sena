const Admin_Productos = () => {
  return (
    <div className='mb-10 overflow-y-auto flex flex-col flex-1 overflow-hidden'>
      <div className='header my-3 h-12 px-10 flex items-center justify-between'>
        <h1 className='font-medium text-2xl'>Administracion de productos</h1>
      </div>
      <div className='flex flex-col     mx-3 mt-6 lg:flex-row'>
        <div className='w-full lg:w-1/2 m-1'>
          <form className='rounded-2xl w-full bg-white shadow-md p-6'>
            <div className='flex flex-wrap  -mx-3 mb-6'>
              <div className='w-full  flex lg:flex-col '>
                <div className='rounded-2xl   w-full   md:w-full px-3 mb-6'>
                  <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                    nombre
                  </label>
                  <input
                    className='appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]'
                    type='text'
                    name='name'
                    placeholder='Nombre producto'
                    required
                  />
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
                      required
                      min={1}
                    />
                  </div>
                </div>
              </div>

              <div className='w-full  flex lg:flex-col '>
                <div className='rounded-2xl   w-full   md:w-full px-3 mb-6'>
                  <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                    estado
                  </label>
                  <select
                    required
                    className='w-full border-1 h-12 rounded-lg group  focus:border-[#98c01d] border-black'
                  >
                    <option value='' className='  '>
                      disponible
                    </option>
                  </select>
                </div>
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
                      className='
                   appearance-none   w-full
                    bg-white text-gray-900 
                    font-medium    
                     rounded-lg py-3  leading-tight focus:outline-none  focus:border-[#98c01d]    '
                      type='number'
                      placeholder='120'
                      required
                      min={1}
                    />
                  </div>
                </div>
              </div>

              <div className='w-full md:w-full px-3 mb-6'>
                <label className='block uppercase  tracking-wide text-gray-700 text-sm font-bold mb-2'>
                  Categorias
                </label>
                <select className='w-full border-1 h-10 rounded-2xl group  focus:border-[#98c01d] border-black'>
                  <option selected disabled>
                    Seleciona categorias
                  </option>
                  <option>Computadoras</option>
                </select>
              </div>
              <div className='w-full  md:w-full px-3 mb-6'>
                <label
                  className='block uppercase 
                tracking-wide text-gray-700 text-sm font-bold mb-2'
                >
                  Categorias agregadas
                </label>
                <div className=' grid  grid-cols-2 sm:grid-cols-6 lg:grid-cols-2  xl:grid-cols-3  justify-between     rounded-2xl  '>
                  <div className='bg-gray-300 cursor-pointer text-black hover:bg-red-400 hover:text-white col-span-1 truncate rounded-2xl text-sm text-center   m-1 p-1   sm:w-fit  lg:w-auto '>
                    <button className='mr-1  cursor-pointer '>
                      Computadoras
                    </button>
                  </div>
                </div>
              </div>
              <div className='w-full px-3 mb-6'>
                <label className='block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2'>
                  Descripcion
                </label>
                <textarea
                  className='appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]'
                  name='description'
                  required
                ></textarea>
              </div>

              <div className='w-full md:w-full px-3 mb-6'>
                <button className='appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500'>
                  Agregar producto
                </button>
              </div>

              <div className='w-full px-3 mb-8'>
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
                    className='hidden'
                    name='category_image'
                    accept='image/png, image/jpeg, image/webp'
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className='w-full rounded-2xl lg:w-2/3 m-1 bg-white shadow-lg text-lg border border-gray-200'>
          <div className='overflow-x-auto rounded-lg p-3'>
            <table className='table-auto w-full'>
              <thead className='text-sm font-semibold uppercase text-gray-800 bg-gray-50 mx-auto'>
                <tr>
                  <th></th>
                  <th>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='fill-current w-5 h-5 mx-auto'
                    >
                      <path d='M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zm-4.5 7a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 8.5 11zm.5 5 1.597 1.363L13 13l4 6H7l2-3z'></path>
                    </svg>
                  </th>
                  <th className='p-2'>
                    <div className='text-left font-semibold'>Producto</div>
                  </th>
                  <th className='p-2'>
                    <div className='font-semibold text-left'>Descripcion</div>
                  </th>
                  <th className='p-2'>
                    <div className='font-semibold text-center'>Opciones</div>
                  </th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>
                    <img
                      src='https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400'
                      className='h-8 w-8 mx-auto'
                    />
                  </td>
                  <td>Sample Name</td>
                  <td>Sample Description</td>
                  <td className='p-2'>
                    <div className='flex justify-center'>
                      <a
                        href='#'
                        className='rounded-md hover:bg-green-100 text-green-600 p-2 flex justify-between items-center'
                      >
                        <span>{/* <FaEdit className='w-4 h-4 mr-1' /> */}</span>{' '}
                        Editar
                      </a>
                      <button className='rounded-md hover:bg-red-100 text-red-600 p-2 flex justify-between items-center'>
                        <span>
                          {/* <FaTrash className='w-4 h-4 mr-1' /> */}
                        </span>
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin_Productos
