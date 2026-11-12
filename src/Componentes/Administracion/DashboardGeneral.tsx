import { Outlet } from 'react-router-dom'
import DashboardGeneral_movil from './DashboardGeneral_movil'
import AdminNavigation from './AdminNavigation'

const DashboardGeneral = () => (
  <>
    <div className='flex bg-gray-100'>
      <aside className='min-h-screen hidden lg:block z-30 bg-gray-900'>
        <div className='flex items-center justify-center mt-8'>
          <span className='mx-2 text-2xl font-semibold text-white'>Administracion</span>
        </div>
        <AdminNavigation />
      </aside>
      <div className='flex flex-col flex-1 overflow-hidden'>
        <Outlet />
      </div>
    </div>
    <DashboardGeneral_movil />
  </>
)
export default DashboardGeneral
