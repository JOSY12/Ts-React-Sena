import { useLoaderData } from 'react-router-dom'

type usuario = {
  id: number
  nombre: string
  email: string
}

const Usuarios = () => {
  // obtube los datos usando el nuevo hook useloaderdata de router 7 esta bueno
  const usuarios = useLoaderData() as usuario[]

  return (
    <div>
      {usuarios.map(usuarios => (
        <li key={usuarios.id}>
          Id: {usuarios.id} - Nombre:{usuarios.nombre} - Email:
          {usuarios.email}
        </li>
      ))}
    </div>
  )
}

export default Usuarios
