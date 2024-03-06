import axios from 'axios'
import { AccountNavigate, Loader } from '../components'
import { useUserContext } from '../contexts/UserContext'
import { useEffect, useState } from 'react'

function AccountTrainingPage() {
  const { userId } = useUserContext()
  const [pageReady, setPageReady] = useState(true)
  const [error, setError] = useState(null)
  const [trainings, setTrainings] = useState(null)

  useEffect(() => {
    (async function() {
      setPageReady(false)
      try {
        const { data } = await axios.get('/api/profile/trainings/' + userId)
        setTrainings(data.data)
      } catch (error) {
        console.log(error.response?.data?.errors)
        setError(error.response.data?.errors)
      } finally {
        setPageReady(true)
      }
    })();
  }, [userId])

  return pageReady ? (
    <div className="mt-24">
      <h1 className="text-xl font-bold mb-4">Pelatihan Saya</h1>
      <div className="flex gap-4">
        <div className='w-72 rounded-2xl'>
          <AccountNavigate />
        </div>
        <div className="w-full">
          {trainings ? trainings.map((training, index) => (
            <div key={index} className='shadow rounded-md px-4 py-2 mb-2'>
              <div className='flex justify-between'>
                <div>
                  <p className='text-xs text-gray-500'>{training.jadwal} - {training.trainer}</p>
                  <p className='font-bold text-lg'>{training.pelatihan}</p>
                  <p className='text-sm text-gray-500 mt-2'>{training.deskripsi}</p>
                </div>
                <img src={'http://localhost:8082/uploads/' + training.foto} className='w-16 h-16 aspect-square' />
              </div>
            </div>
          )) : (
            <p className='text-center'>{error ? error : 'Belum mendaftar pelatihan'}</p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default AccountTrainingPage
