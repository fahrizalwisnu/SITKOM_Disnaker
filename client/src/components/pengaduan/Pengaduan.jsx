import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Loader from '../Loader'
import poster from '/src/assets/pengaduan.png'
import { useUserContext } from '../../contexts/UserContext'

function InputLabel({ text }) {
  return <label className="text-center">{text}</label>
}

function Pengaduan() {
  const [pageReady, setPageReady] = useState(true)
  const { userId } = useUserContext()
  const [complaintForm, setComplaintForm] = useState({
    nama: '',
    email: '',
    judul: '',
    isi: ''
  })
  const [confirm, setConfirm] = useState(false)

  function handleInputChange(e) {
    setComplaintForm({
      ...complaintForm,
      [e.target.name]: e.target.value
    })
  }

  function handleComplaintSubmit(e) {
    e.preventDefault()
    isSubmitDisabled = true
    const formData = {
      userId,
      ...complaintForm
    }

    Swal.fire({
      title: 'Konfirmasi pengaduan',
      text: 'Apakah Anda yakin ingin mengirim pengaduan?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setPageReady(false)
        try {
          // Kirim permintaan POST ke API untuk mendaftar pelatihan
          const { data } = await axios.post('/api/complaints', formData)
          // Tampilkan pesan sukses
          setFormToDefault()
          setConfirm(false)
          Swal.fire('Berhasil!', data.message, 'success')
        } catch (error) {
          // Tangani kesalahan jika ada
          Swal.fire('Gagal', 'Terjadi kesalahan saat mengirim pengaduan.', 'error');
        } finally {
          isSubmitDisabled = false
          setPageReady(true)
        }
      }
    })
  }

  function setFormToDefault() {
    setComplaintForm({
      nama: '',
      email: '',
      judul: '',
      isi: ''
    })
  }

  const handleSetConfirm = () => {
    setConfirm((confirm) => !confirm)
  }

  let isSubmitDisabled = !(
    complaintForm.nama &&
    complaintForm.email &&
    complaintForm.judul &&
    complaintForm.isi &&
    confirm &&
    userId
  )

  return pageReady ? (
    <div className="flex justify-center p-4 my-24 rounded-3xl border">
      <div className="w-1/2 text-black p-5 border rounded-2xl">
        <h1 className="font-semibold mb-10 text-center uppercase text-2xl">
          Layanan Pengaduan Kerja
        </h1>

        <form onSubmit={handleComplaintSubmit}>
          <div className="mb-3">
            <InputLabel text={'Nama'} />
            <input
              type="text"
              name="nama"
              placeholder="Masukkan nama anda"
              value={complaintForm.nama}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <InputLabel text={'Email'} />
            <input
              type="text"
              name="email"
              placeholder="Masukkan email anda"
              value={complaintForm.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <InputLabel text={'Judul pengaduan'} />
            <input
              type="text"
              name="judul"
              placeholder="Masukkan judul pengaduan"
              value={complaintForm.judul}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <InputLabel text={'Isi pengaduan'} />
            <textarea
              className="form-control"
              name="isi"
              value={complaintForm.isi}
              onChange={handleInputChange}
              placeholder="Masukkan isi pengaduan"
            ></textarea>
          </div>

          <div className="mb-4 flex gap-1">
            <input
              name="check"
              type="checkbox"
              value={confirm}
              onChange={handleSetConfirm}
              label="Konfirmasi"
            />
            <InputLabel text={'Konfirmasi'} />
          </div>
          <button
            className={`primary text-white w-full${isSubmitDisabled ? ' bg-disabled' : ' bg-primary '}`}
            type="submit"
            disabled={isSubmitDisabled}
          >
            Kirim Pengaduan
          </button>
        </form>
      </div>

      <div className="order-1 w-1/2 flex justify-center items-center">
        <img src={poster} />
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default Pengaduan
