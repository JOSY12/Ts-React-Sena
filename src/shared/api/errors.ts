import axios from 'axios'

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export function errorStatus(error: unknown): number {
  if (error instanceof ApiError) return error.status ?? 500
  return axios.isAxiosError(error) ? (error.response?.status ?? 503) : 500
}

export function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message
  if (axios.isAxiosError(error)) {
    if (!error.response)
      return 'No se pudo conectar con el servidor. Intenta nuevamente.'
    if (error.response.status === 401) return 'Inicia sesión para continuar.'
    if (error.response.status === 403)
      return 'No tienes permisos para realizar esta acción.'
    if (error.response.status === 404) return 'No se encontró el recurso solicitado.'
    if (error.response.status === 429)
      return 'Has realizado muchas solicitudes. Espera un momento y vuelve a intentar.'
    if (error.response.status >= 500)
      return 'El servidor no pudo completar la solicitud.'
    const data: unknown = error.response.data
    if (typeof data === 'string' && data.length < 200 && !data.includes('<'))
      return data
    if (
      data &&
      typeof data === 'object' &&
      'message' in data &&
      typeof data.message === 'string'
    ) {
      return data.message.slice(0, 200)
    }
    // Existing APIGeneral contract, plus the structured form proposed in its report.
    if (data && typeof data === 'object' && 'error' in data) {
      if (typeof data.error === 'string' && !data.error.includes('<'))
        return data.error.slice(0, 200)
      if (
        data.error &&
        typeof data.error === 'object' &&
        'message' in data.error &&
        typeof data.error.message === 'string'
      )
        return data.error.message.slice(0, 200)
    }
  }
  return 'No se pudo completar la operación. Intenta nuevamente.'
}
