import './App.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './app/Root'
import { ThemeProvider } from './shared/ui/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  </StrictMode>
)
