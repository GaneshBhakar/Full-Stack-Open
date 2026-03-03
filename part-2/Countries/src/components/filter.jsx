

const Filter = ({ value, onChange }) => {
	return (
		<div>
			find Countries 
			<input value={value} onChange={onChange} />
		</div>
	)
}

export default Filter