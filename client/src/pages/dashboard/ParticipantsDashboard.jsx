import { useEffect, useState } from 'react'
import axios from 'axios'
import { columnsParticipants } from '../../data/dummy'
import DataTable from 'react-data-table-component'

function ParticipantsDashboard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [participants, setParticipants] = useState([])
  const [limit, setLimit] = useState(10)
  const [totalRows, setTotalRows] = useState(0)

  useEffect(() => {
    axios.get('/api/participants').then(({ data }) => {
      setParticipants(data.data)
      setTotalRows(data.page.total)
    })
  }, [])

  const fetchDataParticipants = async (page, limit) => {
    try {
      setIsLoaded(false)
      axios
        .get(`/api/participants?page=${page}&limit=${limit}}`)
        .then(({ data }) => {
          if (data.data) {
            setParticipants(data.data)
            setTotalRows(data.page.total)
          } else {
            setTrainers([])
          }
          setIsLoaded(true)
        })
    } catch (error) {
      setError(error.response.data.errors)
      setIsLoaded(true)
    }
  }

  const handlePageChange = (page) => {
    fetchDataParticipants(page, limit)
  }

  const handlePerRowsChange = async (limit, page) => {
    setLimit(limit)
  }
  
  return (
    <div className="section m-4 px-4 py-8 rounded-lg min-h-screen">
      <h1 className="mb-4 font-bold text-2xl">Peserta</h1>
      {participants.length > 0 ? (
        <DataTable
          columns={columnsParticipants}
          data={participants}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
        />
      ) : (
        <>
          <div className="flex justify-center items-center h-fit">
            Data peserta kosong
          </div>
        </>
      )}
    </div>
  );
}

export default ParticipantsDashboard;