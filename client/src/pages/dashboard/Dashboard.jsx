import axios from 'axios'
import { CardOne } from '../../components'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { RiContactsFill, RiCustomerServiceFill } from 'react-icons/ri'
import { IoIosPeople } from 'react-icons/io'
import { useEffect, useState } from 'react'
import { useUserContext } from '../../contexts/UserContext'

const Dashboard = () => {
  const { user } = useUserContext()
  let { userId } = useUserContext()
  if (user?.role !== 'trainer') {
    userId = undefined
  }

  const [totalTrainings, setTotalTrainings] = useState(0)
  const [totalTrainers, setTotalTrainers] = useState(0)
  const [totalParticipants, setTotalParticipants] = useState(0)
  const [totalComplaints, setTotalComplaints] = useState(0)

  useEffect(() => {
    axios
      .get(`/api/dashboard?trainerId=${userId ? userId : undefined}`)
      .then(({ data }) => {
        setTotalTrainings(data.data.totalTrainings)
        setTotalTrainers(data.data.totalTrainers)
        setTotalParticipants(data.data.totalParticipants)
        setTotalComplaints(data.data.totalComplaints)
      })
  }, [user?.role])

  return (
    <div className="m-8">
      {user?.role === 'trainer' ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <CardOne
            totalData={totalTrainings}
            text={'pelatihan'}
            icon={<FaChalkboardTeacher />}
          />
          <CardOne
            totalData={totalParticipants}
            text={'peserta'}
            icon={<RiContactsFill />}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
          <CardOne
            totalData={totalTrainings}
            text={'pelatihan'}
            icon={<FaChalkboardTeacher />}
          />
          <CardOne
            totalData={totalParticipants}
            text={'peserta'}
            icon={<RiContactsFill />}
          />
          <CardOne
            totalData={totalTrainers}
            text={'trainer'}
            icon={<IoIosPeople />}
          />
          <CardOne
            totalData={totalComplaints}
            text={'pengaduan'}
            icon={<RiCustomerServiceFill />}
          />
        </div>
      )}
    </div>
  )
}

export default Dashboard
