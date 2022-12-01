const { Tracker } = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require('@sequelize/core');

class TrackerController {
	async create(req, res, next) {
		const { type, time, date, id } = req.body
		const tracker = await Tracker.create({ type, time, date, userId: id })
		if (!tracker) {
			return next(ApiError.badRequest('не корректное действие'))
		}
		return res.json({ message: 'success' })
	}

	async getAll(req, res, next) {
		const { date, id } = req.params
		const tracker = await Tracker.findAll({
			where: {
				date: date,
				userId: id,
			}
		})
		if (!tracker) {
			return next(ApiError.badRequest('нет действий'))
		}
		return res.json({ tracker })
	}
}

module.exports = new TrackerController()