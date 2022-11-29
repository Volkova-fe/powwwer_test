const Router = require('express')
const router = new Router()
const reportRouter = require('./reportRouter')
const userRouter = require('./userRouter')
const trackerTypeRouter = require('./trackerTypeRouter')


router.use('/user', userRouter)
router.use('/tracker-type', trackerTypeRouter)
router.use('/report', reportRouter)

module.exports = router