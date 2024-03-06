import { useEffect, useState } from 'react'
import InputHeader from '../InputHeader'
import axios from 'axios'
import Loader from '../Loader'

function YellowCardDetail({ isOpen, onClose, row, fetchData }) {
  const [ready, setReady] = useState(true)
  const [modalOpen, setModalOpen] = useState(isOpen)

  const closeModal = () => {
    setModalOpen(false)
    onClose()
  }

  useEffect(() => {
    setModalOpen(isOpen)
    // Mencegah scroll pada body ketika modal terbuka
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'

    // Membersihkan efek saat komponen di-unmount
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  async function changeYellowCardStatus(status) {
    try {
      setReady(false)
      await axios.put(`/api/yellowcards/${row.id}`, {status})
      fetchData()
    } catch (error) {
      alert('Gagal memperbarui data')
    } finally {
      setReady(true)
      setModalOpen(false)
      onClose()
    }
  }

  function approveYellowCard() {
    changeYellowCardStatus(1)
  }

  function rejectYellowCard() {
    changeYellowCardStatus(2)
  }

  return ready ? (
    <>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
          {/* Background hitam dengan opacity 50% */}
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50"
            onClick={closeModal}
          ></div>

          {/* Kotak putih di tengah */}
          <div className="relative z-10 max-h-[600px] bg-white overflow-auto px-6 py-8 rounded-2xl">
            {/* Konten Modal */}
            <h1 className='text-xl font-bold mb-6'>Data Pengajuan Kartu Kuning</h1>
            <div className='flex flex-col md:flex-row right-0'>
              <div className='w-96'>
                <img src={`http://localhost:8082/uploads/${row.foto}`} className='w-40 h-40 aspect-square' />
                <InputHeader text={'Nama'} />
                <p>{row.nama}</p>
                <InputHeader text={'Nik'} />
                <p>{row.nik}</p>
                <InputHeader text={'Tempat tanggal lahir'} />
                <p><span>{row.tempatLahir},</span> {new Date(row.tanggalLahir).toLocaleDateString()}</p>
              </div>
              <div className='w-96'>
                <InputHeader text={'Jenis kelamin'} />
                {row?.jenisKelamin === 'l' ? (<p>Laki-laki</p>) : (<p>Perempuan</p>)}
                <div className='-mt-4'>
                  <InputHeader text={'Status pernikahan'} />
                </div>
                <p>{row.statusPernikahan}</p>
                <InputHeader text={'Agama'} />
                <p>{row.agama}</p>
                <InputHeader text={'Alamat'} />
                <p>{row.alamat}</p>
                <InputHeader text={'Email'} />
                <p>{row.email}</p>
                <InputHeader text={'No telepon'} />
                <p>{row.noTelepon}</p>
              </div>
            </div>

            {/* Tombol close */}
            <div className='flex justify-end mt-6'>
              <button
                className="mt-4 px-4 py-2 bg-gray-800 text-white"
                onClick={closeModal}
              >
                Tutup
              </button>
              {row.status === 0 && (
                <>
                  <button
                    className="mt-4 px-4 py-2 bg-green-700 text-white mx-1"
                    onClick={approveYellowCard}
                  >
                    Setujui
                  </button>
                  <button
                    className="mt-4 px-4 py-2 bg-red-700 text-white"
                    onClick={rejectYellowCard}
                  >
                    Tolak
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <Loader/>
  )
}

export default YellowCardDetail
