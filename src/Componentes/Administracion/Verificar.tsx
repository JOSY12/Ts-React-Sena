// import { useLoaderData, useParams } from 'react-router-dom'

import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { crear_usuario } from '../../axios'
import { useNavigate } from 'react-router-dom'
import Cargando from '../Cargando'

type respuestas = {
  Exito?: string
  Error?: string | ''
  Existe?: boolean
}

const Verificar = () => {
  const { user } = useAuth0()
  const navigate = useNavigate()
  const [usuariobd, setUsuarios] = useState<respuestas>()
  const [cargando, setcargando] = useState<boolean>(false)

  const crear_usuarios = async () => {
    const r = (await crear_usuario(
      user?.sub as string,
      user?.name as string,
      user?.email as string
    )) as respuestas

    setUsuarios(r)
  }
  useEffect(() => {
    if (user?.sub) {
      crear_usuarios()
    }
  }, [user])
  // se verifica la respuesta que me llega del backend
  useEffect(() => {
    if (usuariobd?.Existe) {
      setcargando(false)
      navigate('/')
    } else if (usuariobd?.Exito) {
      setcargando(false)
      navigate('/')
    } else {
      setcargando(true)

      crear_usuarios()
    }
  }, [user])
  console.log(user)

  return (
    <>
      <div>{cargando && <Cargando />} </div>
    </>
  )
}

export default Verificar
