import { Navigate, Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Cargando from '../Cargando'

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <Cargando />
  }

  if (!isAuthenticated) {
    return <Navigate to='/' />
  }

  return <Outlet /> // Renderiza las rutas hijas
}

export default ProtectedRoute
