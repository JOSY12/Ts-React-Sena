import { Outlet } from 'react-router-dom'
import Navbar from './Componentes/Navbar'
// import Footer from './Componentes/Footer'
import { useEffect, useRef } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { axiosbackend } from './Services'
import { favoritos_store } from './Zustand/Favoritos_store'
import { useUser } from '@clerk/clerk-react'
import { Notificaciones_store } from './Zustand/Notificaciones_store'
import { carrito_store } from './Zustand/Carrito_store'
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

  const peticiones_usuario = async () => {
    solicitar_carrito()
    solicitar_favoritos()
    solicitar_notificicaciones()
  }
  useEffect(() => {
    isSignedIn && peticiones_usuario()
    console.log('recargado layout')
  }, [isSignedIn])

  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

export default Layout
