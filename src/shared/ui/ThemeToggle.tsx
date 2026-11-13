import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from './theme-context'
export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const label = theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'
  return (
    <button
      type='button'
      className='icon-button theme-toggle'
      aria-label={label}
      title={label}
      aria-pressed={theme === 'dark'}
      onClick={toggle}
    >
      {theme === 'dark' ? <FiSun aria-hidden='true' /> : <FiMoon aria-hidden='true' />}
    </button>
  )
}
