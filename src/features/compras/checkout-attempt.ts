import { CanceledError } from 'axios'

const STORAGE_KEY = 'techsells.checkout.v1'
// APIGeneral keeps attempts/reservations for 35 minutes.
const ATTEMPT_TTL = 35 * 60 * 1000
type Attempt = {
  session: string | null
  fingerprint: string
  key: string
  expires: number
}
let attempts: Attempt[] = []
let storageAvailable = true

function read(): Attempt[] {
  if (!storageAvailable) return attempts.filter((item) => item.expires > Date.now())
  try {
    const saved: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]')
    if (Array.isArray(saved))
      attempts = saved.filter(
        (item): item is Attempt =>
          !!item &&
          typeof item === 'object' &&
          (item.session === null || typeof item.session === 'string') &&
          typeof item.fingerprint === 'string' &&
          typeof item.key === 'string' &&
          typeof item.expires === 'number' &&
          item.expires > Date.now()
      )
  } catch {
    storageAvailable = false
    /* Memory fallback when storage is unavailable. */
  }
  return attempts.filter((item) => item.expires > Date.now())
}
function write(value: Attempt[]) {
  attempts = value
  if (!storageAvailable) return
  try {
    if (value.length) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    storageAvailable = false
    /* The current page can still retry safely. */
  }
}
export function reconcileCheckoutSession(session: string | null) {
  write(session ? read().filter((item) => item.session === session) : [])
}
export async function checkoutKey(
  session: string | null,
  context: unknown,
  isActive = () => true
) {
  // Store only a digest, never the address, email or cart contents.
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(JSON.stringify(context))
  )
  const fingerprint = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0')
  ).join('')
  if (!isActive()) throw new CanceledError('La sesión cambió.')
  const saved = read().filter((item) => item.session === session)
  const previous = saved.find((item) => item.fingerprint === fingerprint)
  if (previous) return previous.key
  const key = crypto.randomUUID()
  write([...saved, { session, fingerprint, key, expires: Date.now() + ATTEMPT_TTL }])
  return key
}
export function forgetCheckoutKey(key: string) {
  write(read().filter((item) => item.key !== key))
}
