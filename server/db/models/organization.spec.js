/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Organization = db.model('organization')

describe('Organization Model', () => {
  beforeEach(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('has fields name, imageUrl', async () => {
    try {
      const organization = await Organization.create({
        name: 'awesome org',
        imageUrl: 'http://www.image.com',
      })
      const foundOrganization = await Organization.findByPk(1)
      expect(foundOrganization.dataValues).to.deep.include({
        name: 'awesome org',
        imageUrl: 'http://www.image.com',
      })
    } catch (err) {
      console.error(err)
    }
  })

  it('uses a default image if none is provided', async () => {
    try {
      const organization = await Organization.create({
        name: 'awesome org',
      })
      const foundOrganization = await Organization.findByPk(1)
      expect(foundOrganization.dataValues).to.deep.include({
        name: 'awesome org',
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/41UQFhW1eUL._AC_SX425_.jpg',
      })
    } catch (err) {
      console.error(err)
    }
  })
})
