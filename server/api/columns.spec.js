/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Column = db.model('column')

describe('Column routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/columns/', () => {
    const testColumn = 'Test Column'

    beforeEach(() => {
      return Column.create({
        name: testColumn,
      })
    })

    it('GET /api/columns', async () => {
      try {
        await request(app)
          .get('/api/columns')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('array')
            expect(res.body[0].name).to.be.equal(testColumn)
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    it('GET /api/columns/:columnId', async () => {
      try {
        await request(app)
          .get('/api/columns/1')
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.name).to.be.equal(testColumn)
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    it('POST /api/columns', async () => {
      const ionic = {
        name: 'Ionic',
      }

      try {
        await request(app)
          .post('/api/columns')
          .send(ionic)
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.name).to.be.equal(ionic.name)
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    it('PUT /api/columns/:columnId', async () => {
      try {
        await request(app)
          .put('/api/columns/1')
          .send({name: 'Doric'})
          .expect(200)
          .then((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.name).to.be.equal('Doric')
          })
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    it('DELETE /api/columns/:columnId', async () => {
      try {
        await request(app).delete('/api/columns/1').expect(204)
      } catch (error) {
        console.log(error)
        throw error
      }
    })
  })
})
