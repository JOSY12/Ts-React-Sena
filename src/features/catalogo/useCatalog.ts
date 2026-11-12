import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { productos_store } from '../../Zustand/Productos_store'
import { parseFilters } from '../../shared/utils/filters'

export function useCatalog(admin = false) {
  const [params] = useSearchParams()
  const query = params.toString()
  const load = productos_store((s) =>
    admin ? s.solicitar_productos_admin : s.solicitar_productos
  )
  useEffect(() => {
    const controller = new AbortController()
    void load(parseFilters(new URLSearchParams(query)), controller.signal)
    return () => controller.abort()
  }, [load, query])
  return () => load(parseFilters(new URLSearchParams(query)))
}
