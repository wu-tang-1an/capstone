const Sequelize = require('sequelize')
const db = require('../db')

const Comment = db.define('comment', {
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  editTimeStamp: {
    type: Sequelize.DATE,
  },
})

module.exports = Comment
