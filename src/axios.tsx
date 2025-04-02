import axios from 'axios'
import { respuestas } from './Componentes/Administracion/Verificar'

//crea configuracion de axios basica para poder hacer peticiones tipo funcion hook
const backend = axios.create({
  baseURL: 'http://localhost:3000/sena'
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
  try {
    const res = await backend.get('/u/usuarios')
    return res.data.Usuarios
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response?.data
    }
    return { message: 'Ocurrió un error inesperado', error }
  }
}

export const obtener_usuario = async (id: string): Promise<any> => {
  try {
    const res = await backend.get<string>(`/u/perfil/${id}`)

    return { Exito: true, Datos: res.data }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response?.data
    }
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
      return error.response.data
    }
    return { Error: '' }
  }
}

// const cache = setupCache({
//   maxAge: 15 * 60 * 1000 // 15 minutos de caché
// })

// // Crear una instancia de axios con caché
// const api = axios.create({
//   adapter: cache.adapter
// })
