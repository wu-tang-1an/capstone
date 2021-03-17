const Sequelize = require('sequelize')
const db = require('../db')

const Task = require('./task')
const User = require('./user')

const UserTask = db.define('usertask', {
  taskId: {
    type: Sequelize.INTEGER,
    references: {
      model: Task,
      key: 'id',
    },
  },

  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
})

module.exports = UserTask
