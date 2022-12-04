const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/models')

const generateJwt = (id, email, role, name) => {
	return jwt.sign(
		{ id, email, role, name },
		process.env.SECRET_KEY,
		{ expiresIn: '24h' }
	)
}

class UserController {
	async registration(req, res, next) {
		/*#swagger.tags = ['user']
		#swagger.description = 'Add a new user to the base'
		#swagger.parameters['Registration'] = { 
			in: 'body',
			description: 'Create a new user to the base',
			schema: { $ref: "#/definitions/Registration" }
			}
			#swagger.responses[200] = {
				description: 'Registration success',
				schema: { $ref: '#/definitions/RegistrationSuccess' }
				}
			#swagger.responses[400] = {
				description: 'Invalid request data',
				}
			#swagger.responses[409] = {
				description: 'User already exists in the base',
				}
		*/
		const { email, password, name, role = 'USER' } = req.body
		try {
			if (!email || !password) {
				return next(ApiError.badRequest('Не корректный email или password'))
			}
			const candidate = await User.findOne({ where: { email } })
			if (candidate) {
				return next(ApiError.regRequest('Пользователь с таким email уже существует'))
			}

			const hashPassword = await bcrypt.hash(password, 5)
			const user = await User.create({ email, name, password: hashPassword, role })
			const token = generateJwt(user.id, user.email, user.name, user.role)
			return res.json({ email, name, token, id: user.id })
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}

	}

	async login(req, res, next) {
		/*#swagger.tags = ['user']
		#swagger.description = 'Login user'
		#swagger.parameters['Login'] = { 
			in: 'body',
			description: 'Login user',
			schema: { $ref: "#/definitions/Login" }
			}
			#swagger.responses[200] = {
				description: 'Login success',
				schema: { $ref: '#/definitions/LoginSuccess' }
				}
			#swagger.responses[400] = {
				description: 'Invalid request data',
				}
		*/
		const { email, password } = req.body
		const user = await User.findOne({ where: { email } })
		if (!user) {
			return next(ApiError.badRequest('Пользователь не найден'))
		}
		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return next(ApiError.badRequest('Указан не верный пароль'))
		}
		const token = generateJwt(user.id, user.email, user.role, user.name)
		return res.json({ email, token, id: user.id })
	}

	async logout(req, res, next) {
		/*#swagger.tags = ['user']
		#swagger.description = 'Logout user'
		#swagger.parameters['Logout'] = { 
			in: 'body',
			description: 'Logout user',
			schema: { $ref: "#/definitions/Logout" }
			}
			#swagger.responses[200] = {
				description: 'Logout success',
				schema: { $ref: "#/definitions/LogoutSuccess" }
				}
			#swagger.responses[400] = {
				description: 'Invalid request data',
				}
		*/
		try {
			res.clearCookie('token');
			return res.json({ message: 'success' });
		} catch (e) {
			next(e);
		}
	}

	async remove(req, res, next) {
		/*#swagger.tags = ['user']
		#swagger.description = 'Remove user'
		#swagger.parameters['Remove'] = { 
			in: 'body',
			description: 'Remove user',
			schema: { $ref: "#/definitions/Remove" }
			}
			#swagger.responses[200] = {
				description: 'Remove success',
				schema: { $ref: "#/definitions/RemoveSuccess" }
				}
			#swagger.responses[400] = {
				description: 'Invalid request data',
				}
		*/
		const { email } = req.body
		if (!email) {
			return next(ApiError.badRequest('Не указан email пользователя'))
		}
		const user = await User.findOne({ where: { email } })
		if (!user) {
			throw new Error('Пользователь не найден в БД')
		}
		await user.destroy()
		res.clearCookie('token');
		return res.json({ message: 'Пользователь удален' })
	}

	async check(req, res) {
		/*#swagger.tags = ['user']
		#swagger.description = 'Check authorization user. Dont forget add Bearer with space'
		#swagger.parameters['Auth'] = { 
			"name": "authorization",
			"security": [{ "Bearer": [] }],
         "in": "header",
         "type": "string"
			}
			#swagger.responses[200] = {
				description: 'Authorization success',
				schema: { $ref: "#/definitions/AuthSuccess" }
				}
			#swagger.responses[401] = {
				description: 'Authorization failed',
				}
		*/
		const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name)
		return res.json({ id: req.user.id, email: req.user.email, name: req.user.name })
	}
}

module.exports = new UserController()