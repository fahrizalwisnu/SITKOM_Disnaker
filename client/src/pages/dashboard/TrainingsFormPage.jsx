import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { MdArrowBack } from 'react-icons/md'

import { PhotoUploader } from '../../components/admin'
import { HeaderDashboard, InputHeader } from '../../components'

function TrainingsFormPage() {
  const { idPelatihan } = useParams(null)

  const [trainers, setTrainers] = useState([])
  const [nama, setNama] = useState('')
  const [selectedTrainer, setSelectedTrainer] = useState('')
  const [materi, setMateri] = useState('')
  const [foto, setFoto] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    axios.get('/api/trainers/').then(({ data }) => {
      const trainer = data.data

      setTrainers(trainer)
      // setSelectedTrainer(trainer.id)
    })
  }, [])

  useEffect(() => {
    if (!idPelatihan) return

    axios.get('/api/trainings/' + idPelatihan).then(({ data }) => {
      const pelatihan = data.data

      setNama(pelatihan.nama)
      setSelectedTrainer(pelatihan.trainerId)
      setMateri(pelatihan.materi)
      setFoto(pelatihan.foto)
      setDeskripsi(pelatihan.deskripsi)
    })
  }, [idPelatihan])

  async function simpanDataPelatihan(e) {
    e.preventDefault()
    try {
      const dataPelatihan = {
        nama,
        trainerId: selectedTrainer,
        materi,
        foto,
        deskripsi
      }

      if (!idPelatihan) {
        await axios.post('/api/trainings', dataPelatihan)
      } else {
        await axios.put('/api/trainings/' + idPelatihan, {
          id: idPelatihan,
          ...dataPelatihan
        })
      }

      setRedirect(true)
    } catch (error) {
      console.log(error.message)
      alert('Gagal menyimpan data pelatihan')
    }
  }

  function handleSelectedTrainer(e) {
    setSelectedTrainer(e.target.value)
  }

  if (redirect) return <Navigate to={'/admin/training'} />

  let textHeader = 'Tambah Pelatihan'

  if (idPelatihan) {
    textHeader = 'Edit Pelatihan'
  }

  return (
    <div className='section m-4 px-4 py-8 rounded-lg min-h-screen'>
      <HeaderDashboard
        title={textHeader}
        to={'/admin/training'}
        icon={<MdArrowBack />}
        buttonText={'Kembali'}
      />
      <form onSubmit={simpanDataPelatihan}>
        <InputHeader text={'Nama Pelatihan'} />
        <input
          type="text"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        ></input>

        <InputHeader text={'Nama Trainer'} />
        <select value={selectedTrainer} onChange={handleSelectedTrainer}>
          <option value='' disabled>
            Pilih trainer
          </option>
          {trainers.length > 0 &&
            trainers.map((trainer) => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.nama}
              </option>
            ))}
        </select>
        <InputHeader text={'Deskripsi'} />
        <textarea
          type="text"
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
        ></textarea>

        {/* <InputHeader text={'Materi'} /> */}
        <input
          type="hidden"
          placeholder="materi"
          value={materi}
          onChange={(e) => setMateri(e.target.value)}
        ></input>

        <PhotoUploader foto={foto} setFoto={setFoto} />

        <div className="flex justify-center mt-6">
          <button type="submit" className="bg-primary text-white py-2 px-4 ">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default TrainingsFormPage
