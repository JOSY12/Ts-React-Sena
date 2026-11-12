import axios from 'axios'
import { ApiError } from '../../shared/api/errors'
import { notify } from '../../shared/api/notifications'
import { env } from '../../shared/config/env'
import type { Foto, Fotos } from '../../Componentes/types'

export const MAX_PHOTOS = 4
export const MAX_PHOTO_BYTES = 10 * 1024 * 1024
export const subircloudinary = ({ archivo }: Fotos): Promise<Foto> =>
  notify(
    async () => {
      if (!['image/png', 'image/jpeg', 'image/webp'].includes(archivo.type))
        throw new ApiError('Selecciona una imagen PNG, JPEG o WebP.')
      if (archivo.size > MAX_PHOTO_BYTES)
        throw new ApiError('La imagen debe pesar como máximo 10 MB.')
      const datos = new FormData()
      datos.append('file', archivo)
      datos.append('upload_preset', env.uploadPreset)
      const { data } = await axios.post<{ public_id?: string; secure_url?: string }>(
        `https://api.cloudinary.com/v1_1/${encodeURIComponent(env.cloudName)}/auto/upload`,
        datos,
        { timeout: 60000 }
      )
      if (!data.public_id || !data.secure_url)
        throw new ApiError('No se pudo validar la imagen cargada.')
      return { public_id: data.public_id, url: data.secure_url }
    },
    'Subiendo imagen',
    'Imagen cargada'
  )
