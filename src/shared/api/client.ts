import axios from 'axios'
import { env } from '../config/env'

export const axiosbackend = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  timeout: 20000
})

let sessionVersion = 0
let sessionId: string | null = null
let getSessionToken: (() => Promise<string | null>) | null = null

export function configureSession(
  id: string | null,
  token: () => Promise<string | null>
) {
  if (id !== sessionId) sessionVersion++
  sessionId = id
  getSessionToken = token
}

export const currentSessionVersion = () => sessionVersion
export const isCurrentSession = (version: number) => version === sessionVersion

// Registered once, before any router loader can request private data.
axiosbackend.interceptors.request.use(async (config) => {
  const version = sessionVersion
  const token = getSessionToken ? await getSessionToken() : null
  if (version !== sessionVersion) throw new axios.CanceledError('La sesión cambió.')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export function requiredId(id: string): string {
  if (!id.trim()) throw new Error('Se requiere un identificador.')
  return encodeURIComponent(id)
}
