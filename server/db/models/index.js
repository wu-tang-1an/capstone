const db = require('../db')
const Sequelize = require('sequelize')

const User = require('./user')
const Task = require('./task')
const Organization = require('./organization')
const Column = require('./column')
const Project = require('./project')

const UserOrganization = db.define('user_organization', {
  role: {
    type: Sequelize.ENUM,
    values: ['owner', 'co-owner', 'user', 'admin'],
    defaultValue: 'user',
  },
})

const UserTask = db.define('user_task', {
  ProjectId: {
    type: Sequelize.INTEGER,
  },
})

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//user and org association
User.belongsToMany(Organization, {through: UserOrganization})
Organization.belongsToMany(User, {through: UserOrganization})

//user and task association and through table
Task.belongsToMany(User, {through: UserTask})
User.belongsToMany(Task, {through: UserTask})

Project.belongsTo(Organization)
Organization.hasMany(Project)

Task.belongsTo(Column)
Column.hasMany(Task)

Column.belongsTo(Project)
Project.hasMany(Column)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  Organization,
  Task,
  User,
  Column,
  Project,
  UserOrganization,
  UserTask,
}
