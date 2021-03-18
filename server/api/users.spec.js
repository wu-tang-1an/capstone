/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Task = db.model('task')

const superuser = request.agent(app)

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const testMan = {
      firstName: 'Test',
      lastName: 'Man',
      email: 'testman@email.com',
      password: '1234',
    }

    beforeEach(() => {
      return User.create(testMan)
    })

    it('GET /api/users', async () => {
      try {
        await superuser
          .get('/api/users')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].email).to.be.equal(testMan.email)
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    it('GET /api/users/:userId', async () => {
      try {
        await request(app)
          .get('/api/users/1')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.name).to.be.equal(testMan.name)
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    it('GET /api/users/:userId/tasks', async () => {
      const testTask = {
        name: 'Test Task',
        createdBy: 'Test Man',
        description: 'I am a test task!',
        status: 'in-progress',
        completionDate: new Date(),
      }

      const taskTest = await Task.create(testTask)
      const userTest = await User.findByPk(1)

      await userTest.addTasks(taskTest)

      try {
        await request(app)
          .get('/api/users/1/tasks')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].name).to.be.equal(testTask.name)
            expect(res.body[0].createdBy).to.be.equal(testTask.createdBy)
            expect(res.body[0].description).to.be.equal(testTask.description)
            expect(res.body[0].status).to.be.equal(testTask.status)
            expect(new Date(res.body[0].completionDate)).to.include(
              testTask.completionDate
            )
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    it('POST /api/users', async () => {
      const triangleWoman = {
        firstName: 'Triangle',
        lastName: 'Woman',
        password: '1234',
        email: 'triwoman@tricommission.com',
      }

      try {
        await request(app)
          .post('/api/users')
          .send(triangleWoman)
          .expect(201)
          .then((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.firstName).to.be.equal(triangleWoman.firstName)
            expect(res.body.lastName).to.be.equal(triangleWoman.lastName)
            expect(res.body.email).to.be.equal(triangleWoman.email)
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    /* it('PUT /api/users/:userId', async () => {
      try {
        await request(app)
          .put('/api/users/1')
          .send({firstName: 'Doric'})
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.name).to.be.equal('Doric')
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    }) */

    /* it('DELETE /api/users/:userId', async () => {
      try {
        await request(app).delete('/api/users/1').expect(204)
      } catch (error) {
        console.log(error)
        throw error
      }
    }) */
  })
})
