/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Project = db.model('project')

describe('Project routes', () => {
  const testProject = {
    name: 'Test Project',
    status: 'in-progress',
    description: 'I am a test project!',
  }

  describe('/api/projects/', () => {
    beforeEach(async () => {
      await db.sync({force: true})
      await Project.create(testProject)
    })

    it('GET /api/projects', async () => {
      try {
        await request(app)
          .get('/api/projects')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].name).to.be.equal(testProject.name)
            expect(res.body[0].status).to.be.equal(testProject.status)
            expect(res.body[0].description).to.be.equal(testProject.description)
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    it('GET /api/projects/:projectId', async () => {
      try {
        await request(app)
          .get('/api/projects/1')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.name).to.be.equal(testProject.name)
            expect(res.body.status).to.be.equal(testProject.status)
            expect(res.body.description).to.be.equal(testProject.description)
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    it('POST /api/projects', async () => {
      const ionicProject = {
        name: 'Ionic Project',
        status: 'complete',
        description: 'I am the ionic project!',
      }

      try {
        await request(app)
          .post('/api/projects')
          .send(ionicProject)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.name).to.be.equal(ionicProject.name)
            expect(res.body.status).to.be.equal(ionicProject.status)
            expect(res.body.description).to.be.equal(ionicProject.description)
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    it('PUT /api/projects/:projectId', async () => {
      try {
        await request(app)
          .put('/api/projects/1')
          .send({name: 'Doric Project', status: 'complete'})
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.name).to.be.equal('Doric Project')
            expect(res.body.status).to.be.equal('complete')
            expect(res.body.description).to.be.equal('I am a test project!')
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    it('DELETE /api/projects/:projectId', async () => {
      try {
        await request(app).delete('/api/projects/1').expect(204)
      } catch (error) {
        console.log(error)
        throw error
      }
    })
  })
})
