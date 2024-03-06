import axios from 'axios'
import { useEffect, useState } from 'react'

import Heros from '../components/web/Heros'
import Daftar from '../components/web/Daftar'
import Kategori from '../components/web/Kategori'

function TrainingsPage() {
  const [trainings, setTrainings] = useState([])

  // useEffect(() => {
  //   axios
  //     .get('/api/training')
  //     .then(({ data }) => {
  //       setTrainings(data.data)
  //     })
  //     .catch((err) => {
  //       console.log(error)
  //     })
  // }, [])

  return (
    <div className="pt-24">
      {/* <Heros /> */}
      <Daftar />
      {/* <Kategori /> */}
    </div>
  )
}

export default TrainingsPage
