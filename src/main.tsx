import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import { createBrowserRouter } from 'react-router-dom'
import Inicio from './Componentes/Inicio'
import Perfil from './Componentes/Perfil'
import PaginaError from './Componentes/Error'
import Productos from './Componentes/Productos'
import Verificar from './Componentes/Administracion/Verificar'
import Notificaciones from './Componentes/Notificaciones'
import Carrito from './Componentes/Carrito'
import Compras from './Componentes/Compras'
import DashboardGeneral from './Componentes/Administracion/DashboardGeneral'
import Favoritos from './Componentes/Favoritos'
import { Toaster } from 'sonner'
import { ClerkProvider } from '@clerk/clerk-react'
import { esES } from '@clerk/localizations'
import Iniciar_sesion from './Componentes/Iniciarsesion'
import ProtectedRoute from './Componentes/Administracion/RutasProtejidas'
import Registrar from './Componentes/Registrar'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <PaginaError />,
    children: [
      { index: true, element: <Inicio /> }, // Ruta raíz: "/"
      { path: 'productos', element: <Productos /> }, // el unico lugar que el visitante puede visitar para ver los productos
      { path: 'iniciarsesion', element: <Iniciar_sesion /> }, // el unico lugar que el visitante puede visitar para ver los productos
      { path: 'registrar', element: <Registrar /> }, // el unico lugar que el visitante puede visitar para ver los productos
      {
        path: 'u',
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

          {
            path: 'verificar',
            element: <Verificar />
          }
        ]
      },

      { path: '*', element: <PaginaError /> } // Ruta para manejar errores
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      signInForceRedirectUrl={'/u/verificar'}
      signUpFallbackRedirectUrl={'/u/verificar'}
      localization={esES}
    >
      <Toaster position='top-center' richColors />

      <RouterProvider router={router}></RouterProvider>
    </ClerkProvider>
  </StrictMode>
)
