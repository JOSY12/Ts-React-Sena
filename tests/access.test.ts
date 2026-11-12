import { describe, expect, it } from 'vitest'
import { requireAccess } from '../src/app/access'
import { syncSession } from '../src/shared/api/session'

function rejection(admin = false): Response {
  try {
    requireAccess(admin)
  } catch (error) {
    return error as Response
  }
  throw new Error('Se esperaba rechazar el acceso')
}

describe('permisos de loaders antes de consultar la API', () => {
  it('redirige al visitante al login', () => {
    syncSession(null, async () => null)
    const response = rejection()
    expect(response.status).toBe(302)
    expect(response.headers.get('Location')).toBe('/iniciarsesion')
  })
  it('rechaza al comprador en loaders administrativos y conserva sus rutas privadas', () => {
    syncSession('buyer-session', async () => 'token', 'buyer', false)
    expect(() => requireAccess()).not.toThrow()
    expect(rejection(true).status).toBe(403)
  })
  it('admite al administrador preparado por Clerk', () => {
    syncSession('admin-session', async () => 'token', 'admin', true)
    expect(() => requireAccess(true)).not.toThrow()
  })
})
