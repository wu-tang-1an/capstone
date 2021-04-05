const db = require('../db')
const Sequelize = require('sequelize')

const User = require('./user')
const Task = require('./task')
const Organization = require('./organization')
const Column = require('./column')
const Project = require('./project')
const Comment = require('./comment')
const Invitation = require('./invitation')

const UserOrganization = db.define('user_organization', {
  role: {
    type: Sequelize.ENUM,
    values: ['owner', 'co-owner', 'user', 'admin'],
    defaultValue: 'user',
  },
})

const UserTask = db.define('user_task')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//user and org association
User.belongsToMany(Organization, {through: UserOrganization})
Organization.belongsToMany(User, {through: UserOrganization})

Task.belongsToMany(User, {through: UserTask})
User.belongsToMany(Task, {through: UserTask})

Comment.belongsTo(User)
User.hasMany(Comment)

Comment.belongsTo(Task, {onDelete: 'cascade'})
Task.hasMany(Comment)

Project.belongsTo(Organization, {onDelete: 'cascade'})
Organization.hasMany(Project)

Task.belongsTo(Column, {onDelete: 'cascade'})
Column.hasMany(Task)

Column.belongsTo(Project, {onDelete: 'cascade'})
Project.hasMany(Column)

Invitation.belongsTo(User, {onDelete: 'cascade'})
User.hasMany(Invitation)

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
  Comment,
  UserOrganization,
  UserTask,
  Invitation,
}
