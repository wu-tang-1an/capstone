/* global describe beforeEach it */

const moment = require('moment')
const {expect} = require('chai')
const db = require('../index')
const Task = db.model('task')

describe('Task model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('getMethods', () => {
      let project

      beforeEach(async () => {
        project = await Task.create({
          name: 'FINISH THE PROJECT',
          createdBy: 'Johnny Vazquez',
          description: 'It is very hard',
          status: 'review',
          completionDate: '03/20/2021',
        })
      })

      it('returns the description of the task', () => {
        expect(project.getDescription()).to.be.equal('It is very hard')
      })

      it('returns the name of the task', () => {
        expect(project.getName()).to.be.equal('FINISH THE PROJECT')
      })
      it('returns the time due of the task', () => {
        expect(project.getDate()).to.deep.include(1)
      })
    })
  })
})
