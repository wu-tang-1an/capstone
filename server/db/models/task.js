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
  createdBy: {
    type: Sequelize.STRING,
  },
  isActiveBadge: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

Task.prototype.getTimeLeft = function () {
  const today = new Date(moment().format('L'))
  let result = this.completionDate - today
  result = result / 60000

  //this will return the amount of the days left
  return result
}

module.exports = Task
