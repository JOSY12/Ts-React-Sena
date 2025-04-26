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
