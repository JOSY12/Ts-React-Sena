import axios from 'axios'
import { respuestas } from './Componentes/Administracion/Verificar'
import { toast } from 'sonner'

const URL = import.meta.env.VITE_AXIOS_BASE_URL

//crea configuracion de axios basica para poder hacer peticiones tipo funcion hook
const backend = axios.create({
  baseURL: URL,
  withCredentials: true
  // adapter: cache.adapter
})

//  interface listausuarios{
// }

// tipado para manejo  de errores
// type RespuestaUsuarios =
//   | { success: true; data: usuarios[] }
//   | { success: false; error: string }

// funciones para peticiones backend usuarios
export const todos_usuarios = async (): Promise<any> => {
  const id = toast.loading('cargando')

  try {
    const res = await backend.get('/u/usuarios')
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
  const idcarga = toast.loading('cargando usuario')

  try {
    const res = await backend.get(`/u/perfil/${id}`)
    toast.success('Usuarios obtenidos exitosamente', { id: idcarga })

    return { Exito: true, Datos: res.data }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error('error al cargar usuarios', { id: idcarga })

      return error.response?.data
    }
    toast.error('error al cargar usuarios', { id: idcarga })

    return { message: 'Ocurrió un error inesperado', error }
  }
}

export const crear_usuario = async (
  sub: string,
  name: string,
  email: string
): Promise<respuestas> => {
  try {
    if (!sub || !name || !email) {
      throw new Error('Todos los campos (id, nombre, email) son obligatorios.')
    }
    const res = await backend.post<respuestas>(`/u/crear/`, {
      sub,
      name,
      email
    })
    return res.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error('error al hacer la solicitud')
      return error.response.data
    }
    return { Error: '' }
  }
}

//  peticion de pruebas toast

export const tosta = async () => {
  const id = toast.loading('cargando')
  try {
    const res = await backend.get('/u/tost')
    toast.success('Peticion exitosa', { id })
    return res.data
  } catch (error) {
    toast.error('Error al hacer la solititud', { id })
    return error
  }
}
