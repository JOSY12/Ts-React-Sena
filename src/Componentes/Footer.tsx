import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import logo from '../img/tech-sells-high-resolution-logo-white-transparent.png'
const Footer = () => (
  <footer className='site-footer'>
    <div className='footer-main page-width'>
      <div>
        <Link to='/' className='brand'>
          <img className='brand-logo' src={logo} alt='Techsells' />
        </Link>
        <p>Tu próximo upgrade empieza aquí.</p>
      </div>
      <nav aria-label='Navegación del pie de página'>
        <Link to='/productos'>
          Explorar productos <FiArrowUpRight aria-hidden='true' />
        </Link>
        <Link to='/u/compras'>
          Mis compras <FiArrowUpRight aria-hidden='true' />
        </Link>
        <Link to='/contacto'>
          Contacto <FiArrowUpRight aria-hidden='true' />
        </Link>
      </nav>
      <span className='footer-stamp' aria-hidden='true'>
        STAY
        <br />
        CONNECTED ↗
      </span>
    </div>
    <div className='footer-bottom page-width'>
      <span>© {new Date().getFullYear()} Techsells · Creado por Josmer Bertel</span>
      <span>HECHO PARA CONECTAR.</span>
    </div>
  </footer>
)
export default Footer
