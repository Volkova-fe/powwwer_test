const Router = require('express')
const router = new Router()
const trackerTypeController = require('../controllers/trackerTypeController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', trackerTypeController.create)
router.get('/', trackerTypeController.getAll)

module.exports = router