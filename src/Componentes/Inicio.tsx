import { useState } from 'react'
import { FiSliders } from 'react-icons/fi'
import Filtros from './Filtros'
import Productos from './Productos'
const Inicio = () => {
  const [filtersOpen, setFiltersOpen] = useState(false)
  return (
    <section className='catalog-page page-width'>
      <div className='catalog-heading'>
        <div>
          <p className='eyebrow'>ELIGE TU SIGUIENTE NIVEL</p>
          <h1>El upgrade que buscas.</h1>
          <p>Encuentra lo que conecta contigo.</p>
        </div>
        <span className='catalog-symbol' aria-hidden='true'>
          ↗
        </span>
      </div>
      <button
        className='button button-lime filter-toggle'
        aria-expanded={filtersOpen}
        aria-controls='catalog-filters'
        onClick={() => setFiltersOpen(!filtersOpen)}
      >
        <FiSliders aria-hidden='true' />
        {filtersOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
      </button>
      <div className='catalog-layout'>
        <aside
          id='catalog-filters'
          className={`catalog-sidebar ${filtersOpen ? 'is-open' : ''}`}
          aria-label='Filtros del catálogo'
        >
          <Filtros />
        </aside>
        <div className='catalog-results'>
          <Productos />
        </div>
      </div>
    </section>
  )
}
export default Inicio
