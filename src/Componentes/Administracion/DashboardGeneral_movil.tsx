import { useState } from 'react'
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import AdminNavigation from './AdminNavigation'

const DashboardGeneral_movil = () => {
  const [hidden, setHidden] = useState(false)
  return (
    <div className='lg:hidden'>
      <button
        type='button'
        aria-label='Mostrar u ocultar menú administrativo'
        aria-expanded={!hidden}
        onClick={() => setHidden((value) => !value)}
        className={`justify-center w-full cursor-pointer ${hidden ? 'bottom-0' : 'bottom-10'} flex fixed z-20`}
      >
        {hidden ? <AiOutlineCaretUp size={30} /> : <AiOutlineCaretDown size={30} />}
      </button>
      {!hidden && (
        <div className='relative z-20'>
          <AdminNavigation mobile />
        </div>
      )}
    </div>
  )
}
export default DashboardGeneral_movil
