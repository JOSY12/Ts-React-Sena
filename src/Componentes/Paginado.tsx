import { useSearchParams } from 'react-router-dom'
import { filtros_store } from '../Zustand/Filtros_store'
import { useState } from 'react'

const Paginado = () => {
  const paginas = filtros_store((state) => state.filtros.Paginas)
  const buscar_con_filtros = filtros_store((state) => state.buscar_con_filtros)
  const buscar_con_filtros_admin = filtros_store(
    (state) => state.buscar_con_filtros_admin
  )
  const [admin] = useState({
    admin: window.location.pathname.includes('admin') ? true : false
  })
  const [searchParams, setSearchParams] = useSearchParams()

  const submit = async (nuevaPagina: number) => {
    const nuevosParametros = new URLSearchParams(searchParams)
    nuevosParametros.set('Pagina', nuevaPagina.toString())
    setSearchParams(nuevosParametros)

    if (admin.admin) {
      buscar_con_filtros_admin({
        Nombre: searchParams.get('Nombre') ?? '',
        Maximo: searchParams.get('Maximo') ?? '',
        Minimo: searchParams.get('Minimo') ?? '',
        Categorias: searchParams.get('Categorias')?.split(',') ?? [],
        Pagina: nuevaPagina
      })
    } else {
      buscar_con_filtros({
        Nombre: searchParams.get('Nombre') ?? '',
        Maximo: searchParams.get('Maximo') ?? '',
        Minimo: searchParams.get('Minimo') ?? '',
        Categorias: searchParams.get('Categorias')?.split(',') ?? [],
        Pagina: nuevaPagina
      })
    }
  }

  // Obtener la página actual de los parámetros de la URL
  const paginaActual = parseInt(searchParams.get('Pagina') || '1', 10)

  return (
    <div className='flex flex-col items-center'>
      <div className='flex items-center gap-1'>
        {Array.from({ length: paginas }, (_, i) => i + 1).map((pagina) => (
          <button
            key={pagina}
            disabled={pagina === paginaActual}
            className=' m-2 inline-grid place-items-center border align-middle select-none disabled:border-blue-500 disabled:text-blue-600 enabled:border-green-600   selec font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[38px] min-h-[38px] rounded-md bg-transparent   text-black hover:bg-stone-800/5  hover:border-stone-800/5 shadow-none hover:shadow-none'
            onClick={() => submit(pagina)}
          >
            {pagina}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Paginado
