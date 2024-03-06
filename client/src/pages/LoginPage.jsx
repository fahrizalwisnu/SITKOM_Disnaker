import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, Navigate } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'
import { Loader } from '../components'

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [ready, setReady] = useState(true)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState('')

  const [redirect, setRedirect] = useState(false)
  const { user, setUser, setUserId } = useUserContext()
  async function handleLoginSubmit(e) {
    e.preventDefault()
    try {
      isSubmitDisabled = true
      setReady(false)
      const { data } = await axios.post('/api/login', loginForm)

      setUser(data?.data)
      setUserId(data.data?.id)
      setRedirect(true)
      toast.success('Login berhasil!')
    } catch (error) {
      setErrors(error.response.data.message)
      toast.error(error.response.data.message)
    } finally {
      isSubmitDisabled = true
      setReady(true)
    }
  }
  
  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  function handleInputChange(e) {
    const { name, value} = e.target
    setLoginForm({
      ...loginForm,
      [name]: value
    })
  }

  let isSubmitDisabled = !(
    loginForm.email &&
    loginForm.password
  )

  if (redirect) {
    if (user?.role === 'peserta') {
      return <Navigate to={'/training'} />
    } else {
      return <Navigate to={'/admin/dashboard'} />
    }
  }

  return ready ? (
    <div className="grid gap-4 grid-cols-2 grow items-center justify-around">
      <div>
        <img
          src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg"
          className="rounded-xl aspect-square max-w-md mx-auto object-cover object-center"
        />
      </div>
      <div className="items-center justify-around border py-8 rounded-2xl">
        <div className="">
          <div className="max-w-md mx-auto text-4xl mb-4 text-center">
            Masuk
          </div>
          <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder="Email"
              name='email'
              value={loginForm.email}
              onChange={handleInputChange}
            />
            <div className="flex relative items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name='password'
                value={loginForm.password}
                onChange={handleInputChange}
              />
              <div
                className="absolute right-3 cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </div>
            </div>
            <button className={`w-full py-2 px-4 rounded-2xl text-white mt-1${isSubmitDisabled ? ' bg-disabled' : ' bg-primary'}`} disabled={isSubmitDisabled}>
              Masuk
            </button>
            <div className="text-center py-2 text-gray-500">
              {'Belum mempunyai akun? '}
              <Link to={'/register'} className="underline text-black">
                Daftar
              </Link>
            </div>
          </form>
          {errors && <p className="text-red-500 text-center">{errors}</p>}
        </div>
      </div>
    </div>
  ) : (
    <Loader/>
  )
}

export default LoginPage
