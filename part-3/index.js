require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))
const Person = require('./models/persons')

const PORT = process.env.PORT
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
	// response.json(persons)
	Person.find({}).then(persons => {
		response.json(persons)
	})
})

app.get('/info', (request, response) => {
	// const requestTime = new Date()
	// response.send(`Phonebook has info for ${persons.length} people <br> ${requestTime}`)
	Person.countDocuments({})
		.then(count => {
			const requestTime = new Date()
			response.send(`Phonebook has info for ${count} people <br> ${requestTime}`)
		})
})

app.get('/api/persons/:id', (request, response, next) => {
	// const id = request.params.id
	// const person = persons.find(person => person.id === id)

	// if(person){
	// 	response.json(person)
	// }else{
	// 	response.status(404).end()
	// }

	Person.findById(request.params.id)
		.then(person => {
			if(person){
				response.json(person)
			} else{
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body
	const person = {
		name: body.name,
		number: body.number
	}
	Person.findByIdAndUpdate(
		request.params.id,
		person,
		{ new: true, runValidators: true, context: 'query' }
	)
	.then(updatedPerson => {
		if(updatedPerson){
			response.json(updatedPerson)
		} else {
			response.status(404).end()
		}
	})
	.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	// const id = request.params.id
	// persons = persons.filter(person => person.id !== id)

	// response.status(204).end()

	Person.findByIdAndDelete(request.params.id)
		.then(response => {
			if(result){
				response.status(204).end()
			}else{
				 response.status(404).end()
			}
		})
		.catch(error => next(error))
})

const generateId = () => {
	return Math.floor(Math.random() * 1000000000)
}

app.post('/api/persons', (request, response, next) => {
	const body = request.body
	 
	if(!body.name || !body.number){
		return response.status(400).json({ 
		error: 'content missing' 
		})
	}

	// const nameExists = persons.find(person => person.name === body.name)
	// if(nameExists){
	// 	return response.status(400).json({
    //   	error: 'name must be unique'
    // })
	// }
	// const person = {
	// 	id: generateId().toString(),
	// 	name: body.name,
	// 	number: body.number || false,
	// }
	// persons = persons.concat(person)
  	// response.json(person)

	const person = new Person({
		id: generateId().toString(),
		name: body.name,
		number: body.number || false,
	})

	person.save()
		.then(savedPerson => {
			response.json(savedPerson)
		})
		.catch(error => next(error))
})

// const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
	console.log(error)
	if(error.name === 'CastError'){
		return response.status(400).send({ error: 'malformatted id' })
	} else if(error.name === 'ValidationError'){
		return response.status(400).json({ error: error.message})
	}
	next(error)
}

app.use(errorHandler)