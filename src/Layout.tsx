import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import Navbar from './Componentes/Navbar'
import Footer from './Componentes/Footer'
import { favoritos_store } from './Zustand/Favoritos_store'
import { Notificaciones_store } from './Zustand/Notificaciones_store'
import { carrito_store } from './Zustand/Carrito_store'

const Layout = () => {
  const { userId } = useAuth()
  useEffect(() => {
    if (!userId) return
    // Only globally visible counters are loaded here. Pages own their data.
    void carrito_store.getState().solicitar_carrito()
    void favoritos_store.getState().solicitar_favoritos()
    void Notificaciones_store.getState().solicitar_notificicaciones()
  }, [userId])
  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden'>
      <Navbar />
      <main id='contenido' className='page-content flex-grow' tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
export default Layout
