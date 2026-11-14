import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import Navbar from '../src/Componentes/Navbar'
import { Notificaciones_store } from '../src/Zustand/Notificaciones_store'

const auth = vi.hoisted(() => ({ signedIn: false, admin: false }))
vi.mock('@clerk/react', () => ({
  useAuth: () => ({ isSignedIn: auth.signedIn }),
  useUser: () => ({ user: { publicMetadata: { administrador: auth.admin } } }),
  SignOutButton: ({ children }: { children: ReactNode }) => children
}))
beforeEach(() => {
  auth.signedIn = false
  auth.admin = false
  vi.spyOn(
    Notificaciones_store.getState(),
    'solicitar_notificicaciones'
  ).mockResolvedValue(true)
})
describe('navegación de la tienda rediseñada', () => {
  it('conserva el acceso a todas las páginas públicas desde el menú', async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    await userEvent
      .setup()
      .click(screen.getByRole('button', { name: 'Abrir menú de usuario' }))
    expect(screen.getByRole('navigation', { name: 'Menú de usuario' })).toBeTruthy()
    expect(
      screen.getByRole('link', { name: 'Crear cuenta' }).getAttribute('href')
    ).toBe('/registrar')
    expect(
      screen.getByRole('link', { name: 'Iniciar sesión' }).getAttribute('href')
    ).toBe('/iniciarsesion')
  })
  it('Escape cierra el menú y devuelve el foco al botón', async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Abrir menú de usuario' }))
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('navigation', { name: 'Menú de usuario' })).toBeNull()
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Abrir menú de usuario' })
    )
  })
  it('muestra administración únicamente al administrador y cierra al navegar', async () => {
    auth.signedIn = true
    auth.admin = true
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Abrir menú de usuario' }))
    expect(
      screen.getByRole('link', { name: 'Administración' }).getAttribute('href')
    ).toBe('/u/v/admin/usuarios')
    await user.click(screen.getByRole('link', { name: 'Mi perfil' }))
    expect(screen.queryByRole('navigation', { name: 'Menú de usuario' })).toBeNull()
  })
  it('el comprador conserva sus enlaces privados sin opciones de administración', async () => {
    auth.signedIn = true
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )
    await userEvent
      .setup()
      .click(screen.getByRole('button', { name: 'Abrir menú de usuario' }))
    expect(screen.queryByRole('link', { name: 'Administración' })).toBeNull()
    expect(screen.getByRole('link', { name: 'Mis compras' }).getAttribute('href')).toBe(
      '/u/compras'
    )
    expect(screen.getByRole('link', { name: 'Favoritos' }).getAttribute('href')).toBe(
      '/u/favoritos'
    )
  })
})
