import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { Loader } from '..'

const Daftar = () => {
  const [pageReady, setPageReady] = useState(true)
  const [trainings, setTrainings] = useState([])

  useEffect(() => {
    setPageReady(false)
    axios.get('/api/trainings').then(({ data }) => {
      setTrainings(data.data)
      setPageReady(true)
    })
  }, [])

  return pageReady ? (
    <section className='mb-28'>
      <h1 className="text-xl font-bold">Kategori Pelatihan Kerja</h1>
      <div className="mt-8 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trainings.length > 0 &&
          trainings.map((training) => (
            <div
              key={training.id}
              className="border py-8 px-4 rounded-md shadow-lg"
            >
            {training.foto && (
              <img
                className="aspect-square object-cover object-center w-full"
                variant="top"
                src={`http://localhost:8082/uploads/${training.foto}`}
                style={{ borderRadius: '16px' }}
              />
            )}
              <p className="mt-4">Disnaker Surakarta</p>
              <p className="font-bold text-lg">{training.nama}</p>
              <Link
                to={'/training/' + training.id}
                className="bg-primary text-white py-1 px-3 rounded-md mt-4 inline-block"
              >
                Info Selengkapnya
              </Link>
            </div>
          ))}
      </div>
    </section>
  ) : (
    <Loader />
  )
}

export default Daftar
