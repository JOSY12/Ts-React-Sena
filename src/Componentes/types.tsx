export type notificacionesprops = {
  id: string
  titulo: string
  descripcion: string
  fecha_creacion: string
  visto: boolean
  borrar: (id: string) => void
}
