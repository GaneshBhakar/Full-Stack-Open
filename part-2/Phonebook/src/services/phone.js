import axios from 'axios'

// const baseUrl = 'http://localhost:3001/persons'
// const baseUrl = '/api/persons'     //via proxy method
const baseUrl = 'http://localhost:3001/api/persons'   //via cors

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const getAll = () => {
	const request =  axios.get(baseUrl)
	return request.then(response => response.data)
}

const del = id => {
	const url = `${baseUrl}/${id}`
	const request = axios.delete(url)
	return request.then(response => response.data)
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	return request.then(response => response.data)
}

export default { getAll, create, del, update}