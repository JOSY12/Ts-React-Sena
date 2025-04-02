import axios from 'axios'

//crea configuracion de axios basica para poder hacer peticiones tipo funcion hook
const backend = axios.create({
  baseURL: 'http://localhost:3000/sena'
  // adapter: cache.adapter
})
// funciones para peticiones backend usuarios
export const todos_usuarios = async () => {
  try {
    const res = await backend.get('/u/usuarios')
    return res.data.Usuarios
  } catch (error) {
    return error
  }
}

export const obtener_usuario = async (id: string) => {
  try {
    const res = await backend.get(`/u/perfil/${id}`)
    return res.data
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
) => {
  try {
    if (!sub || !name || !email) {
      throw new Error('Todos los campos (id, nombre, email) son obligatorios.')
    }
    const res = await backend.post(`/u/crear/`, { sub, name, email })
    return res.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data
    }
    return { message: 'Ocurrió un error inesperado', error }
  }
}

// const cache = setupCache({
//   maxAge: 15 * 60 * 1000 // 15 minutos de caché
// })

// // Crear una instancia de axios con caché
// const api = axios.create({
//   adapter: cache.adapter
// })
