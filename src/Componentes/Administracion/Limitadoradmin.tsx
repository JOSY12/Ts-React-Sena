import { useClerk, useAuth } from '@clerk/clerk-react'
import { Outlet, Navigate } from 'react-router-dom'
import Cargando from '../Cargando'
const Limitadoradmin = () => {
  const { user } = useClerk()
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) {
    return <Cargando />
  }

  if (!isSignedIn || !user?.publicMetadata.administrador) {
    return <Navigate to='/404' />
  }

  return <Outlet /> // Renderiza las rutas hijas
}

export default Limitadoradmin
