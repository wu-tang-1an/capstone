const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  createdBy: {
    type: Sequelize.STRING,
  },

  description: {
    type: Sequelize.TEXT,
  },

  status: {
    type: Sequelize.ENUM,
    values: ['in-progress', 'todo', 'done', 'review'],
  },
})

module.exports = Task
