import type { misfiltros } from '../../Componentes/types'

export type ProductFilters = Omit<misfiltros, 'Paginas'>

export function parseFilters(params: URLSearchParams): ProductFilters {
  const number = (name: string) => {
    const value = params.get(name)?.trim() ?? ''
    return value && Number.isFinite(Number(value)) && Number(value) >= 0 ? value : ''
  }
  let Minimo = number('Minimo')
  let Maximo = number('Maximo')
  if (Minimo && Maximo && Number(Minimo) > Number(Maximo))
    [Minimo, Maximo] = [Maximo, Minimo]
  const page = Number(params.get('Pagina') || 1)
  return {
    Nombre: params.get('Nombre')?.trim() ?? '',
    Categorias: [
      ...new Set(
        (params.get('Categorias') ?? params.get('Categoria') ?? '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      )
    ],
    Minimo,
    Maximo,
    Pagina: Number.isSafeInteger(page) && page > 0 && page <= 10000 ? page : 1
  }
}

export function serializeFilters(filters: ProductFilters): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.Nombre.trim()) params.set('Nombre', filters.Nombre.trim())
  if (filters.Categorias.length) params.set('Categorias', filters.Categorias.join(','))
  if (filters.Minimo !== '') params.set('Minimo', filters.Minimo)
  if (filters.Maximo !== '') params.set('Maximo', filters.Maximo)
  params.set('Pagina', String(filters.Pagina))
  return params
}
