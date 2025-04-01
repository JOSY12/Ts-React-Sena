import { useEffect, useState } from 'react'
import { todos_usuarios } from '../../axios'

const Usuarios = () => {
  const [users, setUsuarios] = useState([])

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
      <h1>Lista de Usuarios</h1>
      <ul></ul>
    </div>
  )
}

export default Usuarios
