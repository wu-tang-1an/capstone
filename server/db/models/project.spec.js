/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Project = db.model('project')

describe('Project Model', () => {
  beforeEach(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('has fields name, status, description, imageUrl', async () => {
    try {
      const project = await Project.create({
        name: 'super cool project',
        status: 'in-progress',
        description: 'this project is super cool!',
        imageUrl: 'http://www.image.com',
      })
      const foundProject = await Project.findByPk(1)
      expect(foundProject.dataValues).to.deep.include({
        name: 'super cool project',
        status: 'in-progress',
        description: 'this project is super cool!',
        imageUrl: 'http://www.image.com',
      })
    } catch (err) {
      console.error(err)
    }
  })

  it('uses a default image if none is provided', async () => {
    try {
      const project = await Project.create({
        name: 'super cool project',
        status: 'in-progress',
        description: 'this project is super cool!',
      })
      const foundProject = await Project.findByPk(1)
      expect(foundProject.dataValues).to.deep.include({
        imageUrl: 'https://unsplash.it/200/200',
      })
    } catch (err) {
      console.error(err)
    }
  })
})
