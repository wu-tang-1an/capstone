const moment = require('moment')
const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
  description: {
    type: Sequelize.TEXT,
  },
  completionDate: {
    type: Sequelize.STRING,
  },
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
})

Task.prototype.getDescription = function () {
  return this.description
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
