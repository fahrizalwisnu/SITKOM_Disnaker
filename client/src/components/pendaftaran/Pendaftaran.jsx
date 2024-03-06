import { useState } from 'react'
import axios from 'axios'
import gbr from '/src/assets/daftar.png'
import { PhotoUploader } from '../admin'
import InputHeader from '../InputHeader'
import Swal from 'sweetalert2'
import { Navigate } from 'react-router-dom'

function Pendaftaran() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nik, setNIK] = useState('')
  const [nama, setNama] = useState('')
  const [tempatLahir, setTempatLahir] = useState('')
  const [tanggalLahir, setTanggalLahir] = useState('')
  const [foto, setFoto] = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [confirm, setConfirm] = useState(false)
  const [redirect, setRedirect] = useState(false)

  async function handleRegistrationSubmit(e) {
    e.preventDefault()
    try {
      const register = await axios.post('/api/register', {
        email,
        password,
        nik,
        nama,
        tempatLahir,
        tanggalLahir,
        foto,
        jenisKelamin
      })

      Swal.fire({
        title: 'Berhasil',
        text: 'Berhasil mendaftar, silahkan login',
        icon: 'success'
      })
      setRedirect(true)
    } catch (error) {
      Swal.fire({
        title: 'Gagal',
        text: 'Gagal mendaftar, coba lagi nanti',
        icon: 'error'
      })
    }
  }

  const handleSetConfirm = () => {
    setConfirm((confirm) => !confirm)
  }

  function handleSelectedGender(e) {
    setJenisKelamin(e.target.value)
  }

  if (redirect) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className="pt-24">
      <h1 className="text-center text-2xl font-bold">
        Formulir Pendaftaran Akun SITKOM
      </h1>
      <div className="my-8">
        <form onSubmit={handleRegistrationSubmit}>
          <InputHeader text={'Email'} />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Masukkan email"
          />

          <InputHeader text={'Password'} />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Password"
          />

          <InputHeader text={'NIK'} />
          <input
            value={nik}
            onChange={(e) => setNIK(e.target.value)}
            type="text"
            placeholder="Masukkan NIK"
          />

          <InputHeader text={'Nama lengkap'} />
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            type="text"
            placeholder="Masukkan nama"
          />

          <InputHeader text={'Tempat lahir'} />
          <input
            value={tempatLahir}
            onChange={(e) => setTempatLahir(e.target.value)}
            type="text"
            placeholder="Masukkan tempat lahir"
          />

          <InputHeader text={'Tanggal lahir'} />
          <input
            value={tanggalLahir}
            onChange={(e) => setTanggalLahir(e.target.value)}
            type="date"
          />

          <PhotoUploader foto={foto} setFoto={setFoto} />

          <InputHeader text={'Jenis kelamin'} />
          <select value={jenisKelamin} onChange={handleSelectedGender}>
            <option defaultValue disabled>
              Pilih jenis kelamin
            </option>
            <option value={'l'}>Laki laki</option>
            <option value={'p'}>Perempuan</option>
          </select>

          <div className="mb-4 mt-8">
            <input
              value={confirm}
              onChange={handleSetConfirm}
              type="checkbox"
              className="mr-1"
            />
            <label>Konfirmasi</label>
          </div>
          <div className="d-grid">
            <button
              className="bg-primary text-white"
              type="submit"
              disabled={!confirm}
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Pendaftaran
