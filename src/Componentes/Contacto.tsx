import { FiArrowUpRight } from 'react-icons/fi'
const Contacto = () => (
  <section className='contact-page page-width'>
    <div className='contact-card'>
      <div className='contact-avatar' aria-hidden='true'>
        JB↗
      </div>
      <div className='contact-copy'>
        <p className='eyebrow'>DETRÁS DE TECHSELLS</p>
        <h1>Josmer Bertel Calle</h1>
        <p>
          Programador web fullstack. Me apasiona crear experiencias digitales, aprender
          nuevas tecnologías y colaborar en proyectos desafiantes.
        </p>
        <div className='contact-links'>
          <a className='text-link' href='mailto:josmer1997@hotmail.es'>
            Enviar correo <FiArrowUpRight aria-hidden='true' />
          </a>
          <a
            className='text-link'
            href='https://www.linkedin.com/in/josmer-bertel-calle-12569a236/'
            target='_blank'
            rel='noreferrer'
          >
            LinkedIn <FiArrowUpRight aria-hidden='true' />
          </a>
          <a
            className='text-link'
            href='https://github.com/JOSY12'
            target='_blank'
            rel='noreferrer'
          >
            GitHub <FiArrowUpRight aria-hidden='true' />
          </a>
        </div>
      </div>
    </div>
  </section>
)
export default Contacto
