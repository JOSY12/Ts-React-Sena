import axios from 'axios'

//crea configuracion de axios basica para poder hacer peticiones tipo funcion hook
const backend = axios.create({
  baseURL: 'http://localhost:3000/sena'
})
// funciones para peticiones backend usuarios
export const todos_usuarios = async () => {
  const res = await backend.get('/u/usuarios')
  return res.data
}
