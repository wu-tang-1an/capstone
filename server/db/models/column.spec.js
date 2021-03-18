/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Column = db.model('column')

describe('Column Model', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('has fields name', async () => {
    const column = await Column.create({
      name: 'in-progress',
    })
    const foundColumn = await Column.findByPk(1)
    expect(foundColumn).to.equal(column)
  })
})
