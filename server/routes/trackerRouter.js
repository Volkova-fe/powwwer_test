const Router = require('express')
const router = new Router()
const trackerController = require('../controllers/trackerController')


router.post('/action', trackerController.create)
//get all tracker actions for report
router.get('/:id/:date', trackerController.getAll)


module.exports = router