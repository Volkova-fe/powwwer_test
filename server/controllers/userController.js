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
		const { email, password, name, role = 'USER' } = req.body
		try {
			if (!email || !password) {
				return next(ApiError.badRequest('Не корректный email или password'))
			}
			if (!['USER', 'ADMIN'].includes(role)) {
				throw new Error('Недопустимое значение роли')
			}
			const candidate = await User.findOne({ where: { email } })
			if (candidate) {
				return next(ApiError.regRequest('Пользователь с таким email уже существует'))
			}
			const hashPassword = await bcrypt.hash(password, 5)
			const user = await User.create({ email, name, password: hashPassword, role })
			const token = generateJwt(user.id, user.email, user.name, user.role)
			return res.json({ email, name, token })
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}

	}

	async login(req, res, next) {
		const { email, password } = req.body
		const user = await User.findOne({ where: { email } })
		if (!user) {
			return next(ApiError.internal('Пользователь не найден'))
		}
		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return next(ApiError.internal('Указан не верный пароль'))
		}
		const token = generateJwt(user.id, user.email, user.role, user.name)
		return res.json({ email, token, id: user.id })
	}

	async logout(req, res, next) {
		try {
			res.clearCookie('token');
			return res.json({message: 'success'});
		} catch (e) {
			next(e);
		}
	}

	async remove(req, res, next) {
		const { email } = req.body
		if (!email) {
			return next(ApiError.internal('Не указан email пользователя'))
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
		const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name)
		return res.json({id: req.user.id, email: req.user.email, name: req.user.name})
	}
}

module.exports = new UserController()