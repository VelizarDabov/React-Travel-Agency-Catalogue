import { useState, useEffect } from 'react'
import Loading from './components/Loader'
import Tours from './components/Tours'
import './App.css'
const url = 'https://tours-cb5d8-default-rtdb.firebaseio.com/tours.json'

function App() {
  const [loading, setLoading] = useState(true)
  const [tours, setTours] = useState([])

  const remove = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  const fetchTours = async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const tours = await response.json()
    
let loadedTours = [];

for(const key in tours){
loadedTours.push({
  id:key,
  name: tours[key].name,
  image: tours[key].image,
  price: tours[key].price,
  image:tours[key].image,
  info: tours[key].info,
})
}


      setLoading(false)
      setTours(loadedTours)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    fetchTours()
  }, [])
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    )
  }
  return (
    <main>
      <Tours tours={tours} remove={remove} />
    </main>
  )
}

export default App