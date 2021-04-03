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
    type: Sequelize.DATE,
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

module.exports = Task
