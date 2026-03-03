import { useState, useEffect } from 'react'
import phoneServices from './services/phone'
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
    phoneServices
      .getAll()
      .then(initialResponse => {
        setPersons(initialResponse)
      })
    }, [])
  console.log('render', persons.length, 'notes')

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if(existingPerson){
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)

      if(confirmUpdate){
        phoneServices
          .update(existingPerson.id, personObject)
          .then(updatedPerson => {
            setPersons(prev =>
            prev.map(p =>
              p.id !== existingPerson.id ? p : updatedPerson
            )
          )
          setNewName('')
          setNewNumber('')
          })
      }
      else{
        phoneServices
        .create(personObject)
        .then(initialResponse =>{
          setPersons(persons.concat(initialResponse)),
          setNewName('')
          setNewNumber('')
        })
      }
    }
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
      <Persons persons={persons} search={search} setPersons={setPersons}/>
    </div>
  )
}

export default App