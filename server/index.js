require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cookieParser = require('cookie-parser')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5003

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/api', router)


app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server start ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()