import { Link } from 'react-router-dom'
import { useAuth, useUser, SignOutButton } from '@clerk/react'
import { FiArrowUpRight } from 'react-icons/fi'
import type { activador } from './types'
import { Notificaciones_store } from '../Zustand/Notificaciones_store'

const Sidebar = ({ activar }: activador) => {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const unread = Notificaciones_store(
    (state) => state.misnotificaciones.filter((item) => !item.visto).length
  )
  const links = isSignedIn
    ? [
        ['/u/perfil', 'Mi perfil'],
        ['/u/favoritos', 'Favoritos'],
        ['/u/carrito', 'Carrito'],
        ['/u/compras', 'Mis compras'],
        ['/u/notificaciones', `Notificaciones${unread ? ` (${unread})` : ''}`],
        ...(user?.publicMetadata?.administrador === true
          ? [['/u/v/admin/usuarios', 'Administración']]
          : [])
      ]
    : [
        ['/iniciarsesion', 'Iniciar sesión'],
        ['/registrar', 'Crear cuenta']
      ]
  return (
    <nav id='account-navigation' className='account-panel' aria-label='Menú de usuario'>
      <p className='eyebrow'>TU ESPACIO / TECHSELLS</p>
      {[
        ['/', 'Inicio'],
        ['/productos', 'Productos'],
        ['/contacto', 'Contacto'],
        ...links
      ].map(([to, label]) => (
        <Link key={to} to={to} onClick={activar}>
          {label}
          <FiArrowUpRight aria-hidden='true' />
        </Link>
      ))}
      {isSignedIn && (
        <SignOutButton>
          <button className='account-signout' onClick={activar}>
            Cerrar sesión
          </button>
        </SignOutButton>
      )}
    </nav>
  )
}
export default Sidebar
