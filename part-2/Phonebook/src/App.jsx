import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import Form from './components/form'
import Persons from './components/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(
    person => person.name.toLowerCase() === newName.toLowerCase()
  )

  if(nameExists){
    alert(`${newName} is already added to phoebook`)
    return
  }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    axios
      .post('http://localhost:3001/persons')
      .then(response =>
        setPersons(persons.concat(response.data)),
        setNewName(''),
        setNewNumber('')
      )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch}/>

      <h2>add a new</h2>
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        setNewNumber={setNewNumber} 
      />

      <h2>Numbers</h2>
      <Persons persons={persons} search={search} />
    </div>
  )
}

export default App