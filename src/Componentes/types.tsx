export type notificacionesprops = {
  id: string
  titulo: string
  descripcion: string
  fecha_creacion: string
  visto: boolean
  borrar: (id: string) => void
}
export type activador = {
  activar: () => void
  cantidad: string
}
export type productoprops = {
  id: string
  nombre: string
  precio: number
  imagen: string
}
export type Usuario = {
  id: string
  nombre: string
  apellido: string
  foto_perfil: string
  rol: string
  administrador: boolean
  baneado: boolean
}

export type Foto = {
  public_id: string
  url: string
}

export type Fotos = {
  // nombre_producto: string
  archivo: File
}

export type producto = {
  nombre: string
  precio: number
  estado: string
  descripcion: string
  stock: number
  fotos: Foto[]
  categorias: tcategorias[]
}

export type tcategorias = {
  id: string
  nombre: string
}
