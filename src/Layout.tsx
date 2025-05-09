import { Outlet } from 'react-router-dom'
import Navbar from './Componentes/Navbar'
// import Footer from './Componentes/Footer'
import { useEffect, useRef } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { axiosbackend } from './Services'
const Layout = () => {
  const { getToken } = useAuth()
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
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

export default Layout
