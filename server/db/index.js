const db = require('./db')
const Sequelize = require('sequelize')

const {User, Task, Organization} = require('./models/index')

// register models
require('./models')

const UserOrganization = db.define('user_organization', {
  role: {
    type: Sequelize.ENUM,
    values: ['owner', 'co-owner', 'user', 'admin']
  },

  OrgId: {
    type: Sequelize.INTEGER,
    references: {
      model: Organization,
      key: 'id'
    }
  },

  UserId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
})

User.belongsToMany(Organization, {through: UserOrganization})
Organization.belongsToMany(User, {through: UserOrganization})

const UserTask = db.define('user_task', {
  TaskId: {
    type: Sequelize.INTEGER,
    references: {
      model: Task,
      key: 'id'
    }
  },

  UserId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
})

Task.belongsToMany(User, {through: UserTask})
User.belongsToMany(Task, {through: UserTask})

module.exports = db
