import { useEffect } from "react";

function TrainersPage() {
  const [trainers, setTrainers] = useState([]);
  
  useEffect(() => {
    axios.get('/api/trainers').then(({data}) => {
      setTrainers(data.data)
    })
  }, []);
  
  return (
    <div>
      <div>Trainers Page</div>
      {trainers.length > 0 && (
        trainers.map(trainer => (
          <div key={trainer.id}>
            <div>{trainer.nama}</div>
          </div>
        ))
      )}
    </div>
  )
}

export default TrainersPage