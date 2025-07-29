export type notificacionesprops = {
  id: string
  icono: string
  titulo: string
  descripcion: string
  fecha_creacion: string
  visto: boolean
  fecha_relativa: string
}
export type activador = {
  activar: () => void
}
export type productoprops = {
  id: string
  nombre: string
  precio: number
  imagen: string
  estado: string
  categorias: string[]
  calificacion: string
  nuevo?: boolean
}
export type direccion = {
  id?: string | null
  nombre_comprador: string
  ciudad: string
  direccion: string
  nota: string
  codigo_postal: string
  telefono: string
  predeterminada: boolean
}
export type landing = {
  Recientes: productoprops[]
  Valorados: productoprops[]
}
export type modalprops = {
  texto: string
  activo: boolean
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
  icono: React.ReactNode
}
export type favorito = {
  id: string
  nombre?: string
  precio?: number
  imagen?: string
  estado?: string
}

export type item_carrito = {
  id: string
  nombre?: String | null
  precio?: number | null
  imagen?: string | null
  estado?: string | 'Disponible' | 'Agotado' | 'Pendiente'
  stock?: number | 1
  cantidad: number
}

export type compras_hechas = {
  sesion_id_compra: string
  estado: string
  fecha_compra: string
  momento_compra: string
  direccion_compra: string
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

export type datos = {
  compras: number
  productos: number
  usuarios: number
}
export type administracion = {
  usuarios: Usuario[]
  datos: datos
}

export type Foto = {
  public_id: string
  url: string
}

export type Fotos = {
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
  nuevo?: boolean
}

export type tcategorias = {
  id: string
  nombre: string
}
export type comentarios_producto = {
  calificacion: number
  comentario: string
  foto_perfil: string
  nombre: string
  producto_id: string
  titulo: string
  fecha_comentario: string
}

export type comentario = {
  calificacion: number
  comentario: string
  producto_id: string | null
  titulo: string
}

export type misfiltros = {
  Nombre: string
  Categorias: string[]
  Minimo: string
  Maximo: string
  Paginas: number
  Pagina: number
}
