import { useAuth0 } from '@auth0/auth0-react'

const Logout = () => {
  const { logout } = useAuth0()

  return (
    <button
      className='mt-3  text-lg font-semibold 
                bg-red-800   text-white rounded-lg
                px-6 py-3 block shadow-xl hover:text-white hover:bg-red-500'
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Cerrar sesion
    </button>
  )
}

export default Logout
