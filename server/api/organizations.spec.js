/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Organization = db.model('organization')
const User = db.model('user')

describe('Organization routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/organizations/', () => {
    const testOrg = {
      name: 'Test Organization',
    }

    beforeEach(() => {
      return Organization.create(testOrg)
    })

    it('GET /api/organizations', async () => {
      try {
        await request(app)
          .get('/api/organizations')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].name).to.be.equal(testOrg.name)
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    // it('GET /api/organizations/:orgId', async () => {
    //   try {
    //     await request(app)
    //       .get('/api/organizations/1')
    //       .expect(200)
    //       .then((res) => {
    //         expect(res.body).to.be.an('object')
    //         expect(res.body.name).to.be.equal(testOrg.name)
    //       })
    //   } catch (error) {
    //     console.log(error)
    //     throw error
    //   }
    // })

    it('GET /api/organizations/:orgId/users', async () => {
      const testMan = {
        firstName: 'Test',
        lastName: 'Man',
        email: 'testman@email.com',
      }

      const userTest = await User.create(testMan)
      const orgTest = await Organization.findByPk(1)

      await orgTest.addUsers(userTest)

      try {
        await request(app)
          .get('/api/organizations/1/users')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.name).to.be.equal(testOrg.name)
            expect(res.body.users[0]).to.deep.include(testMan)
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    // it('POST /api/organizations', async () => {
    //   const ionicOrg = {
    //     name: 'Ionic Organization',
    //   }

    //   try {
    //     await request(app)
    //       .post('/api/organizations')
    //       .send(ionicOrg)
    //       .expect(200)
    //       .then((res) => {
    //         expect(res.body).to.be.an('object')
    //         expect(res.body.name).to.be.equal(ionicOrg.name)
    //       })
    //   } catch (error) {
    //     console.log(error)
    //     throw error
    //   }
    // })

    // it('PUT /api/organizations/:orgId', async () => {
    //   try {
    //     await request(app)
    //       .put('/api/organizations/1')
    //       .send({name: 'Doric Organization'})
    //       .expect(200)
    //       .then((res) => {
    //         expect(res.body).to.be.an('object')
    //         expect(res.body.name).to.be.equal('Doric Organization')
    //       })
    //   } catch (error) {
    //     console.log(error)
    //     throw error
    //   }
    // })

    // it('DELETE /api/organizations/:orgId', async () => {
    //   try {
    //     await request(app).delete('/api/organizations/1').expect(204)
    //   } catch (error) {
    //     console.log(error)
    //     throw error
    //   }
    // })
  })
})
