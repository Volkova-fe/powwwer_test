const { Tracker } = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const { getHours, getMinutes, getSeconds, getYear, getMonth, getDate } = require('date-fns');

const formatDate = `${getYear(new Date())}-${getMonth(new Date()) + 1}-${getDate(new Date())} ${getHours(new Date())}:${getMinutes(new Date())}:${getSeconds(new Date())}`;


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
		const { type } = req.body
		const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name)
		const tracker = await Tracker.create({ type, date: formatDate, userId: req.user.id })
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
				date: {
					[Op.gte]: `${date} 00:00:00`,
					[Op.lte]: `${date} 23:59:59`,
				},
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
		let { from, to } = req.params
		const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name)
		const tracker = await Tracker.findAll({
			where: {
				date: {
					[Op.gte]: `${from} 00:00:00`,
					[Op.lte]: `${to} 23:59:59`,
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