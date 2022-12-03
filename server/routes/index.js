const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const trackerRouter = require('./trackerRouter')


router.use('/user', userRouter)
router.use('/tracker', trackerRouter)

module.exports = router