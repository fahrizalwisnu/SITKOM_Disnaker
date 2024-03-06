import axios from 'axios'
import { AccountNavigate, Loader } from '../components'
import { useUserContext } from '../contexts/UserContext'
import { useEffect, useState } from 'react'


import { getStatusColor } from '../data/dummy'

function AccountYellowCardPage() {
  const { userId } = useUserContext()
  const [pageReady, setPageReady] = useState(true)
  const [error, setError] = useState(null)
  const [yellowcards, setYellowcards] = useState(null)

  useEffect(() => {
    ;(async function () {
      setPageReady(false)
      try {
        const { data } = await axios.get('/api/profile/yellowcards/' + userId)
        setYellowcards(data.data)
      } catch (error) {
        setError(error.response.data?.errors)
      } finally {
        setPageReady(true)
      }
    })()
  }, [userId])

  return pageReady ? (
    <div className="mt-24">
      <h1 className="text-xl font-bold mb-4">Kartu Kuning Saya</h1>
      <div className="flex gap-4">
        <div className="w-72 rounded-2xl">
          <AccountNavigate />
        </div>
        <div className="w-full">
          {yellowcards ? (
            yellowcards.map((yellowcard, index) => (
              <div key={index} className="shadow rounded-md px-4 py-2 mb-2">
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-gray-500">
                      Tanggal pengajuan: {yellowcard.tanggalPengajuan}{' '}
                      <span className={`ml-2 px-1.5 py-1 rounded-sm text-white shadow-sm${' ' + getStatusColor(yellowcard.status)}`} >
                        {yellowcard.status}
                      </span>
                    </p>
                    <p className="font-bold text-lg">{yellowcard.nama}</p>
                  </div>
                  <img
                    src={'http://localhost:8082/uploads/' + yellowcard.foto}
                    className="w-16 h-16 aspect-square rounded-md"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">
              {error ? error : 'Belum mengajukan kartu kuning'}
            </p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default AccountYellowCardPage
