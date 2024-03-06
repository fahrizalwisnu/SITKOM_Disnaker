import { useState } from 'react'
import axios from 'axios'
import { PhotoUploader } from './admin'
import { InputHeader, Loader } from '.'
import { toast } from 'react-toastify'
import { useUserContext } from '../contexts/UserContext'

function YellowCardForm() {
  const [ready, setReady] = useState(true)
  const { userId } = useUserContext()

  const [yellowCardForm, setYellowCardForm] = useState({
    nama: '',
    nik: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    statusPernikahan: '',
    agama: '',
    alamat: '',
    email: '',
    noTelepon: '',
    foto: ''
  })
  const [confirm, setConfirm] = useState(false)

  function handleInputChange(e) {
    const { name, value } = e.target
    setYellowCardForm({
      ...yellowCardForm,
      [name]: value
    })
  }

  const updateFoto = (newFoto) => {
    setYellowCardForm({
      ...yellowCardForm,
      ['foto']: newFoto
    })
  }

  function setFormToDefault() {
    setYellowCardForm({
      nama: '',
      nik: '',
      tempatLahir: '',
      tanggalLahir: '',
      jenisKelamin: '',
      statusPernikahan: '',
      agama: '',
      alamat: '',
      email: '',
      noTelepon: '',
      foto: ''
    })
  }

  let isSubmitDisabled = !(
    yellowCardForm.nama &&
    yellowCardForm.nik &&
    yellowCardForm.tempatLahir &&
    yellowCardForm.tanggalLahir &&
    yellowCardForm.jenisKelamin &&
    yellowCardForm.statusPernikahan &&
    yellowCardForm.agama &&
    yellowCardForm.alamat &&
    yellowCardForm.email &&
    yellowCardForm.noTelepon &&
    yellowCardForm.foto &&
    confirm &&
    userId
  )

  async function handleYellowCardSubmit(e) {
    e.preventDefault()
    isSubmitDisabled = true
    setReady(false)
    const formData = {
      userId,
      ...yellowCardForm
    }
    try {
      await axios.post('/api/yellowcards', formData)
      setFormToDefault()
      toast.success('Berhasil mengajukan kartu kuning!')
      setConfirm(false)
    } catch (error) {
      toast.error('Gagal mengajukan kartu kuning!')
    } finally {
      isSubmitDisabled = true
      setReady(true)
    }
  }

  const handleSetConfirm = () => {
    setConfirm((confirm) => !confirm)
  }

  return ready ? (
    <div className="border rounded-2xl p-4 bg-white">
      <h1 className="text-center text-2xl font-bold">
        Formulir Pendaftaran Kartu Kuning
      </h1>
      <div className="my-8">
        <form onSubmit={handleYellowCardSubmit}>
          <InputHeader text={'Nama lengkap'} />
          <input
            value={yellowCardForm.nama}
            onChange={handleInputChange}
            type="text"
            name="nama"
            placeholder="Masukkan nama lengkap"
          />

          <InputHeader text={'Nomor Induk Kependudukan (No. KTP)'} />
          <input
            value={yellowCardForm.nik}
            onChange={handleInputChange}
            type="text"
            name="nik"
            placeholder="Masukkan nomor induk kependudukan"
          />

          <InputHeader text={'Tempat lahir'} />
          <input
            value={yellowCardForm.tempatLahir}
            onChange={handleInputChange}
            type="text"
            name="tempatLahir"
            placeholder="Masukkan tempat lahir"
          />

          <InputHeader text={'Tanggal lahir'} />
          <input
            value={yellowCardForm.tanggalLahir}
            onChange={handleInputChange}
            type="date"
            name="tanggalLahir"
          />

          <InputHeader text={'Jenis kelamin'} />
          <select
            value={yellowCardForm.jenisKelamin}
            onChange={handleInputChange}
            name="jenisKelamin"
          >
            <option>Pilih jenis kelamin</option>
            <option value={'l'}>Laki laki</option>
            <option value={'p'}>Perempuan</option>
          </select>

          <InputHeader text={'Status pernikahan'} />
          <select
            value={yellowCardForm.statusPernikahan}
            onChange={handleInputChange}
            name="statusPernikahan"
          >
            <option>Pilih status pernikahan</option>
            <option value={'Sudah menikah'}>Sudah menikah</option>
            <option value={'Belum menikah'}>Belum menikah</option>
          </select>

          <InputHeader text={'Agama'} />
          <input
            value={yellowCardForm.agama}
            onChange={handleInputChange}
            type="text"
            name="agama"
            placeholder="Masukkan agama"
          />

          <InputHeader text={'Alamat sesuai KTP'} />
          <input
            value={yellowCardForm.alamat}
            onChange={handleInputChange}
            type="text"
            name="alamat"
            placeholder="Masukkan alamat sesuai KTP"
          />

          <InputHeader text={'Email'} />
          <input
            value={yellowCardForm.email}
            onChange={handleInputChange}
            type="text"
            name="email"
            placeholder="Masukkan email"
          />

          <InputHeader text={'No telepon'} />
          <input
            value={yellowCardForm.noTelepon}
            onChange={handleInputChange}
            type="text"
            name="noTelepon"
            placeholder="Masukkan no telepon"
          />

          <PhotoUploader foto={yellowCardForm.foto} setFoto={updateFoto} />

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
              className={`text-white w-full${
                isSubmitDisabled ? ' bg-disabled' : ' bg-primary'
              }`}
              type="submit"
              disabled={isSubmitDisabled}
            >
              Ajukan
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default YellowCardForm
