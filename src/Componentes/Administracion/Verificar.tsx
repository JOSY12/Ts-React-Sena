import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { crear_usuario } from '../../Services'
import { useNavigate } from 'react-router-dom'
import Cargando from '../Cargando'
import { toast } from 'sonner'
export type respuestas = {
  Exito?: string
  Error?: string | ''
  Existe?: boolean
}

const Verificar = () => {
  const { user, isAuthenticated } = useAuth0()
  const navigate = useNavigate()
  const [usuariobd, setUsuarios] = useState<Partial<respuestas>>()
  const [cargando, setcargando] = useState<boolean>(false)

  const crear_usuarios = async (): Promise<void> => {
    if (!user?.sub || !user?.name || !user?.email) {
      setUsuarios({ Error: 'Faltan datos del usuario' })
      toast.error('Faltan datos del usuario')

      return
    }

    setcargando(true)
    try {
      const r = await crear_usuario(user.sub, user.name, user.email)

      setUsuarios(r)
    } catch (error) {
      setUsuarios({ Error: 'Error al crear usuario' })
    } finally {
      setcargando(false)
    }
  }

  // Llamar `crear_usuarios` solo si `user` está definido
  useEffect(() => {
    if (user?.sub && cargando) {
      crear_usuarios()
    }
  }, [user])

  useEffect(() => {
    if (usuariobd?.Existe || (usuariobd?.Exito && isAuthenticated)) {
      setcargando(false)
      navigate('/')
    } else if (!usuariobd?.Error) {
      setcargando(true)
      crear_usuarios()
    }
  }, [usuariobd])
  console.log(usuariobd)

  return (
    <>
      <div>{cargando && <Cargando />} </div>
    </>
  )
}

export default Verificar
