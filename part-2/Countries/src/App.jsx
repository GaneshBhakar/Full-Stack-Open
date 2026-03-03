import { useState, useEffect}  from 'react'
import countryServices from './services/countries'
import Filter from './components/filter'
import Countries from './components/Countries'


const App = () => {
  const [searched, setSearched] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    countryServices
      .getAll()
      .then(initialData => setData(initialData))
  }, [])

  const derived = data.filter(country =>
    country.name.common.toLowerCase().includes(searched.toLowerCase())
  )

  return (
    <div>
      <Filter value={searched} onChange={(e) => setSearched(e.target.value)} />
      <Countries countries={derived} setSearched={setSearched} />
    </div>
  )
}

export default App