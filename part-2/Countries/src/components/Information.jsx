import Weather from './weather'

const ShowInfo = ({ country,  }) => {
		const languages = Object.values(country.languages || {})
		return (
			<div>
				<h2>{country.name.common}</h2>
				<p>Capital: {country.capital?.[0]}</p>
				<p>Area: {country.area}</p>
				<h3>Languages</h3>
				<ul>
					{languages.map(lang => (
					<li key={lang}>{lang}</li>
					))}
				</ul>
				<img src={country.flags.png} alt="flag" width="150" />

				<Weather city={country?.capital[0]}/>
			</div>
		)
}

export default ShowInfo