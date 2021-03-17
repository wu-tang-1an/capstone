const Sequelize = require('sequelize')
const db = require('../db')

const Organization = require('./organization')
const User = require('./user')

const UserOrganization = db.define('userorganization', {
  role: {
    type: Sequelize.ENUM,
    values: ['owner', 'co-owner', 'user', 'admin']
  },

  orgId: {
    type: Sequelize.INTEGER,
    references: {
      model: Organization,
      key: 'id'
    }
  },

  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
})

module.exports = UserOrganization
