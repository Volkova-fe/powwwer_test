const Router = require('express')
const router = new Router()
const trackerController = require('../controllers/trackerController')


router.post('/action', trackerController.create)
router.get('/:id', trackerController.getAll)


module.exports = router