/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Task = db.model('task')
const User = db.model('user')

describe('Task routes', () => {
  const testTask = {
    name: 'Test Organization',
    createdBy: 'Test Man',
    description: 'I am a test task!',
    status: 'in-progress',
    completionDate: new Date().toISOString(),
  }

  describe('/api/tasks/', () => {
    beforeEach(async () => {
      await db.sync({force: true})
      await Task.create(testTask)
    })

    const testMan = {
      firstName: 'Test',
      lastName: 'Man',
      email: 'testman@email.com',
    }

    it('GET /api/tasks', async () => {
      try {
        const userTest = await User.create(testMan)
        const foundTask = await Task.findByPk(1, {include: [User]})
        await foundTask.setUsers([userTest.id])
        await foundTask.save()

        await request(app)
          .get('/api/tasks')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].name).to.be.equal(foundTask.name)
            expect(res.body[0].createdBy).to.be.equal(foundTask.createdBy)
            expect(res.body[0].description).to.be.equal(foundTask.description)
            expect(res.body[0].status).to.be.equal(foundTask.status)
            expect(
              new Date(res.body[0].completionDate).toISOString()
            ).to.include(foundTask.completionDate)
            expect(res.body[0].users[0]).to.deep.include(testMan)
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    /* it('GET /api/tasks/:taskId', async () => {
      try {
        await request(app)
          .get('/api/organizations/1')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.name).to.be.equal(testOrg.name)
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    }) */

    /* it('GET /api/tasks/:taskId/users', async () => {
      const testMan = {
        firstName: 'Test',
        lastName: 'Man',
        email: 'testman@email.com',
      }

      const userTest = await User.create(testMan)
      const taskTest = await Task.findByPk(1)

      await taskTest.addUsers(userTest)

      try {
        await request(app)
          .get('/api/tasks/1/users')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.name).to.be.equal(testTask.name)
            expect(res.body.users[0]).to.deep.include(testMan)
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    }) */

    /* it('POST /api/tasks', async () => {
      const ironicTask = {
        name: 'Ironic Task',
      }

      try {
        await request(app)
          .post('/api/tasks')
          .send(ironicTask)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.name).to.be.equal(ironicTask.name)
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    }) */

    /* it('PUT /api/tasks/:taskId', async () => {
      try {
        await request(app)
          .put('/api/tasks/1')
          .send({name: 'Door-ick Task'})
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.name).to.be.equal('Door-ick Task')
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    }) */

    /* it('DELETE /api/tasks/:taskId', async () => {
      try {
        await request(app).delete('/api/tasks/1').expect(204)
      } catch (error) {
        console.log(error)
        throw error
      }
    }) */
  })
})
