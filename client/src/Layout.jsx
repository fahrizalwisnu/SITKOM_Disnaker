import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <Header />
      <div className="mx-auto lg:px-28 flex flex-col min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
