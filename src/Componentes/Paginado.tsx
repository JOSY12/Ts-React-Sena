import { useSearchParams } from 'react-router-dom'
import { filtros_store } from '../Zustand/Filtros_store'

const Paginado = () => {
  const paginas = filtros_store((state) => state.filtros.Paginas)
  const buscar_con_filtros = filtros_store((state) => state.buscar_con_filtros)

  const [searchParams, setSearchParams] = useSearchParams()

  const submit = async (nuevaPagina: number) => {
    const nuevosParametros = new URLSearchParams(searchParams)
    nuevosParametros.set('Pagina', nuevaPagina.toString())
    setSearchParams(nuevosParametros)

    // Llamar a la función de búsqueda con la nueva página
    buscar_con_filtros({
      Nombre: searchParams.get('Nombre') ?? '',
      Maximo: searchParams.get('Maximo') ?? '',
      Minimo: searchParams.get('Minimo') ?? '',
      Categorias: searchParams.get('Categorias')?.split(',') ?? [],
      Pagina: nuevaPagina
    })
  }

  // Obtener la página actual de los parámetros de la URL
  const paginaActual = parseInt(searchParams.get('Pagina') || '1', 10)

  return (
    <div className='flex justify-center'>
      {Array.from({ length: paginas }, (_, i) => i + 1).map((pagina) => (
        <button
          key={pagina}
          disabled={pagina === paginaActual}
          className='m-1 bg-white  rounded p-2 border text-2xl disabled:opacity-50'
          onClick={() => submit(pagina)}
        >
          {pagina}
        </button>
      ))}
    </div>
  )
}

export default Paginado
