import phoneServices from "./../services/phone"

const Persons = ({ persons, search, setPersons }) => {
	const handleClick = (person) => {
		let ans = window.confirm(`Delete ${person.name}`)
		if(ans){
			phoneServices.del(person.id).then(() => {
				setPersons(prev => prev.filter(p => p.id !== person.id))
			})
		}
	}

	return (
		<>
			{persons
			.filter(person =>
				person.name.toLowerCase().includes(search.toLowerCase())
			)
			.map(person => 
				<div key={person.name}>{person.name} {person.number}
				<button onClick={() => handleClick(person)}>delete</button>
				</div>
			)}
		</>
	)
}

export default Persons