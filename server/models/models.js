const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING},
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const TrackerType = sequelize.define('tracker-type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Report = sequelize.define('report', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

TrackerType.hasMany(Report)
Report.belongsTo(TrackerType)

User.hasMany(Report)
Report.belongsTo(User)

module.exports = {
    User,
    TrackerType,
    Report,
}