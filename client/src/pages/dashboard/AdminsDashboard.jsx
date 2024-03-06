import axios from 'axios'
import { useEffect, useState } from 'react'

import DataTable from 'react-data-table-component'
import { FaPlus } from 'react-icons/fa6'

import { HeaderDashboard } from '../../components'
import { columnsAdmin } from '../../data/dummy'

function AdminsDashboard() {
  const [admins, setAdmins] = useState([])
  const [error, setError] = useState(null)
  const [totalRows, setTotalRows] = useState(0)
  const [limit, setLimit] = useState(10)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetchDataAdmin(1, limit)
  }, [limit])

  const fetchDataAdmin = async (page, limit) => {
    try {
      setIsLoaded(false)
      axios
        .get(`/api/admins?page=${page}&limit=${limit}`)
        .then(({ data }) => {
          if (data.data) {
            setAdmins(data.data)
            setTotalRows(data.page.total)
          } else {
            setAdmins([])
          }
          setIsLoaded(true)
        })
    } catch (error) {
      setError(error.response.data.errors)
      setIsLoaded(true)
    }
  }

  useEffect(() => {
    try {
      axios.get('/api/admins').then(({ data }) => {
        if (data.data) {
          setAdmins(data.data)
        } else {
          setAdmins([])
        }
      })
    } catch (error) {
      setError(error.response.data.errors)
    }
  }, [])

  const handlePageChange = (page) => {
    fetchDataAdmin(page, limit)
  }

  const handlePerRowsChange = async (limit, page) => {
    setLimit(limit)
  }

  return (
    <div className='section m-4 px-4 py-8 rounded-lg min-h-screen'>
      <HeaderDashboard
        title={'Admin Disnaker'}
        to={'/admin/admin/add'}
        icon={<FaPlus />}
        buttonText={'Tambah Admin'}
      />
      {admins.length > 0 ? (
        <DataTable
          columns={columnsAdmin}
          data={admins}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
        />
      ) : (
        <>
          <div className="flex justify-center items-center h-fit">
            Data trainer kosong
          </div>
        </>
      )}
    </div>
  )
}

export default AdminsDashboard
