import axios from 'axios'
import { useEffect, useState } from 'react'

import DataTable from 'react-data-table-component'
import {
  columnsYellowCard,
  customSort,
  dataTableStyles
} from '../../data/dummy'
import { useStateContext } from '../../contexts/ContextProvider'
import { YellowCardDetail } from '../../components/admin'

function YellowCardsDashboard() {
  const { currentColor } = useStateContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [yellowCardRow, setYellowCardRow] = useState(null)
  const [yellowcards, setYellowcards] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  // console.log(currentColor);
  //   getCurrentColor(currentColor)

  useEffect(() => {
    fetchDataYellowCards(1, limit)
  }, [limit])

  const updatedDataTableStyles = {
    ...dataTableStyles,
    headCells: {
      ...dataTableStyles.headCells,
      style: {
        ...dataTableStyles.headCells.style,
        backgroundColor: currentColor,
        color: 'white'
      }
    }
  }

  const actionsColumn = [
    {
      name: 'Status',
      center: 'true',
      sortable: true,
      selector: (row) => row.status,
      cell: (row) => (
        <div>
          {row.status === 0 && (
            <div className="text-white shadow-lg bg-gray-600 py-1 px-2 transition">
              Belum diverifikasi
            </div>
          )}
          {row.status === 1 && (
            <div className="text-white shadow-lg bg-green-600 py-1 px-2">
              Disetujui
            </div>
          )}
          {row.status === 2 && (
            <div className="text-white shadow-lg bg-red-600 py-1 px-2">
              Ditolak
            </div>
          )}
        </div>
      )
    },
    {
      name: 'Action',
      right: 'true',
      width: 'max-content',
      cell: (row) => (
        <div>
          <button
            className="text-white shadow-lg py-1 px-3 relative hover:right-1 transition-all ease-in-out duration-500"
            style={{ backgroundColor: currentColor }}
            onClick={() => openModal(row)}
          >
            Detail
          </button>
        </div>
      )
    }
  ]

  const columnsWithAction = [...columnsYellowCard, ...actionsColumn]

  const fetchDataYellowCards = async (page, limit = 10) => {
    try {
      setIsLoaded(false)
      axios
        .get(`/api/yellowcards?page=${page}&limit=${limit}}&search=${search}`)
        .then(({ data }) => {
          if (data.data) {
            const formattedData = data.data.map((item) => ({
              ...item,
              createdAt: new Date(item.createdAt).toLocaleDateString()
            }))
            setYellowcards(formattedData)
            setTotalRows(data.page.total)
          }
          setIsLoaded(true)
        })
    } catch (error) {
      setError(error.response.data.errors)
      setIsLoaded(true)
    }
  }

  const handlePageChange = (page) => {
    fetchDataYellowCards(page, limit)
  }

  const handlePerRowsChange = async (limit, page) => {
    setLimit(limit)
  }

  const openModal = (row) => {
    setYellowCardRow(row)
    setIsModalOpen(true)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="section m-4 px-4 py-8 rounded-lg min-h-screen">
        <h1 className="mb-4 font-bold text-2xl">Kartu Kuning</h1>
        {yellowcards.length > 0 ? (
          <DataTable
            columns={columnsWithAction}
            data={yellowcards}
            pagination
            sortFunction={customSort}
            customStyles={updatedDataTableStyles}
            paginationServer
            paginationTotalRows={totalRows}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePerRowsChange}
          />
        ) : (
          <>
            <div className="flex justify-center items-center h-fit">
              Data kartu kuning kosong
            </div>
          </>
        )}
      </div>
      {isModalOpen && (
        <YellowCardDetail isOpen={isModalOpen} onClose={closeModal} row={yellowCardRow} fetchData={fetchDataYellowCards} />
      )}
    </>
  )
}

export default YellowCardsDashboard
