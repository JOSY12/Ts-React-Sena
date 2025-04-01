import { useAuth0 } from '@auth0/auth0-react'

const Perfil = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }
  console.log(user)
  return (
    isAuthenticated && (
      <div>
        imagen:
        <img src={user?.picture} alt={user?.name} />
        <h2>usuario:{user?.name}</h2>
        <p>emaill:{user?.email}</p>
      </div>
    )
  )
}

export default Perfil
