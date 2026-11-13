import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowDown,
  FiArrowUpRight,
  FiCpu,
  FiHeadphones,
  FiMonitor,
  FiSmartphone,
  FiZap
} from 'react-icons/fi'
import RequestState from '../shared/ui/RequestState'
import ProductImage from '../shared/ui/ProductImage'
import { productos_store } from '../Zustand/Productos_store'
import Producto_landing from './Producto_landing'

const categories = [
  {
    name: 'Computadoras',
    caption: 'Más potencia. Más posibilidades.',
    icon: FiMonitor,
    color: 'lime'
  },
  {
    name: 'Telefonos',
    label: 'Teléfonos',
    caption: 'Tu mundo, siempre a mano.',
    icon: FiSmartphone,
    color: 'purple'
  },
  {
    name: 'Accesorios',
    caption: 'Los detalles hacen el setup.',
    icon: FiHeadphones,
    color: 'orange'
  }
]
const Landing_page = () => {
  const data = productos_store((state) => state.lading_page_datos)
  const load = productos_store((state) => state.lading_page_solicitar)
  const status = productos_store((state) => state.landingStatus)
  const error = productos_store((state) => state.landingError)
  const featured = data.Valorados[0] ?? data.Recientes[0]
  useEffect(() => {
    void load()
  }, [load])
  return (
    <div className='home-page'>
      <section className='hero page-width'>
        <div className='hero-copy'>
          <p className='eyebrow'>
            <span className='status-dot' /> TU SIGUIENTE NIVEL, AQUÍ.
          </p>
          <h1>
            Tecnología
            <br />
            con <span>actitud.</span>
            <FiArrowUpRight className='hero-arrow' aria-hidden='true' />
          </h1>
          <p className='hero-description'>
            Dale más potencia a tus ideas. Encuentra computadoras, teléfonos y
            accesorios para hacer tuyo cada día.
          </p>
          <div className='hero-actions'>
            <Link className='button button-lime' to='/productos'>
              Explorar productos <FiArrowUpRight aria-hidden='true' />
            </Link>
            <a className='text-link' href='#explorar'>
              Encuentra tu categoría <FiArrowDown aria-hidden='true' />
            </a>
          </div>
          <div className='hero-footnote'>
            <FiCpu aria-hidden='true' />
            <span>PARA CREAR. PARA JUGAR. PARA TI.</span>
          </div>
        </div>
        <div className='hero-art'>
          <div className='hero-grid' aria-hidden='true' />
          <span className='hero-sticker' aria-hidden='true'>
            DALE UN
            <br />
            UPGRADE ↗
          </span>
          <div className='featured-device'>
            <div className='device-toolbar'>
              <span />
              <span />
              <span />
              <span className='device-label'>TECHSELLS / SELECCIÓN</span>
            </div>
            <Link
              to={featured ? `/productos/${featured.id}` : '/productos'}
              className='featured-content'
            >
              {featured ? (
                <ProductImage src={featured.imagen} alt={featured.nombre} />
              ) : (
                <FiMonitor className='hero-placeholder' aria-hidden='true' />
              )}
              <div className='featured-caption'>
                <span>{featured?.nombre ?? 'Descubre tu próximo equipo'}</span>
                <FiArrowUpRight aria-hidden='true' />
              </div>
            </Link>
          </div>
          <span className='hero-spark' aria-hidden='true'>
            ✳
          </span>
          <span className='hero-code' aria-hidden='true'>
            [ CONNECT YOUR NEXT ]
          </span>
        </div>
      </section>
      <div className='ticker' aria-hidden='true'>
        <span>MENOS LÍMITES</span>
        <FiZap />
        <span>MÁS POSIBILIDADES</span>
        <FiZap />
        <span>ACTUALIZA TU MUNDO</span>
        <FiZap />
        <span>TECHSELLS</span>
        <FiZap />
      </div>
      <section id='explorar' className='category-section page-width'>
        <div className='section-heading'>
          <div>
            <p className='eyebrow'>01 / ENCUENTRA LO TUYO</p>
            <h2>¿Cuál es tu próximo upgrade?</h2>
          </div>
          <Link className='text-link' to='/productos'>
            Ver todo <FiArrowUpRight aria-hidden='true' />
          </Link>
        </div>
        <div className='category-grid'>
          {categories.map(({ name, label, caption, icon: Icon, color }, index) => (
            <Link
              to={`/productos?Categorias=${encodeURIComponent(name)}`}
              key={name}
              className={`category-card category-${color}`}
            >
              <div className='category-top'>
                <span className='eyebrow'>/ 0{index + 1}</span>
                <FiArrowUpRight aria-hidden='true' />
              </div>
              <Icon className='category-icon' aria-hidden='true' />
              <div>
                <h3>{label ?? name}</h3>
                <p>{caption}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <div className='page-width landing-products'>
        <RequestState status={status} error={error} retry={load} />
        {data.Valorados.length > 0 && (
          <section>
            <div className='section-heading'>
              <div>
                <p className='eyebrow'>02 / LOS FAVORITOS</p>
                <h2>Se ganaron las estrellas.</h2>
              </div>
              <Link className='text-link' to='/productos'>
                Explorar catálogo <FiArrowUpRight aria-hidden='true' />
              </Link>
            </div>
            <div className='product-grid'>
              {data.Valorados.map((product) => (
                <Producto_landing key={product.id} producto={product} />
              ))}
            </div>
          </section>
        )}
        {data.Recientes.length > 0 && (
          <section>
            <div className='section-heading'>
              <div>
                <p className='eyebrow'>03 / RECIÉN LLEGADOS</p>
                <h2>Lo nuevo pide pista.</h2>
              </div>
            </div>
            <div className='product-grid'>
              {data.Recientes.map((product) => (
                <Producto_landing key={product.id} producto={product} />
              ))}
            </div>
          </section>
        )}
      </div>
      <section className='upgrade-banner page-width'>
        <div>
          <p className='eyebrow'>TU SETUP. TUS REGLAS.</p>
          <h2>
            Haz espacio para
            <br />
            tu próxima gran idea.
          </h2>
        </div>
        <Link className='button button-light' to='/productos'>
          Encuentra tu equipo <FiArrowUpRight aria-hidden='true' />
        </Link>
      </section>
    </div>
  )
}
export default Landing_page
