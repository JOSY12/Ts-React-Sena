import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout'
import PaginaError from '../Componentes/Error'
import ProtectedRoute from '../Componentes/Administracion/RutasProtejidas'
import Limitadoradmin from '../Componentes/Administracion/Limitadoradmin'
import {
  categorias,
  detalle_compra,
  detalle_producto,
  detalle_producto_editar,
  todos_usuarios
} from '../Services'
import { requireAccess } from './access'

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <PaginaError />,
      children: [
        {
          index: true,
          lazy: async () => ({
            Component: (await import('../Componentes/Landing_page')).default
          })
        }, // Ruta raíz: "/" osea aquie se va cuando la pagina no tiene url solo "/"
        {
          path: 'contacto',
          lazy: async () => ({
            Component: (await import('../Componentes/Contacto')).default
          })
        },

        {
          path: 'productos',
          lazy: async () => ({
            Component: (await import('../Componentes/Inicio')).default
          })
        },
        {
          path: 'productos/:id',
          lazy: async () => ({
            Component: (await import('../Componentes/DetallesProducto')).default
          }),
          loader: async ({ params, request }) => {
            const data = await detalle_producto(params.id ?? '', request.signal)
            if (!data.producto.length)
              throw new Response('Producto no encontrado', { status: 404 })
            return data
          }
        },
        {
          path: 'iniciarsesion',
          lazy: async () => ({
            Component: (await import('../Componentes/Iniciarsesion')).default
          })
        },
        {
          path: 'registrar',
          lazy: async () => ({
            Component: (await import('../Componentes/Registrar')).default
          })
        },
        {
          path: 'u',
          element: <ProtectedRoute />,
          children: [
            {
              path: 'perfil',
              lazy: async () => ({
                Component: (await import('../Componentes/Perfil')).default
              })
            },
            {
              path: 'notificaciones',
              lazy: async () => ({
                Component: (await import('../Componentes/Notificaciones')).default
              })
            },
            {
              path: 'carrito',
              lazy: async () => ({
                Component: (await import('../Componentes/Carrito')).default
              })
            },
            {
              path: 'compras',
              lazy: async () => ({
                Component: (await import('../Componentes/Compras')).default
              })
            },
            {
              path: 'compras/:id',
              lazy: async () => ({
                Component: (await import('../Componentes/Detalles_compra')).default
              }),
              loader: ({ params }) => {
                requireAccess()
                return detalle_compra(params.id ?? '')
              }
            },

            {
              path: 'favoritos',
              lazy: async () => ({
                Component: (await import('../Componentes/Favoritos')).default
              })
            },

            {
              path: 'v',
              element: <Limitadoradmin />,
              children: [
                {
                  path: 'admin',
                  lazy: async () => ({
                    Component: (
                      await import('../Componentes/Administracion/DashboardGeneral')
                    ).default
                  }),

                  children: [
                    {
                      path: 'usuarios',
                      lazy: async () => ({
                        Component: (
                          await import('../Componentes/Administracion/Admin_usuarios')
                        ).default
                      }),
                      loader: () => {
                        requireAccess(true)
                        return todos_usuarios()
                      }
                    },
                    {
                      path: 'productos',
                      lazy: async () => ({
                        Component: (
                          await import('../Componentes/Administracion/Admin_Productos')
                        ).default
                      }),
                      loader: () => {
                        requireAccess(true)
                        return categorias()
                      }
                    },
                    {
                      path: 'listado_p',
                      lazy: async () => ({
                        Component: (
                          await import('../Componentes/Administracion/Listar_productos')
                        ).default
                      })
                    },
                    {
                      path: 'editor/:id',
                      lazy: async () => ({
                        Component: (
                          await import('../Componentes/Administracion/Editor_productos')
                        ).default
                      }),
                      loader: async ({ params }) => {
                        requireAccess(true)
                        if (!params.id) {
                          throw new Error('id de producto requerido')
                        }
                        const [categoriasData, detalle] = await Promise.all([
                          categorias(),
                          detalle_producto_editar(params.id)
                        ])
                        return { categorias: categoriasData, detalle }
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
