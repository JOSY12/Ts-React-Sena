import axios from 'axios'
import { toast } from 'sonner'
import { Foto, Fotos, producto } from './Componentes/types'
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

export const todo_productos = async () => {
  const id = toast.loading('cargando productos')
  try {
    const res = await axiosbackend.get('/p/productos')
    toast.dismiss(id)
    return res.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(`error al cargar Productos ${error.response.data} `, { id })
      return error.response?.data
    }
    toast.error(`error al cargar Productos ${error} `, {
      id
    })

    return error
  }
}

export const todos_usuarios = async (): Promise<any> => {
  const id = toast.loading('cargando')
  try {
    const res = await axiosbackend.get('/u/usuarios')
    toast.dismiss(id)
    return res.data.Usuarios
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(`error al cargar usuarios ${error.response.data} `, { id })
      return error.response?.data
    }
    toast.error(`error al cargar usuarios ${error} `, {
      id,
      duration: 1000
    })

    return error
  }
}

export const obtener_usuario = async () => {
  // const idcarga = toast.loading('cargando usuario')

  try {
    const res = await axiosbackend.get(`/u/perfil`)
    return res.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      // toast.error('error al cargar datos del usuario', { id: idcarga })

      return error.response?.data
    }
    toast.error(`error al cargar datos del usuario ${error}`)

    return { message: 'Ocurrió un error inesperado', error }
  }
}

export const tosta = async () => {
  const id = toast.loading('cargando')
  try {
    const res = await axiosbackend.get('/u/tost')
    toast.success('Peticion exitosa', { id })
    return res.data
  } catch (error) {
    toast.error(`Error al hacer la solititud ${error}`, { id })
    return error
  }
}

// export const clerktest = async () => {
//   const id = toast.loading('cargando')
//   try {
//     const res = await axiosbackend.get('/privada')
//     toast.success('Peticion exitosa', { id })
//     // return res.data
//   } catch (error) {
//     toast.error(`Error al hacer la solititud ${error}`, { id })
//     return error
//   }
// }

export const agregar_direccion = async (
  ciudad: string,
  direccion: string,
  nota: string,
  telefono: string
) => {
  const id = toast.loading('cargando')
  try {
    const res = await axiosbackend.post('/u/actualizar', {
      ciudad,
      direccion,
      nota,
      telefono
    })
    toast.success('Peticion exitosa', { id })
    return res.data
  } catch (error) {
    toast.error(`Error al hacer la solititud ${error}`, { id })
    return error
  }
}

export const eliminar_direccion = async () => {
  const id = toast.loading('cargando')
  try {
    const res = await axiosbackend.post('/u/eliminar')
    toast.success('Peticion exitosa', { id })
    return res.data
  } catch (error) {
    toast.error(`Error al hacer la solititud ${error}`, { id })
    return error
  }
}

export const editar_direccion = async (
  id_usuario: string,
  ciudad: string,
  direccion: string,
  nota: string,
  telefono: string
) => {
  const id = toast.loading('cargando')
  try {
    const res = await axiosbackend.post('/u/editar', {
      id_usuario,
      ciudad,
      direccion,
      nota,
      telefono
    })
    toast.success('Peticion exitosa', { id })
    return res.data
  } catch (error) {
    toast.error(`Error al hacer la solititud ${error}`, { id })
    return error
  }
}

export const usuario_notificaciones = async () => {
  const id = toast.loading('cargando')
  try {
    const res = await axiosbackend.get(`/u/notificaciones`)
    toast.dismiss(id)
    return res.data.rows
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error('error al cargar notificaciones', { id })
      return error.response?.data
    }
    toast.error(`Error al cargar datos ${error}`, { id, duration: 1000 })
    return error
  }
}

export const actualizar_notificaciones = async () => {
  const id = toast.loading('cargando')
  try {
    // setea todo las de un usuario como leidas
    const res = await axiosbackend.put('/u/notificaciones')
    toast.success('Peticion exitosa', { id })
    return res.data
  } catch (error) {
    toast.error(`Error al hacer la solititud ${error}`, { id })
    return error
  }
}

export const borrar_notificaciones = async (nid: string) => {
  const id = toast.loading('borrando')
  try {
    const res = await axiosbackend.delete(`/u/notificaciones/${nid}`)
    toast.success('Borrado exitoso', { id })
    return res.data
  } catch (error) {
    toast.error(`Error al hacer la solititud ${error}`, { id })
    return error
  }
}

export const contador_notificaciones = async () => {
  try {
    const res = await axiosbackend.get(`/u/contador_notificaciones`)
    return res.data
  } catch (error) {
    return error
  }
}

export const marcar_visto = async () => {
  try {
    await axiosbackend.put(`/u/marcar_visto`)
  } catch (error) {
    return error
  }
}

export const borrar_todas_notificaciones = async () => {
  const id = toast.loading('borrando')

  try {
    const res = await axiosbackend.delete(`/u/borrar_todas_notificaciones`)
    toast.success('notificaciones borradas exitosamente', { id })
    return res.data.rows
  } catch (error) {
    toast.error(`Error al hacer la solititud ${error}`, { id })
    return error
  }
}

export const subircloudinary = async ({ archivo }: Fotos) => {
  const id = toast.loading('subiendo fotos')
  try {
    const datos = new FormData()
    datos.append('file', archivo)
    datos.append('upload_preset', 'proyecto_techsells')
    // datos.append('public_id', nombre_producto)

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/rebelion/auto/upload',
      datos
    )
    toast.success('imagen cargada', { id })
    return { public_id: res.data.public_id, url: res.data.secure_url } as Foto
  } catch (error) {
    toast.error('error al cargar imangenes', { id })
    return error
  }
}

export const crear_producto = async (producto: producto) => {
  const id = toast.loading('creando producto')
  try {
    await axiosbackend.post('/p/crear_producto', producto)
    toast.success('producto creado exitosamente', { id })
  } catch (error) {
    toast.error('error al crear producto', { id })
    return error
  }
}

export const crear_categoria = async (nombre: string) => {
  const id = toast.loading('creando nuevo categoria')
  try {
    await axiosbackend.post('/p/crear_categoria', { nombre })
    toast.success('categoria creado exitosamente', { id })
  } catch (error) {
    toast.error('error al crear categoria', { id })
    return error
  }
}

export const borrar_categoria = async (idcategoria: string) => {
  const id = toast.loading('borrando categoria')
  try {
    await axiosbackend.delete(`/p/crear_categoria/:${idcategoria}`)
    toast.success('categoria borrada exitosamente', { id })
  } catch (error) {
    toast.error('error al borrar categoria', { id })
    return error
  }
}

export const categorias = async () => {
  const id = toast.loading('cargando categorias')
  try {
    const res = await axiosbackend.get('/p/categorias')
    toast.dismiss(id)
    return res.data
  } catch (error) {
    toast.error('error al cargar categorias', { id })
    return error
  }
}
