import { useEffect, useState } from 'react'
import { todos_usuarios } from '../../axios'

type usuario = {
  id: number
  nombre: string
  email: string
}

const Usuarios = () => {
  const [users, setUsuarios] = useState<usuario[]>([])

  const llamado = async () => {
    const datos = await todos_usuarios()
    setUsuarios(datos)
  }

  useEffect(() => {
    llamado()
  }, [])
  console.log(users)

  // El array vacío asegura que se ejecute solo una vez al montar el componente
  return (
    <div>
      {users.map((e, key) => (
        <li key={key}>
          {e.nombre} - {e.email}
        </li>
      ))}
    </div>
  )
}

export default Usuarios
