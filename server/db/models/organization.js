const Sequelize = require('sequelize')
const db = require('../db')

const getRandNum = () => Math.ceil(Math.random() * 10000)

const Organization = db.define('organization', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: `https://source.unsplash.com/600x400/?headquarters,sig=${getRandNum()}`,
  },
})

module.exports = Organization
