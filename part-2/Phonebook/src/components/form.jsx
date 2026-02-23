const Form = (props) => {
	return (
		<form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>number: <input value={props.newNumber} onChange={(event) => props.setNewNumber(event.target.value)}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
	)
}

export default Form