import { Outlet, useSearchParams } from 'react-router-dom'
import Navbar from './Componentes/Navbar'
import { useEffect, useRef } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { axiosbackend } from './Services'
import { favoritos_store } from './Zustand/Favoritos_store'
import { useUser } from '@clerk/clerk-react'
import { Notificaciones_store } from './Zustand/Notificaciones_store'
import { carrito_store } from './Zustand/Carrito_store'
import Footer from './Componentes/Footer'
import { productos_store } from './Zustand/Productos_store'
const Layout = () => {
  const { getToken } = useAuth()
  const { isSignedIn } = useUser()

  const solicitar_favoritos = favoritos_store(
    (state) => state.solicitar_favoritos
  )
  const solicitar_notificicaciones = Notificaciones_store(
    (state) => state.solicitar_notificicaciones
  )
  const solicitar_carrito = carrito_store((state) => state.solicitar_carrito)

  const lading_page_solicitar = productos_store(
    (state) => state.lading_page_solicitar
  )
  const [parametrosUrl] = useSearchParams()

  const solicitar_productos = productos_store(
    (state) => state.solicitar_productos
  )
  const buscar_con_filtros = productos_store(
    (state) => state.buscar_con_filtros
  )

  const interceptorAgregado = useRef(false) // 🧠 bandera para evitar repetir
  useEffect(() => {
    if (interceptorAgregado.current) return // ya se agregó
    interceptorAgregado.current = true

    axiosbackend.interceptors.request.use(async (config) => {
      const token = await getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  }, [getToken])

  const peticiones_usuario = async () => {
    solicitar_carrito()
    solicitar_favoritos()
    solicitar_notificicaciones()
  }
  useEffect(() => {
    isSignedIn && peticiones_usuario()
  }, [isSignedIn])

  useEffect(() => {
    lading_page_solicitar()
    const parametros = Object.fromEntries(parametrosUrl.entries())

    if (Object.keys(parametros).length !== 0) {
      buscar_con_filtros({
        Nombre: parametros.Nombre ? parametros.Nombre.trim() : '',
        Categorias: parametros.Categorias && parametros.Categorias.split(','),
        Minimo: parametros.Minimo ? parametros.Minimo : '',
        Maximo: parametros.Maximo ? parametros.Maximo : ''
      })
    } else {
      solicitar_productos({
        Nombre: parametros.Nombre ? parametros.Nombre.trim() : '',
        Categorias: parametros.Categoria ? parametros.Categoria.split(',') : '',
        Minimo: parametros.Minimo ? parametros.Minimo : '',
        Maximo: parametros.Maximo ? parametros.Maximo : ''
      })
    }
  }, [])

  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden'>
      <Navbar />

      <main className='flex-grow'>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
