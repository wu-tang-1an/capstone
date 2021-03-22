const Sequelize = require('sequelize')
const db = require('../db')

const Column = db.define('column', {
  name: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
})

module.exports = Column
