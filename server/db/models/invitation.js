const Sequelize = require('sequelize')
const db = require('../db')

const Invitation = db.define('invitation', {
  orgId: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  orgPicture: {
    type: Sequelize.STRING,
  },
  orgName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Invitation
