const sequelize = require('../db')
const { DataTypes } = require('sequelize')
const moment = require('moment');

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
    date: {
        type: DataTypes.DATE(6),
        get() {
            return moment(this.getDataValue('date')).locale('ru').format('DD-MM-YYYY HH:mm:ss');
        },
        allowNull: false
    },
})


User.hasMany(Tracker)
Tracker.belongsTo(User)


module.exports = {
    User,
    Tracker,
}

