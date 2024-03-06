import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import logo from '../../assets/logofull.png'
import { useUserContext } from '../../contexts/UserContext'

export default function Header() {
  const { user, setUser, setUserId } = useUserContext()
  const [redirect, setRedirect] = useState(false)
  const { pathname } = useLocation()

  let subpage = pathname.split('/')?.[2]

  if (subpage === '') subpage = 'dashboard'

  function linkClass(type = null) {
    let className = ''
    if (type === subpage) {
      className += 'text-primary'
    } else {
      className += 'text-black'
    }

    return className
  }

  async function logout() {
    try {
      await axios.post('/api/logout')
      setUser(null)
      setUserId(null)
      setRedirect(true)
    } catch (error) {
      
    }
  }

  if (redirect) return <Navigate to={'/'} />

  return (
    <header className="flex fixed w-full py-4 bg-white justify-between items-center shadow px-28">
      <Link to={'/'} className="flex items-center gap-1">
        <img alt="logo" src={logo} width="120" height="40" className="" />
      </Link>
      <div className="flex gap-6 py-2 px-4">
        <Link to={'/dashboard'} className={linkClass('dashboard')}>
          Dashboard
        </Link>
        <Link to={'/dashboard/training'} className={linkClass('training')}>
          Pelatihan
        </Link>
        <Link to={'/dashboard/yellowcard'} className={linkClass('yelllowcard')}>
          Kartu Kuning
        </Link>
        <Link to={'/dashboard/complaint'} className={linkClass('complaint')}>
          Pengaduan
        </Link>
        <Link to={'/dashboard/trainers'} className={linkClass('trainers')}>
          Trainer
        </Link>
      </div>
      {!user ? (
        <div className="flex">
          <Link
            to={'/login'}
            className="border border-gray-300 py-2 px-4 rounded-l-full hover:shadow-md hover:bg-primary hover:text-white"
          >
            Masuk
          </Link>
          <Link
            to={'/register'}
            className="border border-gray-300 py-2 px-4 rounded-r-full hover:shadow-md hover:bg-primary hover:text-white"
          >
            Daftar
          </Link>
        </div>
      ) : (
        <div>
          {user?.nama}
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </header>
  )
}
