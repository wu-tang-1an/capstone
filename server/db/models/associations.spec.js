/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Task = db.model('task')
const Organization = db.model('organization')
const Column = db.model('column')
const Project = db.model('project')

describe('Model Associations', () => {
  beforeEach(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  const task = {
    name: 'create site',
    createdby: 'albert',
    description: 'a description of how i will create this site',
    status: 'in-progress',
    completionDate: '20210315',
  }
  const user1 = {
    firstName: 'alice',
    lastName: 'smith',
    status: 'user',
    email: 'alice@alice.com',
    imageUrl: 'http://www.image.com',
    password: '12345',
  }
  const user2 = {
    firstName: 'bob',
    lastName: 'smith',
    status: 'user',
    email: 'bob@bob.com',
    imageUrl: 'http://www.image.com',
    password: '12345',
  }
  const project = {
    name: 'cool new site',
    status: 'in progress',
    description: 'here is a description of our new site',
    imageUrl: 'http://www.image.com',
  }
  const organization = {
    name: 'note-ary',
    imageUrl: 'http://www.image.com',
  }
  const column1 = {
    name: 'todo',
  }
  const column2 = {
    name: 'in-progress',
  }
  const column3 = {
    name: 'done',
  }

  it('Each User belongs to many Organization, each Organization belongs to many User', async () => {
    const newUser1 = await User.create(user1)
    const newOrganization = await Organization.create(organization)
    await newUser1.setOrganizations([newOrganization.id])
    await newUser1.save()
    const foundUser = await User.findByPk(1, {include: Organization})
    expect(foundUser.organizations[0]).to.include(organization)
  })

  it('Each User has many Addresses, each Address belongs to many Users', async () => {
    const newUser = await User.create(user)
    const newAddress = await Address.create(address)
    await newUser.setAddresses([newAddress.id])
    await newUser.save()
    const foundUser = await User.findByPk(1, {include: Address})
    expect(foundUser.addresses[0]).to.include(address)
  })

  it('Each Order has many Products, each Product belongs to many Orders', async () => {
    const newUser = await User.create(user)
    const newOrder = await Order.create(order)
    const newProduct = await Product.create(product)
    await newOrder.setProducts([newProduct.id])
    await newOrder.save()
    await newUser.setOrders([newOrder.id])
    await newUser.save()
    const foundUser = await User.findByPk(1, {
      include: {model: Order, include: {model: Product}},
    })

    expect(foundUser.dataValues).to.have.nested.property(
      'orders[0].products[0].description',
      "It's the Pick of Destiny, child!"
    )
  })
})
