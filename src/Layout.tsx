import { Outlet } from 'react-router-dom'
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

  const solicitar_favoritos = favoritos_store(
    (state) => state.solicitar_favoritos
  )
  const solicitar_notificicaciones = Notificaciones_store(
    (state) => state.solicitar_notificicaciones
  )
  const solicitar_carrito = carrito_store((state) => state.solicitar_carrito)
  const solicitar_productos = productos_store(
    (state) => state.solicitar_productos
  )

  const peticiones_usuario = async () => {
    solicitar_carrito()
    solicitar_favoritos()
    solicitar_notificicaciones()
  }
  useEffect(() => {
    // solicitar_productos()
    isSignedIn && peticiones_usuario()
  }, [isSignedIn])

  useEffect(() => {
    solicitar_productos()
  }, [])

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-grow'>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
