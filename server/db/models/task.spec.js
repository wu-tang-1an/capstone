/* global describe beforeEach it */
const moment = require('moment')
const {expect} = require('chai')
const db = require('../index')
const Task = db.model('task')

describe('Task model', () => {
  const date = new Date().toISOString()

  const task = {
    name: 'FINISH THE PROJECT',
    createdBy: 'Johnny Vazquez',
    description: 'It is very hard',
    status: 'review',
    completionDate: date,
  }

  beforeEach(async () => {
    await db.sync({force: true})
    await Task.create(task)
  })

  describe('instanceMethods', () => {
    describe('getMethods', async () => {
      const foundTask = await Task.findByPk(1)

      it.only('returns the time due of the task', () => {
        expect(foundTask.getDate()).to.deep.include(date)
      })
    })
  })
})
