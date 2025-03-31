import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Pages/Navbar'
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Layout
