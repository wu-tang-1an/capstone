const Sequelize = require('sequelize')
const db = require('../db')



const Organization = db.define('organization', {

  name: {
    type: Sequelize.STRING,
    allowNull: false,

  },

  imageUrl: {
    type: Sequelize.STRING,
    default: 'https://images-na.ssl-images-amazon.com/images/I/41UQFhW1eUL._AC_SX425_.jpg'
  }



})

module.exports = Organization
