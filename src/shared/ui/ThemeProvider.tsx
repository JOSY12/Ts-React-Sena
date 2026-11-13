import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme } from './theme-context'

const KEY = 'techsells.theme'
function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}
function systemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}
export function ThemeProvider({ children }: { children: ReactNode }) {
  const preference = useRef(savedTheme())
  const [theme, setTheme] = useState<Theme>(() => preference.current ?? systemTheme())
  useEffect(() => {
    apply(theme)
  }, [theme])
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)')
    const sync = () => {
      if (!preference.current) setTheme(systemTheme())
    }
    const storage = (event: StorageEvent) => {
      if (event.key === KEY || event.key === null) {
        preference.current = savedTheme()
        setTheme(preference.current ?? systemTheme())
      }
    }
    media?.addEventListener('change', sync)
    window.addEventListener('storage', storage)
    return () => {
      media?.removeEventListener('change', sync)
      window.removeEventListener('storage', storage)
    }
  }, [])
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    preference.current = next
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* The choice still works for this page. */
    }
    apply(next)
    setTheme(next)
  }
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
  )
}
