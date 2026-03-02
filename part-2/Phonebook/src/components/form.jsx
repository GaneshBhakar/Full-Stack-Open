const Form = ({ addPerson, newName, handleNameChange, newNumber, setNewNumber } ) => {
	return (
		<form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
	)
}

export default Form