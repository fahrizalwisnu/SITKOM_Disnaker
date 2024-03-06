import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'

import { HiMiniBars3 } from "react-icons/hi2"
import logo from './assets/logofull.png'

export default function Header() {
  const { user } = useContext(UserContext)
  const { pathname } = useLocation()
  let subpage = pathname.replace('/', '')

  if (subpage === '') subpage = 'home'

  function linkClass(type = null) {
    let className = ''
    if (type === subpage) {
      className += 'text-primary'
    } else {
      className += 'text-gray-400 hover:text-gray-600'
    }

    return className
  }

  function linkAuthActive(type = null) {
    let className =
      ' border border-gray-300 py-2 px-4 hover:shadow-md hover:bg-primary hover:text-white'
    if (type === subpage) {
      className += ' text-white bg-primary'
    } else {
      className += ' text-black'
    }

    return className
  }

  return (
    <nav className="flex fixed w-full py-4 bg-white justify-between items-center shadow px-28">
      <Link to={'/'} className="flex items-center gap-1">
        <img alt="logo" src={logo} width="120" height="40" className="" />
      </Link>
      <div className="flex gap-6 py-2 px-4">
        <Link to={'/'} className={linkClass('home')}>
          Beranda
        </Link>
        <Link to={'/training'} className={linkClass('training')}>
          Pelatihan
        </Link>
        <Link to={'/yellowcard'} className={linkClass('yellowcard')}>
          Kartu Kuning
        </Link>
        <Link to={'/complaint'} className={linkClass('complaint')}>
          Pengaduan
        </Link>
      </div>
      {!user ? (
        <div className="flex">
          <Link
            to={'/login'}
            className={'rounded-l-full border-r-0' + linkAuthActive('login')}
          >
            Masuk
          </Link>
          <Link
            to={'/register'}
            className={'rounded-r-full border-l-0' + linkAuthActive('register')}
          >
            Daftar
          </Link>
        </div>
      ) : (
        <Link to={'/account/profile'} className="border px-2 py-1 rounded-full flex gap-1 items-center">
          <HiMiniBars3 className='w-5 h-5'/>
          {user?.foto ? (
            <img
              src={`http://localhost:8082/uploads/${user.foto}`}
              alt="Foto profil"
              className="rounded-full aspect-square object-cover object-center w-8 h-8"
            />
          ) : (
            <img
              src="http://localhost:8082/uploads/profil.jpg"
              alt="Foto profil"
              className="rounded-full aspect-square object-cover object-center w-8 h-8"
            />
          )}
          <div>
            {user?.nama}
          </div>
        </Link>
      )}
    </nav>
  )
}
