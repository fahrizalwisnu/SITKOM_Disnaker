import axios from 'axios'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

import { columnsComplaint } from '../../data/dummy'

function ComplaintsDashboard() {
  const [complaints, setComplaints] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [limit, setLimit] = useState(10)
  const [error, setError] = useState(null)
  const [pageReady, setPageReady] = useState(true);

  useEffect(() => {
    fetchDataComplaints(1, limit)
  }, [limit])

  const fetchDataComplaints = async (page, limit) => {
    try {
      setPageReady(false)
      axios
        .get(`/api/complaints?page=${page}&limit=${limit}`)
        .then(({ data }) => {
          if (data.data) {
            setComplaints(data.data)
            setTotalRows(data.page.total)
          } else {
            setComplaints([])
          }
        })
    } catch (error) {
      setError(error)
      setPageReady(true)
    } finally {
      setPageReady(true)
    }
  }

  useEffect(() => {
    try {
      axios.get('/api/complaints').then(({ data }) => {
        if (data.data) {
          setComplaints(data.data)
        } else {
          setComplaints([])
        }
      })
    } catch (error) {
      setError(error)
    }
  }, [])

  const handlePageChange = (page) => {
    fetchDataComplaints(page, limit)
  }

  const handlePerRowsChange = async (limit, page) => {
    setLimit(limit)
  }

  return (
    <div className="section m-4 px-4 py-8 rounded-lg min-h-screen">
      <h1 className="mb-4 font-bold text-2xl">Pengaduan</h1>
      {complaints.length > 0 ? (
        <DataTable
          columns={columnsComplaint}
          data={complaints}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
        />
      ) : (
        <div className="flex justify-center items-center h-fit">Data pengaduan kosong</div>
      )}
    </div>
  )
}

export default ComplaintsDashboard
