const Sequelize = require('sequelize')
const db = require('../db')

const Project = db.define('project', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  status: {
    type: Sequelize.ENUM('in-progress', 'complete'),
    defaultValue: 'in-progress',
  },

  description: {
    type: Sequelize.TEXT,
    defaultValue: '',
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://unsplash.it/200/200',
    validate: {
      isUrl: true,
    },
  },
})

module.exports = Project
