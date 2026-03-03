import { useState, useEffect } from 'react'
import axios from 'axios'

const ShowInfo = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [lat, lon] = country.capitalInfo?.latlng || []

  const apiKey = import.meta.env.VITE_WEATHER_KEY
  const capital = country.capital?.[0]
  console.log("API KEY:", apiKey)

  useEffect(() => {
    if (!capital) return

    const url =  `https://api.openweathermap.org/data/2.5/weather` +
      `?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`

    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.log("Weather fetch error:", error)
      })

  }, [apiKey, lat, lon])

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

			{weather && (
				<>
				<h3>Weather in {capital}</h3>
				<p>Temperature: {weather.main.temp} °C</p>
				<p>Wind: {weather.wind.speed} m/s</p>

				<img
					src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
					alt="weather icon"
				/>
				</>
			)}
		</div>
	)
}

export default ShowInfo