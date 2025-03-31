import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-auto  place-content-between justify-end mr-6'>
      <Link to={'/productos'} className='text-blue-600 text-2xl'>
        Perfil
      </Link>
      <Link to={'/productos/:id'} className='text-blue-600 text-2xl'>
        Perfil
      </Link>
      <Link to={'/perfil'} className='text-blue-600 text-2xl'>
        Perfil
      </Link>
      <Link to={'/acercade'} className='text-blue-600 text-2xl'>
        Perfil
      </Link>
    </div>
  )
}

export default Navbar
