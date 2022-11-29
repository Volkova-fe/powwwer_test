const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const { Report } = require('../models/models')

class ReportController {
	async create(req, res, next) {
		try {
			let { userId, trackerTypeId } = req.body
			const report = await Report.create({ userId, trackerTypeId })
			return res.json(report)
		} catch (e) {
			return next(ApiError.badRequest(e.message))
		}

	}

	async getAll(req, res) {
		let { userId } = req.query
		let report = await Report.findAndCountAll()
		return res.json(report)
	}

	async getPersonal(req, res) {
		const { userId } = req.params
		const report = await Report.findAll(
			userId
		)
		return res.json(report)
	}
}

module.exports = new ReportController()