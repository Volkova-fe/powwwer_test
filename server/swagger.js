const swaggerAutogen = require('swagger-autogen')()

const outputFile = './open-api-doc.json'
const endpointsFiles = ['./routes/index.js']
//create models for swagger doc api
const doc = {
	info: {
		title: 'Work tracker API',
		description: 'Work tracker API'
	},
	definitions: {
		Registration: {
			email: '123@ya.ru',
			password: 'hello123',
			name: 'Maria'
		},
		RegistrationSuccess: {
			email: '123@ya.ru',
			name: 'Maria',
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiMTIzQHlhLnJ1Iiwicm9sZSI6Ik1hcmlhIiwibmFtZSI6IlVTRVIiLCJpYXQiOjE2NzAwNzY2NzYsImV4cCI6MTY3MDE2MzA3Nn0.9ry9KvUd9zQFRgern1dQ2DOAEpj3PymUgAizY32qSAU',
			id: '1'
		},
		Login: {
			email: '123@ya.ru',
			password: 'hello123',
		},
		LoginSuccess: {
			email: '123@ya.ru',
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiMTIzQHlhLnJ1Iiwicm9sZSI6Ik1hcmlhIiwibmFtZSI6IlVTRVIiLCJpYXQiOjE2NzAwNzY2NzYsImV4cCI6MTY3MDE2MzA3Nn0.9ry9KvUd9zQFRgern1dQ2DOAEpj3PymUgAizY32qSAU',
			id: 1
		},
		Logout: {
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiMTIzQHlhLnJ1Iiwicm9sZSI6Ik1hcmlhIiwibmFtZSI6IlVTRVIiLCJpYXQiOjE2NzAwNzY2NzYsImV4cCI6MTY3MDE2MzA3Nn0.9ry9KvUd9zQFRgern1dQ2DOAEpj3PymUgAizY32qSAU'
		},
		LogoutSuccess: {
			message: 'success'
		},
		Remove: {
			email: '123@ya.ru'
		},
		RemoveSuccess: {
			message: 'Пользователь удален'
		},
		AuthSuccess: {
			id: 1,
			email: '123@ya.ru',
			name: 'Maria'
		},
		TrackerCreate: {
			type: 'Начал',
			time: '10:22:55',
			date: '2022-12-02',
			id: '1'
		},
		TrackerCreateSuccess: {
			message: 'success'
		},
		TrackerSelectDay: {
			id: '1',
			date: '2022-12-02',
		},
		TrackerRangeDays: {
			id: '1',
			from: '2022-12-02',
			to: '2022-12-05',
		},
	},
	host: 'localhost:5002/api',
	schemes: ['http']
}
//call func for generation swagger doc api
swaggerAutogen(outputFile, endpointsFiles, doc)