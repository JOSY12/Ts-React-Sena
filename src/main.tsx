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
  detalle_producto,
  detalle_producto_editar,
  todo_productos,
  todos_usuarios
} from './Services'
import Admin_usuarios from './Componentes/Administracion/Admin_usuarios'
import Admin_Productos from './Componentes/Administracion/Admin_Productos'
import Listar_productos from './Componentes/Administracion/Listar_productos'
import Editor_productos from './Componentes/Administracion/Editor_productos'
import DetallesProducto from './Componentes/DetallesProducto'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <PaginaError />,
    children: [
      { index: true, element: <Inicio /> }, // Ruta raíz: "/" osea aquie se va cuando la pagina no tiene url solo "/"
      { path: 'contacto', element: <Contacto /> },

      {
        path: 'productos',
        element: <Productos />
      },
      {
        path: 'productos/:id',
        element: <DetallesProducto />,
        loader: ({ params }) => detalle_producto(params.id ? params.id : '')
      },
      { path: 'iniciarsesion', element: <Iniciar_sesion /> },
      { path: 'registrar', element: <Registrar /> },
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
            element: <Notificaciones />
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
                    loader: todos_usuarios
                  },
                  {
                    path: 'productos',
                    element: <Admin_Productos />,
                    loader: categorias
                  },
                  {
                    path: 'listado_p',
                    element: <Listar_productos />,
                    loader: todo_productos
                  },
                  {
                    path: 'editor/:id',
                    element: <Editor_productos />,
                    loader: async ({ params }) => {
                      if (!params.id) {
                        throw new Error('id de producto requerido')
                      }
                      const detalle = await detalle_producto_editar(params.id)
                      const categoriasData = await categorias()
                      const data = [categoriasData, detalle]
                      return data
                    }
                  }
                ]
              }
            ]
          }
        ]
      },

      { path: '*', element: <PaginaError /> } // Ruta para manejar errores, debe ponerse
      // siempre dentro del layout visible con su navbar para que se muestre bien
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
