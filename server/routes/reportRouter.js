const Router = require('express')
const router = new Router()
const reportController = require('../controllers/reportController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', reportController.create)
router.get('/', reportController.getAll)
router.get('/:id', reportController.getPersonal)

module.exports = router 