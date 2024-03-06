import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

import { HeaderDashboard } from '../../components'

function TrainingsDashboard() {
  const [trainings, setTrainings] = useState([])

  useEffect(() => {
    axios.get('/api/trainings').then(({ data }) => {
      setTrainings(data.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <div className='section m-4 px-4 py-8 rounded-lg min-h-screen'>
      <HeaderDashboard
        title={'Pelatihan'}
        to={'/admin/training/add'}
        icon={<FaPlus />}
        buttonText={'Tambah Pelatihan'}
      />
      <div className='mb-28'>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trainings.length > 0 &&
            trainings.map((training) => (
            <Link
              key={training.id}
              className="py-8 px-4 rounded-md shadow-lg"
              to={'/admin/training/' + training.id}
            >
              <img
                className="aspect-square object-cover object-center w-full mb-4 rounded-md"
                src={`http://localhost:8082/uploads/${training?.foto}`}
                alt={`Photo ${training.nama}`}
              />
              <p>Disnaker Surakarta</p>
              <p className="font-bold text-lg">{training?.nama}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrainingsDashboard
