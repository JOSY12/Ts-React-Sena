import { NavLink } from 'react-router-dom'
import { IoStatsChart } from 'react-icons/io5'
import { FaEdit } from 'react-icons/fa'
import { FaListUl } from 'react-icons/fa6'

const items = [
  { path: '/u/v/admin/usuarios', label: 'Usuarios y compras', Icon: IoStatsChart },
  { path: '/u/v/admin/productos', label: 'Crear productos', Icon: FaEdit },
  { path: '/u/v/admin/listado_p', label: 'Mis productos', Icon: FaListUl }
]
export default function AdminNavigation({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav
      aria-label={mobile ? 'Administración móvil' : 'Administración'}
      className={
        mobile ? 'flex w-full justify-evenly bottom-0 fixed bg-gray-900' : 'mt-10'
      }
    >
      {items.map(({ path, label, Icon }) => (
        <NavLink
          key={path}
          to={path}
          aria-label={label}
          className={({ isActive }) =>
            `${mobile ? 'w-1/3 justify-center' : 'w-full'} flex items-center px-6 py-2 ${isActive ? 'bg-gray-700 text-gray-100' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'}`
          }
        >
          <Icon size={mobile ? 30 : 22} />
          {!mobile && <span className='mx-3'>{label}</span>}
        </NavLink>
      ))}
    </nav>
  )
}
