const { TrackerType } = require('../models/models')
const ApiError = require('../error/ApiError')

class TrackerTypeController {
	async create(req, res, next) {
		const {name} = req.body
		const type = await TrackerType.create({name})
		if(!type) {
			return next(ApiError.badRequest('не задан ID'))
		}
		return res.json(type)
	}

	async getAll(req, res, next) {
		const types = await TrackerType.findAll()
		if(!types) {
			return next(ApiError.badRequest('не задан ID'))
		}
		return res.json(types)
	}
}

module.exports = new TrackerTypeController()