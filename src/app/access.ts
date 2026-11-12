import { redirect } from 'react-router-dom'
import { sessionAccess } from '../shared/api/session'

export function requireAccess(admin = false) {
  const session = sessionAccess()
  if (!session.userId) throw redirect('/iniciarsesion')
  if (admin && !session.admin) throw new Response('Acceso restringido', { status: 403 })
}
