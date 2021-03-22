const moment = require('moment')
const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
  name: {
    type: Sequelize.STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
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
  completionDate: {
    type: Sequelize.STRING,
  },
})

Task.prototype.getDescription = function () {
  return this.description
}

Task.prototype.getName = function () {
  return this.name
}

Task.prototype.getDate = function () {
  return this.completionDate
}

Task.prototype.getTimeLeft = function () {
  const today = new Date(moment().format('L'))
  let result = this.completionDate - today
  result = result / 60000

  //this will return the amount of the days left
  return result
}

module.exports = Task
