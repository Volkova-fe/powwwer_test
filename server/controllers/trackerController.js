const { Tracker } = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role, name) => {
	return jwt.sign(
		{ id, email, role, name },
		process.env.SECRET_KEY,
		{ expiresIn: '24h' }
	)
}

class TrackerController {
	async create(req, res, next) {
		/*#swagger.tags = ['tracker']
		#swagger.description = 'Add a new track to the base'
		#swagger.parameters['TrackerCreate'] = { 
			in: 'body',
			description: 'Create a new track to the base',
			schema: { $ref: "#/definitions/TrackerCreate" }
			}
			#swagger.responses[200] = {
				description: 'Track create success',
				schema: { $ref: '#/definitions/TrackerCreateSuccess' }
				}
			#swagger.responses[400] = {
				description: 'Invalid request data',
				}
		*/
		const { type, time, date } = req.body
		const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name)
		const tracker = await Tracker.create({ type, time, date, userId: req.user.id })
		if (!tracker) {
			return next(ApiError.badRequest('не корректное действие'))
		}
		return res.json({ message: 'success' })
	}

	async getSelectDay(req, res, next) {
		/*#swagger.tags = ['tracker']
		#swagger.description = 'Get select day tracks from base. Example id: "10" date: 2022-12-04'
			#swagger.responses[400] = {
				description: 'Invalid request data',
				}
		*/
		let { date } = req.params
		const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name)
		const tracker = await Tracker.findAll({
			where: {
				date: date,
				userId: req.user.id,
			}
		})
		if (!tracker) {
			return next(ApiError.badRequest('нет действий'))
		}
		return res.json(tracker)
	}

	async getRangeDate(req, res, next) {
		/*#swagger.tags = ['tracker']
		#swagger.description = 'Get range date tracks from base. Example id: "10" from: 2022-12-04, to: 2022-12-06'
			#swagger.responses[400] = {
				description: 'Invalid request data',
				}
		*/
		let { from, to} = req.params
		const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name)
		const tracker = await Tracker.findAll({
			where: {
				date: {
					[Op.gte]: from,
					[Op.lte]: to,
				},
				userId: req.user.id,
			}
		})
		if (!tracker) {
			return next(ApiError.badRequest('нет действий'))
		}
		return res.json(tracker)
	}
}


module.exports = new TrackerController()