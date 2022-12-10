const Router = require('express')
const router = new Router()
const trackerController = require('../controllers/trackerController')
const trackerMiddleware = require('../middleware/trackerMiddleware')


router.post('/action', trackerMiddleware, trackerController.create)
//get all tracker actions for report
router.get('/:date', trackerMiddleware, trackerController.getSelectDay)
router.get('/:from/:to', trackerMiddleware, trackerController.getRangeDate)

module.exports = router