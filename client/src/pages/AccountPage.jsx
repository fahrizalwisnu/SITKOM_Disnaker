import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { AccountNavigate, InputHeader, Loader } from '../components'
import { useUserContext } from '../contexts/UserContext'
import { useEffect, useState } from 'react'

function AccountPage() {
  const { setUser, setUserId } = useUserContext()
  const [profile, setProfile] = useState(null)
  const [pageReady, setPageReady] = useState(true)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    setPageReady(false)
    axios.get('/api/profile').then(({ data }) => {
      setProfile(data.data)
      setPageReady(true)
    })
  }, [])

  async function logout() {
    try {
      setPageReady(false)
      await axios.post('/api/logout')
      setRedirect(true)
      setUser(null)
      setUserId(null)
    } catch (error) {
    } finally {
      setPageReady(true)
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return pageReady ? (
    <div className="mt-24">
      <h1 className="text-xl font-bold mb-4">Profil</h1>
      <div className="flex gap-4">
        <div className='w-72 rounded-2xl'>
          <AccountNavigate />
        </div>
        <div className="flex items-start justify-between p-4 rounded-2xl w-full shadow-md">
          <div>
            <img
              src={`http://localhost:8082/uploads/${profile?.foto}`}
              className="w-32 rounded-2xl"
            />
            <InputHeader text={'Nama'} />
            <p>{profile?.nama}</p>
            <InputHeader text={'Email'} />
            <p>{profile?.email}</p>
          </div>
          <button onClick={logout} className="bg-primary text-white">
            Logout
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default AccountPage
