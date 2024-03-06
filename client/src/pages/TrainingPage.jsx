import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'
import Swal from 'sweetalert2'
import { BsPersonCircle } from "react-icons/bs"
import { MdOutlineDateRange } from "react-icons/md"
import { TbExchange } from "react-icons/tb"

import { Loader } from '../components'

function TrainingPage() {
  const [pageReady, setPageReady] = useState(true)
  const { user } = useUserContext()
  const { trainingId } = useParams()
  const [training, setTraining] = useState(null)
  const [participant, setParticipant] = useState(null)

  useEffect(() => {
    if (user) {
      setPageReady(false)
      axios.get('/api/apply/' + trainingId).then(({data}) => {
        setParticipant(data.data)
        setPageReady(true)
      })
    }
  }, [user]);

  useEffect(() => {
    setPageReady(false)
    axios.get('/api/trainings/' + trainingId).then(({ data }) => {
      setTraining(data.data)
      setPageReady(true)
    })
  }, [])

  function applyTraining() {
    Swal.fire({
      title: 'Konfirmasi Pendaftaran',
      text: 'Apakah Anda yakin ingin mendaftar pelatihan ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, daftar sekarang!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setPageReady(false)
        try {
          // Kirim permintaan POST ke API untuk mendaftar pelatihan
          const { data } = await axios.post('/api/trainings/' + trainingId + '/apply')

          setParticipant(data.data)

          // Tampilkan pesan sukses
          Swal.fire('Pendaftaran Berhasil!', 'Anda berhasil mendaftar pelatihan.', 'success');
        } catch (error) {
          // Tangani kesalahan jika ada
          Swal.fire('Error', 'Terjadi kesalahan saat mendaftar pelatihan.', 'error');
        } finally {
          setPageReady(true)
        }
      }
    })
  }

  return pageReady ? (
    <section className="mt-12 md:mt-24 min-h-full">
      {!!training && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          <div className="md:order-last">
            <h1 className="font-bold text-2xl mb-4">{training.nama}</h1>
            <div className='flex items-center gap-1'>
              <BsPersonCircle className='text-gray-500' />
              <p className="text-sm text-gray-500">Mentor: {training.trainer}</p>
            </div>
            <div className='flex items-center gap-1'>
              <MdOutlineDateRange className='text-gray-500' />
              <p className="text-sm text-gray-500">Tanggal rilis: {training.createdAt}</p>
            </div>
            <div className='flex items-center gap-1'>
              <TbExchange className='text-gray-500' />
              <p className="text-sm text-gray-500">Terakhir diupdate: {training.updatedAt}</p>
            </div>
            <p className="mt-2">{training.deskripsi}</p>
            {participant ? (
              <button className='disabled bg-gray-300 inline-block mt-4'>Sudah terdaftar</button>
            ) : (
              <>
              {user ? (
                <button className='bg-primary text-white mt-4' onClick={applyTraining}>Daftar Pelatihan</button>
              ) : (
                <Link className='button bg-primary text-white inline-block mt-4' to={'/login'}>Daftar Pelatihan</Link>
              )}

              </>
            )}
          </div>
          {training?.foto && (
            <div className="grid rounded-3xl overflow-hidden">
              <img
                src={'http://localhost:8082/uploads/' + training.foto}
                className="w-full aspect-square object-cover object-center border"
              />
              <div></div>
            </div>
          )}
        </div>
      )}
    </section>
  ) : (
    <Loader />
  )
}

export default TrainingPage
