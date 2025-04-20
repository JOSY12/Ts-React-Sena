import axios from 'axios'
import { toast } from 'sonner'
const URL = import.meta.env.VITE_AXIOS_BASE_URL
export const axiosbackend = axios.create({
  baseURL: URL,
  withCredentials: true
})

// tipado para manejo  de errores
// type RespuestaUsuarios =
//   | { success: true; data: usuarios[] }
//   | { success: false; error: string }

// funciones para peticiones backend usuarios
export const todos_usuarios = async (): Promise<any> => {
  const id = toast.loading('cargando')

  try {
    const res = await axiosbackend.get('/u/usuarios')
    toast.success('Usuarios obtenidos exitosamente', { id })
    return res.data.Usuarios
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error('error al cargar usuarios', { id })
      return error.response?.data
    }
    toast.error('error al cargar usuarios', { id })

    return { message: 'Ocurrió un error inesperado', error }
  }
}

export const obtener_usuario = async (id: string): Promise<any> => {
  // const idcarga = toast.loading('cargando usuario')

  try {
    const res = await axiosbackend.get(`/u/perfil/${id}`)
    return { Exito: true, Datos: res.data }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      // toast.error('error al cargar datos del usuario', { id: idcarga })

      return error.response?.data
    }
    // toast.error('error al cargar datos del usuario', { id: idcarga })

    return { message: 'Ocurrió un error inesperado', error }
  }
}

export const crear_usuario = async (
  sub: string,
  name: string,
  email: string
) => {
  try {
    if (!sub || !name || !email) {
      throw new Error('Todos los campos (id, nombre, email) son obligatorios.')
    }
    const res = await axiosbackend.post(`/u/crear/`, {
      sub,
      name,
      email
    })
    return res.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data
    }

    return { Error: '' }
  }
}

//  peticion de pruebas toast

export const tosta = async () => {
  const id = toast.loading('cargando')
  try {
    const res = await axiosbackend.get('/u/tost')
    toast.success('Peticion exitosa', { id })
    return res.data
  } catch (error) {
    toast.error('Error al hacer la solititud', { id })
    return error
  }
}

export const clerktest = async () => {
  const id = toast.loading('cargando')
  try {
    const res = await axiosbackend.get('/privada')
    toast.success('Peticion exitosa', { id })
    console.log(res)
    // return res.data
  } catch (error) {
    console.log(error)
    toast.error('Error al hacer la solititud', { id })
    return error
  }
}
