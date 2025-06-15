import { useState } from 'react'
import { Usuario } from '../types'
import Modal_recursivo from '../Modal_recursivo'
import { IoWarningOutline } from 'react-icons/io5'

const Usuarios_card_administracion = ({
  id,
  nombre,
  apellido,
  foto_perfil,
  rol,
  administrador,
  baneado
}: Usuario) => {
  const [editando, seteditando] = useState<boolean>(false)
  const [modal, setmodal] = useState<boolean>(false)

  const [cambios, setcambios] = useState({
    estado: baneado ? 'baneado' : 'activo',
    rol: administrador ? 'administrador' : 'comprador'
  })

  return (
    <tr>
      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
        <div className='flex items-center'>
          <div className='flex-shrink-0 w-10 h-10'>
            {id}
            <img
              className='w-10 h-10 rounded-full'
              src={foto_perfil}
              alt=''
            ></img>
          </div>

          <div className='ml-4'>
            <div className='text-sm font-medium leading-5 text-gray-900'>
              {nombre}
            </div>
            <div className='text-sm leading-5 text-gray-500'>{apellido}</div>
          </div>
        </div>
      </td>

      <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
        <div className='text-sm leading-5 text-gray-900'>
          <span>{administrador ? 'administrador' : 'cliente'}</span>
        </div>
      </td>

      <td className='px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200'>
        <span
          className={`inline-flex px-2 text-xs font-semibold leading-5 ${
            baneado ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }  text-green-800 bg-green-100 rounded-full`}
        >
          {baneado ? 'baneado' : 'activo'}
        </span>
        <select
          onChange={(e) => {
            setcambios({
              ...cambios,
              estado: e.target.value
            })
          }}
          disabled={!editando}
          name='estado'
          className={`ml-2 p-1 border ${
            editando ? '' : 'hidden'
          } border-gray-300 rounded-md`}
        >
          <option value='activo'>Activo</option>
          <option value='baneado'>Baneado</option>
        </select>
      </td>

      <td className='px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200'>
        {rol === 'administrador' ? 'administrador' : 'Comprador'}
        <select
          onChange={(e) => {
            setcambios({
              ...cambios,
              rol: e.target.value
            })
          }}
          disabled={!editando}
          name='estado'
          className={`ml-2 p-1 border ${
            editando ? '' : 'hidden'
          } border-gray-300 rounded-md`}
        >
          <option value='comprador'>comprador</option>

          <option value='administrador'>administrador</option>
        </select>
      </td>

      <td className='px-6 py-4 text-sm  font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200'>
        <div className='flex  flex-col   items-end '>
          <button
            onClick={() => seteditando(!editando)}
            className='text-indigo-600 hover:text-indigo-700'
          >
            {editando ? 'Cancelar' : 'Editar'}
          </button>
          {editando && (
            <>
              <button
                // onClick={() => seteditando(!editando)}
                className='text-green-600 hover:text-green-700'
              >
                Guardar cambios
              </button>
              <button
                onClick={() => setmodal(true)}
                className='text-red-600 hover:text-red-700  '
              >
                Eliminar usuario
              </button>
            </>
          )}
        </div>
      </td>

      <td>
        {modal && (
          <Modal_recursivo
            texto='Seguro que quieres borrar el usuario?'
            setmodal={setmodal}
            activo={modal}
            icono={<IoWarningOutline size={50} />}
          />
        )}
      </td>
    </tr>
  )
}

export default Usuarios_card_administracion
