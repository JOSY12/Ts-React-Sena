import { useLayoutEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useAuth, useUser } from '@clerk/clerk-react'
import { createAppRouter } from './router'
import { syncSession } from '../shared/api/session'
import Cargando from '../Componentes/Cargando'

function ApplicationRouter() {
  const [router, setRouter] = useState<ReturnType<typeof createAppRouter> | null>(null)
  useLayoutEffect(() => {
    const instance = createAppRouter()
    setRouter(instance)
    return () => instance.dispose()
  }, [])
  return router ? <RouterProvider router={router} /> : <Cargando />
}

export default function SessionBoundary() {
  const { isLoaded, sessionId, userId, getToken } = useAuth()
  const { isLoaded: userLoaded, user } = useUser()
  const admin = user?.publicMetadata.administrador === true
  const key = isLoaded && userLoaded ? `${sessionId ?? 'guest'}:${admin}` : null
  const [configured, setConfigured] = useState<string | null>(null)
  useLayoutEffect(() => {
    if (!key) return
    syncSession(sessionId ?? null, getToken, userId ?? null, admin)
    setConfigured(key)
  }, [key, sessionId, userId, getToken, admin])
  if (!key || configured !== key) return <Cargando />
  return <ApplicationRouter key={key} />
}
