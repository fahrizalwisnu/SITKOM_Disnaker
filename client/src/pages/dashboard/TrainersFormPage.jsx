import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { MdArrowBack } from 'react-icons/md'
import { PhotoUploader } from '../../components/admin'
import { HeaderDashboard, InputHeader } from '../../components'

function TrainersFormPage() {
  const { trainerId } = useParams(null)

  const [foto, setFoto] = useState('')
  const [formValues, setFormValues] = useState({
    nama: '',
    email: '',
    password: '',
    foto: ''
  })

  let isSubmitDisabled = !(
    formValues.nama &&
    formValues.email &&
    formValues.password
  )

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const [errorName, setErrorName] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)
  const [errorPhoto, setErrorPhoto] = useState(null)

  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (!trainerId) return

    axios.get('/api/trainers/' + trainerId).then(({ data }) => {
      const trainer = data.data

      setNama(trainer.nama)
      setEmail(trainer.email)
      setFoto(trainer.foto)
    })
  }, [trainerId])

  async function saveTrainer(e) {
    e.preventDefault()
    try {
      isSubmitDisabled = true

      const trainerData = {
        nama: formValues.nama,
        email: formValues.email,
        password: formValues.password,
        foto
      }

      if (!trainerId) {
        await axios.post('/api/trainers/', trainerData)
      } else {
        await axios.put('/api/trainers/', {
          id: trainerId,
          ...trainerData
        })
      }

      setRedirect(true)
    } catch (error) {
      const { errors } = error.response.data
      setErrorName(errors.nama)
      setErrorEmail(errors.email)
      setErrorPassword(errors.password)
      setErrorPhoto(errors.foto)
    }
  }

  function errorMessage(errors) {
    return (
      errors.map(error => (
        <p className="text-red-500 text-center mb-2">{error}</p>
    )))
  }

  if (redirect) return <Navigate to={'/admin/trainer'} />

  return (
    <>
      <HeaderDashboard
        title={'Tambah Trainer'}
        to={'/admin/trainer'}
        icon={<MdArrowBack />}
        buttonText={'Kembali'}
      />
      <form onSubmit={saveTrainer}>
        <InputHeader text={'Nama Trainer'} />
        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={formValues.nama}
          onChange={handleInputChange}
        ></input>
        {errorName && errorMessage(errorName)}

        <InputHeader text={'Email'} />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleInputChange}
        ></input>
        {errorEmail && errorMessage(errorEmail)}

        <InputHeader text={'Password'} />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleInputChange}
        ></input>
        {errorPassword && errorMessage(errorPassword)}

        <PhotoUploader foto={foto} setFoto={setFoto} />

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className={`text-white py-2 px-4${
              isSubmitDisabled ? ' bg-blue-300' : ' bg-primary'
            }`}
            disabled={isSubmitDisabled}
          >
            Save
          </button>
        </div>
      </form>
    </>
  )
}

export default TrainersFormPage
