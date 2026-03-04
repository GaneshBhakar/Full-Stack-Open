import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY
console.log(api_key)

const Weather = ({ city }) => {
	const [weather, setWeather] = useState(null)
	useEffect(() => {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`

		axios.get(url)
			.then(response => {
				setWeather(response.data)
			})
	}, [city])

	if(!weather)
		return <p>Loading weather ...</p>

	const icon = weather.weather[0].icon
  	const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
	
	return (
		<div>
			<h3>Weather in {city}</h3>
			<p>Temperature {weather.main.temp} Celcius</p>
			<img src={iconUrl} alt="icon" width="150" />
			<p>Wind {weather.wind.speed} m/s</p>
		</div>
	)
}

export default Weather