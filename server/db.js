const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialectOptions: {
            dateStrings: true,
            typeCast: true,
            timezone: "+7:00"
        },
        idleTimeoutMillis: 1,
        max: 1000,
        connectionTimeoutMillis: 10000,
    }
)