import axios from 'axios'
import { useEffect, useState } from 'react'

import DataTable from 'react-data-table-component'

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter
} from '@syncfusion/ej2-react-grids'
import { FaPlus } from 'react-icons/fa6'

import { HeaderDashboard } from '../../components'
import { trainersGrid, columnsAdmin } from '../../data/dummy'

function TrainersPage() {
  const [trainers, setTrainers] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [limit, setLimit] = useState(10)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetchDataTrainer(1, limit)
  }, [limit])

  const fetchDataTrainer = async (page, limit) => {
    try {
      setIsLoaded(false)
      axios
        .get(`/api/trainers?page=${page}&limit=${limit}}`)
        .then(({ data }) => {
          if (data.data) {
            setTrainers(data.data)
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

  useEffect(() => {
    try {
      axios.get('/api/trainers').then(({ data }) => {
        if (data.data) {
          setTrainers(data.data)
        } else {
          setTrainers([])
        }
      })
    } catch (error) {
      setError(error.response.data.errors)
    }
  }, [])

  const handlePageChange = (page) => {
    fetchDataTrainer(page, limit)
  }

  const handlePerRowsChange = async (limit, page) => {
    setLimit(limit)
  }

  return (
    <div className='section m-4 px-4 py-8 rounded-lg min-h-screen'>
      <HeaderDashboard
        title={'Trainer'}
        to={'/admin/trainer/add'}
        icon={<FaPlus />}
        buttonText={'Tambah Trainer'}
      />
      {trainers.length > 0 ? (
        <DataTable
          columns={columnsAdmin}
          data={trainers}
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

export default TrainersPage
