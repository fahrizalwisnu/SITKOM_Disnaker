const fs = require('fs')
const path = require('path')

const errors = {}

fs
	.readdirSync(__dirname)
	.filter(file =>
		file !== 'index.js'
	)
	.forEach(file => {
		const error = require(path.join(__dirname, file))
		errors[error.name] = error
	})

module.exports = errors