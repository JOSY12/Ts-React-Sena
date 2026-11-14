import { ui } from '@clerk/ui'
import { ClerkProvider } from '@clerk/react'
import { esES } from '@clerk/localizations'
import { Toaster } from 'sonner'
import { configurationErrors, env } from '../shared/config/env'
import SessionBoundary from './Application'
import { useTheme } from '../shared/ui/theme-context'

const errors = configurationErrors()
export default function Root() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  return errors.length ? (
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
      ui={ui}
      publishableKey={env.clerkKey}
      signInUrl='/iniciarsesion'
      signUpUrl='/registrar'
      signInForceRedirectUrl='/productos'
      signUpFallbackRedirectUrl='/productos'
      localization={esES}
      appearance={{
        variables: {
          colorPrimary: dark ? '#ccff5f' : '#5b3a9e',
          colorBackground: dark ? '#242821' : '#ffffff',
          colorForeground: dark ? '#edf0e5' : '#191a16',
          colorMutedForeground: dark ? '#bec4b4' : '#505147',
          colorInput: dark ? '#171a16' : '#ffffff',
          colorInputForeground: dark ? '#edf0e5' : '#191a16',
          borderRadius: '4px',
          fontFamily: 'Arial, Helvetica, sans-serif'
        },
        elements: {
          formButtonPrimary: {
            backgroundColor: '#ccff5f',
            color: '#191a16',
            border: '2px solid #191a16',
            boxShadow: '3px 3px 0 #191a16',
            fontWeight: 700
          }
        }
      }}
    >
      <Toaster position='bottom-right' richColors theme={theme} />
      <SessionBoundary />
    </ClerkProvider>
  )
}
