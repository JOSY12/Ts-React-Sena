import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '../src/shared/ui/ThemeProvider'
import ThemeToggle from '../src/shared/ui/ThemeToggle'

let dark: boolean
const listeners = new Set<() => void>()
beforeEach(() => {
  dark = false
  listeners.clear()
  localStorage.removeItem('techsells.theme')
  vi.stubGlobal('matchMedia', () => ({
    get matches() {
      return dark
    },
    addEventListener: (_event: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_event: string, listener: () => void) =>
      listeners.delete(listener)
  }))
})
afterEach(() => {
  vi.unstubAllGlobals()
  localStorage.removeItem('techsells.theme')
  delete document.documentElement.dataset.theme
})
function show() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  )
}
function changeSystem(value: boolean) {
  act(() => {
    dark = value
    listeners.forEach((listener) => listener())
  })
}
describe('tema de la tienda', () => {
  it('sigue el sistema mientras no haya elección guardada', () => {
    show()
    expect(document.documentElement.dataset.theme).toBe('light')
    changeSystem(true)
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(
      screen
        .getByRole('button', { name: 'Activar modo claro' })
        .getAttribute('aria-pressed')
    ).toBe('true')
  })
  it('recuerda la elección y la conserva al volver a montar', async () => {
    const view = show()
    await userEvent
      .setup()
      .click(screen.getByRole('button', { name: 'Activar modo oscuro' }))
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('techsells.theme')).toBe('dark')
    changeSystem(false)
    expect(document.documentElement.dataset.theme).toBe('dark')
    view.unmount()
    show()
    expect(screen.getByRole('button', { name: 'Activar modo claro' })).toBeTruthy()
  })
  it('la preferencia explícita clara prevalece sobre un sistema oscuro', () => {
    dark = true
    localStorage.setItem('techsells.theme', 'light')
    show()
    expect(document.documentElement.dataset.theme).toBe('light')
  })
  it('sincroniza una elección cambiada desde otra pestaña', () => {
    show()
    act(() => {
      localStorage.setItem('techsells.theme', 'dark')
      window.dispatchEvent(new StorageEvent('storage', { key: 'techsells.theme' }))
    })
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
  it('funciona sin almacenamiento disponible y respeta la elección durante la visita', async () => {
    vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    show()
    await userEvent
      .setup()
      .click(screen.getByRole('button', { name: 'Activar modo oscuro' }))
    changeSystem(false)
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})
