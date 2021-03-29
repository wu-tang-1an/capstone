const moment = require('moment')
const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'This field is <strong>Markdown-enabled</strong>',
  },
  completionDate: {
    type: Sequelize.STRING,
  },
  createdBy: {
    type: Sequelize.STRING,
  },
  editTimeStamp: {
    type: Sequelize.DATE,
  },
  isActiveBadge: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  index: {
    type: Sequelize.INTEGER,
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
