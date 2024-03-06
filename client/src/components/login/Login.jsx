import axios from 'axios'
import { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [redirect, setRedirect] = useState(false)
  const { user, setUser } = useContext(UserContext)

  if (user) {
    return <Navigate to={'/'} />
  }

  async function handleLoginSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/login', { email, password })

      setUser(data.data)
      setRedirect(true)
    } catch (error) {
      alert('Login failed')
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="grow flex items-center justify-around">
      <div className="mb-16">
        <div className="text-4xl mb-4 text-center">Login</div>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            className="mb-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            className="mb-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-primary w-full py-2 px-4 rounded-2xl text-white">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            {"Don't have an account yet? "}
            <Link to={'/register'} className="underline text-black">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
