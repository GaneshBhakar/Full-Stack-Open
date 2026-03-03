const Countries = ({ countries }) => {
	if(countries.length > 10)
		return (
		<p>Too many matches, specify another filter</p>
	)
	if(countries.length <= 10 && countries.length > 1){
		return (
			<div>
				{countries.map(country =>(
					<p key={country.cca3}>{country.name.common}</p>
				))}
			</div>
		)
	}
	if(countries.length === 1){
		const country = countries[0]
		const languages = Object.values(country.languages || {})
		return (
			<div>
				<h2>{country.name.common}</h2>
				<p>Capital: {country.capital[0]}</p>
				<p>Area: {country.area}</p>
				<h3>Languages</h3>
				<ul>
					{languages.map(lang => (
					<li key={lang}>{lang}</li>
					))}
				</ul>
				<img src={country.flag.png} alt="flag" width="150" />
			</div>
		)
	}
	return null
}

export default Countries