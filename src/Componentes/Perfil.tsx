import { useAuth0 } from '@auth0/auth0-react'
import { obtener_usuario } from '../axios'
import { useEffect, useState } from 'react'

type usuario = {
  id: string
  nombre: string
  email: string
  edad: null | number
  claveacceso: null | string
  fecha_creacion: string
}

interface respuestas {
  Exito: boolean
  Datos?: usuario
  Error?: string
}

const Perfil = () => {
  const { user, isAuthenticated } = useAuth0()
  // console.log(user)
  const [datos, setdatos] = useState<usuario>()

  const usuariosbd = async (): Promise<respuestas> => {
    if (!user?.sub) {
      return {
        Exito: false,
        Error: 'El usuario no está autenticado o no tiene un ID válido.'
      }
    }

    try {
      const res = await obtener_usuario(user.sub)

      if (res?.Datos?.Perfil?.length > 0) {
        setdatos(res.Datos.Perfil[0])
        return { Exito: true, Datos: res.Datos.Perfil[0] }
      }

      return {
        Exito: false,
        Error: 'No se encontró información del perfil en la base de datos.'
      }
    } catch (error: unknown) {
      console.error('Error al obtener el perfil del usuario:', error)
      return {
        Exito: false,
        Error: 'Ocurrió un error al procesar los datos del perfil.'
      }
    }
  }

  useEffect(() => {
    if (user?.sub) {
      usuariosbd()
    }
  }, [user])

  return (
    isAuthenticated && (
      <div>
        imagen:
        <img src={user?.picture} alt={user?.name} />
        <h2>usuario:{datos?.nombre}</h2>
        <p>emaill:{user?.email}</p>
      </div>
    )
  )
}

export default Perfil
