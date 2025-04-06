import { Navigate, Outlet } from 'react-router-dom'
import {
  useUser,
  SignedIn,
  SignedOut,
  RedirectToSignIn
} from '@clerk/clerk-react'
import Cargando from '../Cargando'
const ProtectedRoute = () => {
  // const { isAuthenticated, isLoading } = useAuth0()
  return (
    <>
      <SignedIn>
        <Outlet />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

export default ProtectedRoute
