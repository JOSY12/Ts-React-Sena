import './App.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { esES } from '@clerk/localizations'
import { Toaster } from 'sonner'
import { configurationErrors, env } from './shared/config/env'
import SessionBoundary from './app/Application'

const errors = configurationErrors()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {errors.length ? (
      <main className='p-8' role='alert'>
        <h1>Configuración pendiente</h1>
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </main>
    ) : (
      <ClerkProvider
        publishableKey={env.clerkKey}
        signInUrl='/iniciarsesion'
        signUpUrl='/registrar'
        signInForceRedirectUrl='/productos'
        signUpFallbackRedirectUrl='/productos'
        localization={esES}
      >
        <Toaster position='bottom-right' richColors />
        <SessionBoundary />
      </ClerkProvider>
    )}
  </StrictMode>
)
