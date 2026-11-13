import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import {
  FiArrowUpRight,
  FiHeart,
  FiMenu,
  FiShoppingBag,
  FiUser,
  FiX
} from 'react-icons/fi'
import Sidebar from './Sidebar'
import { carrito_store } from '../Zustand/Carrito_store'
import { favoritos_store } from '../Zustand/Favoritos_store'
import { Notificaciones_store } from '../Zustand/Notificaciones_store'
import ThemeToggle from '../shared/ui/ThemeToggle'
import logo from '../img/tech-sells-high-resolution-logo-white-transparent.png'

const Navbar = () => {
  const { isSignedIn } = useAuth()
  const [open, setOpen] = useState(false)
  const menu = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const cartCount = carrito_store((state) => state.carrito.length)
  const favoriteCount = favoritos_store((state) => state.favoritos.length)
  useEffect(() => {
    if (!open) return
    const close = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.current?.contains(event.target))
        setOpen(false)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', escape)
    }
  }, [open])
  return (
    <header className='site-header'>
      <a className='skip-link' href='#contenido'>
        Saltar al contenido
      </a>
      <div className='announcement'>
        <span>TECNOLOGÍA A TU RITMO.</span>
        <span>
          EXPLORA. ELIGE. CONECTA. <FiArrowUpRight aria-hidden='true' />
        </span>
      </div>
      <nav className='nav-shell' aria-label='Navegación principal'>
        <Link to='/' className='brand' aria-label='Techsells · Inicio'>
          <img className='brand-logo' src={logo} alt='Techsells' />
        </Link>
        <div className='nav-links'>
          <NavLink to='/' end>
            Inicio
          </NavLink>
          <NavLink to='/productos'>Productos</NavLink>
          <NavLink to='/contacto'>Contacto</NavLink>
        </div>
        <div className='nav-actions'>
          <ThemeToggle />
          {isSignedIn ? (
            <>
              <Link
                className='icon-button favorites-link'
                to='/u/favoritos'
                aria-label={`Favoritos: ${favoriteCount}`}
              >
                <FiHeart aria-hidden='true' />
                {favoriteCount > 0 && <span className='counter'>{favoriteCount}</span>}
              </Link>
              <Link
                className='icon-button cart-link'
                to='/u/carrito'
                aria-label={`Carrito: ${cartCount} productos`}
              >
                <FiShoppingBag aria-hidden='true' />
                {cartCount > 0 && <span className='counter'>{cartCount}</span>}
              </Link>
            </>
          ) : (
            <Link className='button button-dark nav-login' to='/iniciarsesion'>
              Entrar <FiArrowUpRight aria-hidden='true' />
            </Link>
          )}
          <div className='account-menu' ref={menu}>
            <button
              ref={toggle}
              className='icon-button'
              aria-label={open ? 'Cerrar menú' : 'Abrir menú de usuario'}
              aria-expanded={open}
              aria-controls='account-navigation'
              onClick={() => {
                if (!open && isSignedIn)
                  void Notificaciones_store.getState().solicitar_notificicaciones()
                setOpen(!open)
              }}
            >
              {open ? (
                <FiX aria-hidden='true' />
              ) : isSignedIn ? (
                <FiUser aria-hidden='true' />
              ) : (
                <FiMenu aria-hidden='true' />
              )}
            </button>
            {open && <Sidebar activar={() => setOpen(false)} />}
          </div>
        </div>
      </nav>
    </header>
  )
}
export default Navbar
