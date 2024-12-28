const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/app.db',
  retry: {
    match: [/SQLITE_BUSY/],
    max: 5, // Número de tentativas
  },
})

module.exports = sequelize