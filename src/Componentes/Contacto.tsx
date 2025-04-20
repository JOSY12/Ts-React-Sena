const Contacto = () => {
  return (
    <div className='bg-gray-100 h-screen pt-20   '>
      <div className='max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5'>
        <img
          className='w-32 h-32 rounded-full mx-auto'
          src='https://picsum.photos/200'
          alt='Profile picture'
        ></img>
        <h2 className='text-center text-2xl font-semibold mt-3'>
          Josmer bertel calle
        </h2>
        <p className='text-center text-gray-600 mt-1'>
          Programador web fullstack
        </p>
        <div className='flex justify-center mt-5'>
          <a
            className='text-blue-500 hover:text-blue-700'
            href='mailto:josmer1997@hotmail.es'
          >
            Enviar correo
          </a>

          <a href='#' className='text-blue-500 hover:text-blue-700 mx-3'>
            Twitter
          </a>
          <a href='#' className='text-blue-500 hover:text-blue-700 mx-3'>
            LinkedIn
          </a>
          <a href='#' className='text-blue-500 hover:text-blue-700 mx-3'>
            GitHub
          </a>
        </div>
        <div className='mt-5'>
          <h3 className='text-xl font-semibold'>Bio</h3>
          <p className='text-gray-600 mt-2'>
            Programador web fullstack con experiencia en el desarrollo de
            aplicaciones web utilizando tecnologías como React, Node.js y
            MongoDB. Apasionado por aprender nuevas tecnologías y mejorar mis
            habilidades de programación. Me gusta trabajar en equipo y colaborar
            en proyectos desafiantes.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contacto
