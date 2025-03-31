import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import { createBrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
// Configuración de rutas

const domain = 'TU_DOMINIO.auth0.com'
const clientId = 'TU_CLIENT_ID'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      //   { index: true, element: <Home /> }, // Ruta raíz: "/"
      //   { path: 'about', element: <About /> }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <RouterProvider router={router}></RouterProvider>
    </Auth0Provider>
  </StrictMode>
)
