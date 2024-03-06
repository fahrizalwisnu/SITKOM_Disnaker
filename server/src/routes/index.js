const fs = require('fs')
const path = require('path')

const routes = {};

// Membaca semua file dalam folder dan menyaring file dengan ekstensi .js
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const routeName = path.basename(file, '.js');
    routes[routeName] = require(`./${file}`);
  });

module.exports = routes;