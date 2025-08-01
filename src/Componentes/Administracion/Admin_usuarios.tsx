import { useEffect, useState } from 'react'
import Usuarios_card_administracion from './Usuarios_card_administracion'
import { administracion, compras_hechas, datos, Usuario } from '../types'
import { todos_usuarios } from '../../Services'
import { AiOutlineReload } from 'react-icons/ai'
import { useLoaderData } from 'react-router-dom'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { Compra } from '../Compra'

const Admin_usuarios = () => {
  const data = useLoaderData<administracion>()
  const [usuarios, setusuarios] = useState<Usuario[]>([])
  const [datos, setdatos] = useState<datos>()
  const [compras, setcompras] = useState<compras_hechas[]>([])

  const Recargar = async () => {
    const res: any = await todos_usuarios()
    if (res && res.usuarios.length) {
      setusuarios(res.usuarios)
      setdatos(Array.isArray(res.datos) ? res.datos[0] : res.datos)
    }
  }
  useEffect(() => {
    const datos = async () => {
      const res: administracion = await todos_usuarios()
      if (res && Array.isArray(res.usuarios)) {
        setusuarios(res.usuarios)
        setdatos(Array.isArray(res.datos) ? res.datos[0] : res.datos)
        setcompras(Array.isArray(res.compras) ? res.compras : [])
      } else {
        return
      }
    }

    if (data && Array.isArray(data.datos)) {
      setusuarios(data.usuarios)
      setdatos(data.datos[0])
      setcompras(data.compras)
    } else {
      datos()
    }
  }, [])
  return (
    <div className=' mb-10 flex flex-col flex-1 overflow-hidden'>
      <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100'>
        <div className='container px-6 py-8 mx-auto'>
          <div className='flex justify-between'>
            <h3 className='text-3xl font-medium text-gray-700'>
              Administracion
            </h3>
            <button
              onClick={Recargar}
              className='tex-md cursor-pointer flex items-center    text-black'
            >
              <AiOutlineReload className='mr-2' />
              Recargar datos
            </button>
          </div>
          {/* informacion general */}
          <div className='mt-4'>
            <div className='flex flex-wrap mx-6'>
              <div className='w-full px-6 sm:w-1/2 xl:w-1/3'>
                <div className='flex  items-center px-5 py-6 bg-white rounded-md shadow-sm'>
                  <div className='p-3 bg-indigo-600 bg-opacity-75 rounded-full'>
                    <svg
                      className='w-8 h-8 text-white'
                      viewBox='0 0 28 30'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z'
                        fill='currentColor'
                      ></path>
                      <path
                        d='M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z'
                        fill='currentColor'
                      ></path>
                      <path
                        d='M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z'
                        fill='currentColor'
                      ></path>
                      <path
                        d='M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z'
                        fill='currentColor'
                      ></path>
                      <path
                        d='M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z'
                        fill='currentColor'
                      ></path>
                      <path
                        d='M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z'
                        fill='currentColor'
                      ></path>
                    </svg>
                  </div>

                  <div className='mx-5'>
                    <h4 className='text-2xl font-semibold text-gray-700'>
                      {datos ? datos.usuarios : 0}
                    </h4>
                    <div className='text-gray-500'>Usuarios</div>
                  </div>
                </div>
              </div>

              <div className='w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0'>
                <div className='flex items-center px-5 py-6 bg-white rounded-md shadow-sm'>
                  <div className='p-3 bg-orange-600 bg-opacity-75 rounded-full'>
                    <svg
                      className='w-8 h-8 text-white'
                      viewBox='0 0 28 28'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z'
                        fill='currentColor'
                      ></path>
                      <path
                        d='M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z'
                        fill='currentColor'
                      ></path>
                      <path
                        d='M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z'
                        fill='currentColor'
                      ></path>
                    </svg>
                  </div>

                  <div className='mx-5'>
                    <h4 className='text-2xl font-semibold text-gray-700'>
                      {datos ? datos.ordenes : 0}
                    </h4>
                    <div className='text-gray-500'>Ordenes</div>
                  </div>
                </div>
              </div>

              <div className='w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0'>
                <div className='flex items-center px-5 py-6 bg-white rounded-md shadow-sm'>
                  <div className='p-3 bg-pink-600 bg-opacity-75 rounded-full'>
                    <svg
                      className='w-8 h-8 text-white'
                      viewBox='0 0 28 28'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z'
                        fill='currentColor'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinejoin='round'
                      ></path>
                      <path
                        d='M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z'
                        stroke='currentColor'
                        strokeWidth='2'
                      ></path>
                    </svg>
                  </div>

                  <div className='mx-5'>
                    <h4 className='text-2xl font-semibold text-gray-700'>
                      {datos ? datos.productos : 0}
                    </h4>
                    <div className='text-gray-500'>Productos Totales</div>
                  </div>
                </div>
              </div>

              <div className='w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-2'>
                <div className='flex items-center px-5 py-6 bg-white rounded-md shadow-sm'>
                  <div className=' bg-green-600 bg-opacity-75 rounded-full'>
                    <AiOutlineDollarCircle color='white' size={55} />
                  </div>
                  <div className='mx-5'>
                    <h4 className='text-2xl font-semibold text-gray-700'>
                      ${datos ? datos.dinero_ganado : 0}
                    </h4>
                    <div className='text-gray-500'>Ganancias</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* fin de informacion general */}
          <div className='mt-8'></div>
          <div className='mt-'>Usuarios Registrados</div>

          {/* listado de usuarios */}
          <div className='flex flex-col mt-5'>
            <div className='py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
              <div className='inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg'>
                <table className='min-w-full'>
                  <thead>
                    <tr>
                      <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                        Nombre
                      </th>
                      <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                        Titulo
                      </th>
                      <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                        Estado
                      </th>
                      <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                        Rol
                      </th>
                      <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-500 uppercase border-b border-gray-200 bg-gray-50'>
                        opciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white'>
                    {/* informacion de usuarios */}
                    {usuarios.length > 0 ? (
                      usuarios.map((e, k) => (
                        <Usuarios_card_administracion
                          key={k}
                          id={e.id}
                          nombre={e.nombre}
                          email={e.email}
                          apellido={e.apellido}
                          foto_perfil={e.foto_perfil}
                          rol={e.rol}
                          administrador={e.administrador}
                          baneado={e.baneado}
                        />
                      ))
                    ) : (
                      <Usuarios_card_administracion
                        id={''}
                        nombre={''}
                        email={''}
                        apellido={''}
                        foto_perfil={
                          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCJpmc7wNF8Ti2Tuh_hcIRZUGOc23KBTx2A&s'
                        }
                        rol={''}
                        administrador={false}
                        baneado={false}
                      />
                    )}

                    {/* fin de informacion de usuarios */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* fin lista usuarios */}

          <div className='mt-8'></div>
          <div className='mb-8'>Productos vendidos</div>

          {/* listado de compras */}
          <div className='overflow-y-auto'>
            <div className='flex items-center justify-between'></div>
            <div className='flex flex-col  gap-3'>
              {/* compra card */}
              {Array.isArray(compras) &&
                compras.map((compra, k) => (
                  <Compra
                    key={k}
                    recibido={compra.recibido}
                    email={compra.email}
                    enviado={compra.enviado}
                    direccion_compra={compra.direccion_compra}
                    sesion_id_compra={compra.sesion_id_compra}
                    estado={compra.estado}
                    fecha_compra={compra.fecha_compra}
                    momento_compra={compra.momento_compra}
                  />
                ))}

              {/* fin compra */}
            </div>
          </div>

          {/* fin lista compras */}
        </div>
      </main>
    </div>
  )
}

export default Admin_usuarios
