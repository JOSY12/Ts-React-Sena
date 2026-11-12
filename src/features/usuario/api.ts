import { axiosbackend, requiredId } from '../../shared/api/client'
import { array, record } from '../../shared/api/contracts'
import { ApiError } from '../../shared/api/errors'
import { notify } from '../../shared/api/notifications'
import type {
  administracion,
  direccion,
  favorito,
  notificacionesprops
} from '../../Componentes/types'

export const todos_usuarios = async (): Promise<administracion> => {
  const data = record((await axiosbackend.get('/u/usuarios')).data)
  const summary = Array.isArray(data.datos) ? data.datos[0] : data.datos
  return {
    usuarios: array(data.usuarios),
    datos: record(summary) as administracion['datos'],
    compras: array(data.compras)
  }
}
export const obtener_direcciones = async () =>
  array<direccion>((await axiosbackend.get('/u/direcciones')).data)
export const agregar_direccion = (datos: direccion) =>
  notify(
    async () => {
      const {
        nombre_comprador,
        ciudad,
        direccion,
        nota,
        codigo_postal,
        telefono,
        predeterminada
      } = datos
      const response = await axiosbackend.post('/u/agregar_direccion', {
        nombre_comprador,
        ciudad,
        direccion,
        nota,
        codigo_postal,
        telefono,
        predeterminada: predeterminada || false
      })
      if (response.data === 'ya existe')
        throw new ApiError('Ya existe una dirección con ese teléfono.')
    },
    'Guardando dirección',
    'Dirección guardada correctamente'
  )
export const eliminar_direccion = (id: string) =>
  notify(
    async () => {
      await axiosbackend.delete(`/u/eliminar_direccion/${requiredId(id)}`)
    },
    'Eliminando dirección',
    'Dirección eliminada'
  )
export const actualizar_direccion_predeterminada = (id_direccion: string) =>
  notify(
    async () => {
      await axiosbackend.put('/u/predeterminar_direccion', { id_direccion })
    },
    'Actualizando dirección',
    'Dirección predeterminada actualizada'
  )

export const favoritos = async () =>
  array<favorito>(record((await axiosbackend.get('/u/favoritos')).data).rows)
export const agregar_favorito = (idfavorito: string) =>
  notify(async () => {
    await axiosbackend.post('/u/agregar_favorito', { idfavorito })
  }, 'Agregando favorito')
export const quitar_favorito = (id: string) =>
  notify(async () => {
    await axiosbackend.delete(`/u/quitar_favorito/${requiredId(id)}`)
  }, 'Quitando favorito')

export const usuario_notificaciones = async () =>
  array<notificacionesprops>((await axiosbackend.get('/u/notificaciones')).data)
export const borrar_notificaciones = (id: string) =>
  notify(
    async () => {
      await axiosbackend.delete(`/u/notificaciones/${requiredId(id)}`)
    },
    'Eliminando notificación',
    'Notificación eliminada'
  )
export const borrar_todas_notificaciones = () =>
  notify(
    async () => {
      await axiosbackend.delete('/u/borrar_todas_notificaciones')
    },
    'Eliminando notificaciones',
    'Notificaciones eliminadas'
  )
export const marcar_visto = async () => {
  await axiosbackend.put('/u/marcar_visto')
}
