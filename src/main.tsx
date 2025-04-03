import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import { createBrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import Inicio from './Componentes/Inicio'
import Perfil from './Componentes/Perfil'
import PaginaError from './Componentes/Error'
import Usuarios from './Componentes/Administracion/Usuarios'
import Productos from './Componentes/Productos'
import { todos_usuarios } from './Services'
import Verificar from './Componentes/Administracion/Verificar'
import Notificaciones from './Componentes/Notificaciones'
import Carrito from './Componentes/Carrito'
import Compras from './Componentes/Compras'
import DashboardGeneral from './Componentes/Administracion/DashboardGeneral'
import Favoritos from './Componentes/Favoritos'
import ProtectedRoute from './Componentes/Administracion/RutasProtejidas'
// Configuración de rutas

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <PaginaError />,
    children: [
      { index: true, element: <Inicio /> }, // Ruta raíz: "/"

      {
        path: '/u',
        element: <ProtectedRoute />,
        children: [
          {
            path: 'perfil',
            element: <Perfil />
          },
          { path: 'notificaciones', element: <Notificaciones /> },
          { path: 'carrito', element: <Carrito /> },
          { path: 'compras', element: <Compras /> },
          {
            path: 'admin',
            element: <DashboardGeneral />
          },
          { path: 'favoritos', element: <Favoritos /> },

          { path: 'productos', element: <Productos /> },
          {
            path: 'verificar',
            element: <Verificar />
          }
        ]
      },

      // { path: '/usuarios', element: <Usuarios />, loader: todos_usuarios },
      { path: '*', element: <PaginaError /> } // Ruta para manejar errores
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/u/verificar`
      }}
      useRefreshTokens={true}
      cacheLocation='localstorage'
    >
      <RouterProvider router={router}></RouterProvider>
    </Auth0Provider>
  </StrictMode>
)
