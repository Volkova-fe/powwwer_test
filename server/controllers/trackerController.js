const { Tracker } = require('../models/models')
const ApiError = require('../error/ApiError')

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
		const { type, time, date, id } = req.body
		const tracker = await Tracker.create({ type, time, date, userId: id })
		if (!tracker) {
			return next(ApiError.badRequest('не корректное действие'))
		}
		return res.json({ message: 'success' })
	}

	async getAll(req, res, next) {
		/*#swagger.tags = ['tracker']
		#swagger.description = 'Get all tracks from base. Example id: "10" date: 2022-12-04'
			#swagger.responses[400] = {
				description: 'Invalid request data',
				}
		*/
		let { date, id } = req.params
		const tracker = await Tracker.findAll({
			where: {
				date: date,
				userId: id,
			}
		})
		if (!tracker) {
			return next(ApiError.badRequest('нет действий'))
		}
		return res.json(tracker)
	}
}

module.exports = new TrackerController()