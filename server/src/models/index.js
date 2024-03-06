const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
	config.db.database,
	config.db.username,
	config.db.password,
	config.db.options,
)

fs
	.readdirSync(__dirname)
	.filter(file =>
		file !== 'index.js'
	)
	.forEach(file => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize)
		db[model.name] = model
	})

Object.keys(db).forEach(function (modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db)
	}
})

db.Role.hasMany(db.User, {
	foreignKey: 'roleId',
	as: 'User'
})
db.User.belongsTo(db.Role, {
	foreignKey: 'roleId',
	as: 'Role'
})

db.User.hasMany(db.Peserta, {
	foreignKey: 'userId',
	as: 'Peserta'
})
db.Peserta.belongsTo(db.User, {
	foreignKey: 'userId',
	as: 'User'
})
db.Peserta.belongsTo(db.Jadwal, {
	foreignKey: 'jadwalId',
	as: 'Jadwal'
})

db.Pelatihan.hasMany(db.Jadwal, {
	foreignKey: 'pelatihanId',
	as: 'Jadwal'
})
db.Jadwal.belongsTo(db.Pelatihan, {
	foreignKey: 'pelatihanId',
	as: 'Pelatihan'
})

db.User.hasMany(db.Kartu_Kuning, {
	foreignKey: 'userId',
	as: 'kartuKuning'
})
db.Kartu_Kuning.belongsTo(db.User, {
	foreignKey: 'userId',
	as: 'user'
})

db.Pelatihan.belongsTo(db.User, {
	foreignKey: 'trainerId',
	as: 'User'
})
db.User.hasMany(db.Pelatihan, {
	foreignKey: 'trainerId',
	as: 'Pelatihan'
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db