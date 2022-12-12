const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Tracker = sequelize.define('tracker', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
})


User.hasMany(Tracker)
Tracker.belongsTo(User)


module.exports = {
    User,
    Tracker,
}

