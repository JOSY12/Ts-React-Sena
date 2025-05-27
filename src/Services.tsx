import axios from 'axios'
import { toast } from 'sonner'
import { comentario, Foto, Fotos, producto } from './Componentes/types'
const URL = import.meta.env.VITE_AXIOS_BASE_URL
export const axiosbackend = axios.create({
  baseURL: URL,
  withCredentials: true
})

export const todo_productos = async (filtros: any) => {
  const id = toast.loading('cargando productos')
  try {
    const res = await axiosbackend.get('/pu/productos', { params: filtros })
    // []Comprobar si hacer categorias: filtros.categoias funciona en backend
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

export const lading_page = async () => {
  const id = toast.loading('cargando productos')
  try {
    const res = await axiosbackend.get('/pu/inicio_landing_page')
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

export const detalle_producto = async (pid: string) => {
  const id = toast.loading('cargando productos')
  try {
    const res = await axiosbackend.get(`/pu/productos/${pid}`)
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

export const detalle_producto_editar = async (idproducto: string) => {
  const id = toast.loading('cargando productos')
  try {
    const res = await axiosbackend.get(
      `/p/detalle_producto_editar/${idproducto}`
    )
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

export const comentarios_productos = async (idproducto: string) => {
  const id = toast.loading('cargando productos')
  try {
    const res = await axiosbackend.get(`/pu/comentarios/${idproducto}`)
    toast.dismiss(id)
    return res.data.comentarios
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

export const crear_comentario = async (comentario: comentario) => {
  const id = toast.loading('creando comentario')
  try {
    await axiosbackend.post(`/p/crear_comentario`, comentario)
    toast.success('comentario hecho exitosamente', { id })
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(`error al crear comentario ${error.response.data} `, { id })
      return error.response?.data
    }
    toast.error(`error al crear comentario ${error} `, {
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
    return res.data
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

// export const actualizar_notificaciones = async () => {
//   const id = toast.loading('cargando')
//   try {
//     // setea todo las de un usuario como leidas
//     await axiosbackend.put('/u/notificaciones')
//     toast.success('Peticion exitosa', { id })
//   } catch (error) {
//     toast.error(`Error al hacer la solititud ${error}`, { id })
//     return error
//   }
// }

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

// export const contador_notificaciones = async () => {
//   try {
//     const res = await axiosbackend.get(`/u/contador_notificaciones`)
//     return res.data
//   } catch (error) {
//     return error
//   }
// }

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
// CATEGORIAS
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
    await axiosbackend.delete(`/p/borrar_categoria/:${idcategoria}`)
    toast.success('categoria borrada exitosamente', { id })
  } catch (error) {
    toast.error('error al borrar categoria', { id })
    return error
  }
}

export const categorias = async () => {
  const id = toast.loading('cargando categorias')
  try {
    const res = await axiosbackend.get('/pu/categorias')
    toast.dismiss(id)
    return res.data
  } catch (error) {
    toast.error('error al cargar categorias', { id })
    return error
  }
}
// FAVORITOS
export const favoritos = async () => {
  const id = toast.loading('cargando favoritos')
  try {
    const res = await axiosbackend.get('/u/favoritos')
    toast.dismiss(id)
    return res.data.rows
  } catch (error) {
    toast.error('error al cargar favoritos', { id })
    return error
  }
}

export const agregar_favorito = async (idfavorito: string) => {
  const id = toast.loading('agreando favoritos')
  try {
    await axiosbackend.post(`/u/agregar_favorito`, { idfavorito })
    toast.dismiss(id)
  } catch (error) {
    toast.error('error al agregar favoritos', { id })
    return error
  }
}

export const quitar_favorito = async (idp: string) => {
  const id = toast.loading('quitando favoritos')
  try {
    await axiosbackend.delete(`/u/quitar_favorito/${idp}`)
    toast.dismiss(id)
  } catch (error) {
    toast.error('error al quitar favoritos', { id })
    return error
  }
}

// CARRITO
export const carrito = async () => {
  const id = toast.loading('cargando carrito')
  try {
    const res = await axiosbackend.get('/u/carrito')
    toast.dismiss(id)

    return res.data.rows
  } catch (error) {
    toast.error('error al cargar carrito', { id })
    return error
  }
}

export const agregar_carrito = async (idproducto: string) => {
  const id = toast.loading('agreando a carrito')
  try {
    await axiosbackend.post('/u/agregar_carrito', { idproducto })
    toast.dismiss(id)
  } catch (error) {
    toast.error('error al agregar a carrito', { id })
    return error
  }
}

export const quitar_carrito = async (idproducto: string) => {
  const id = toast.loading('quitando carrito')
  try {
    await axiosbackend.delete(`/u/quitar_carrito/${idproducto}`)
    toast.dismiss(id)
  } catch (error) {
    toast.error('error al quitar carrito', { id })
    return error
  }
}

export const cambiar_cantidad = async (
  idproducto: string,
  cantidad: number
) => {
  const id = toast.loading('cambiando cantidad a carrito')
  try {
    await axiosbackend.put('/u/carrito_cantidad', { idproducto, cantidad })
    toast.dismiss(id)
  } catch (error) {
    toast.error('error al agregar a carrito', { id })
    return error
  }
}

export const actualizar_producto = async (idp: string, producto: producto) => {
  const id = toast.loading('actualizando producto')
  try {
    await axiosbackend.put(`/p/productos/${idp}`, producto)
    toast.success('producto actualizado exitosamente', { id })
  } catch (error) {
    toast.error('error al actualizar producto', { id })
    return error
  }
}

export const testproducto = async () => {
  const id = toast.loading('actualizando producto')
  try {
    // const res = await axios.get(
    //   `https://dummyjson.com/products/category/mobile-accessories`
    // )
    toast.success('producto actualizado exitosamente', { id })
    // for (let e of res.data.products) {
    //   const producto = {
    //     nombre: e.title,
    //     descripcion: e.description,
    //     precio: Math.ceil(e.price),
    //     stock: e.stock > 0 ? e.stock : 10,
    //     estado: 'Disponible',
    //     categorias: [{ id: '1e2eb3d6-fa6a-4479-be5e-7b3176dbcecc' }],
    //     fotos:
    //       e.images &&
    //       (e.images.map((url: string) => ({
    //         url: url,
    //         public_id: url.split('/').pop()?.split('.')[0] || ''
    //       })) as Foto[])
    //   }
    //   console.log(producto)
    //   // await axiosbackend.post('/p/crear_producto', producto)
    // }
  } catch (error) {
    toast.error('error al actualizar producto', { id })
    return error
  }
}
