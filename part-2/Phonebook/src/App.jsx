import { useState, useEffect } from 'react'
import phoneServices from './services/phone'
import Filter from './components/filter'
import Form from './components/form'
import Persons from './components/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)

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
          .then(() => {
            setNotification({ message: `Updated ${existingPerson.name}`, type: 'success' })
            setTimeout(() => setNotification(null), 5000)
          })
          .catch(() => {
            setNotification({
              message: `Information of ${existingPerson.name} has already been removed from server`,
              type: 'error'
            })
            setTimeout(() => setNotification(null), 5000)
            setPersons(prev =>
              prev.filter(p => p.id !== existingPerson.id)
            )
          })
      }
    }
    else{
        phoneServices
        .create(personObject)
        .then(initialResponse =>{
          setPersons(persons.concat(initialResponse))
          setNewName('')
          setNewNumber('')
        })
        .then(() => {
          setNotification({ message: `Added ${personObject.name}`, type: 'success' })
          setTimeout(() => setNotification(null), 5000)
      })
      }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification?.message} type={notification?.type} />
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