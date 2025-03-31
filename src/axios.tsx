import axios from 'axios'

//crea configuracion de axios basica para poder hacer peticiones tipo funcion hook
const backend = axios.create({
  baseURL: 'http://localhost:3000'
})
// funciones para peticiones backend usuarios
export const usuarios = async () => {
  const res = await backend.get('sena/u/usuarios')
  return res.data
}
