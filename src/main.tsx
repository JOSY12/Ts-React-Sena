import './App.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import { createBrowserRouter } from 'react-router-dom'
import Inicio from './Componentes/Inicio'
import Perfil from './Componentes/Perfil'
import PaginaError from './Componentes/Error'
import Productos from './Componentes/Productos'
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
import Limitadoradmin from './Componentes/Administracion/Limitadoradmin'
import Contacto from './Componentes/Contacto'
import {
  categorias,
  todo_productos,
  todos_usuarios,
  usuario_notificaciones
} from './Services'
import Admin_usuarios from './Componentes/Administracion/Admin_usuarios'
import Admin_Productos from './Componentes/Administracion/Admin_Productos'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <PaginaError />,
    children: [
      { index: true, element: <Inicio /> }, // Ruta raíz: "/"
      { path: 'contacto', element: <Contacto /> }, // el unico lugar que el visitante puede visitar para ver los productos

      {
        path: 'productos',
        element: <Productos />,
        loader: async () => {
          return await todo_productos()
        }
      }, // el unico lugar que el visitante puede visitar para ver los productos
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
          {
            path: 'notificaciones',
            element: <Notificaciones />,
            loader: async () => {
              return await usuario_notificaciones()
            }
          },
          { path: 'carrito', element: <Carrito /> },
          { path: 'compras', element: <Compras /> },

          { path: 'favoritos', element: <Favoritos /> },

          {
            path: 'v',
            element: <Limitadoradmin />,
            children: [
              {
                path: 'admin',
                element: <DashboardGeneral />,

                children: [
                  {
                    path: 'usuarios',
                    element: <Admin_usuarios />,
                    loader: async () => {
                      return await todos_usuarios()
                    }
                  },
                  {
                    path: 'productos',
                    element: <Admin_Productos />,
                    loader: async () => {
                      return await categorias()
                    }
                  }
                ]
              }
            ]
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
      signInForceRedirectUrl={'/productos'}
      signUpFallbackRedirectUrl={'/productos'}
      localization={esES}
    >
      <Toaster position='bottom-right' richColors />

      <RouterProvider router={router}></RouterProvider>
    </ClerkProvider>
  </StrictMode>
)
