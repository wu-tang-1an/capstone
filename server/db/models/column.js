const Sequelize = require('sequelize')
const db = require('../db')

const Column = db.define('column', {
  name: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
})

module.exports = Column
