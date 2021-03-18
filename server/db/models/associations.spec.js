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
    createdBy: 'albert',
    description: 'a description of how i will create this site',
    status: 'in-progress',
    completionDate: new Date(),
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
    expect(foundUser.organizations[0]).to.deep.include(organization)
  })

  it('Each Task belongs to many User, each User belongs to many Task', async () => {
    const newUser1 = await User.create(user1)
    const newTask = await Task.create(task)
    await newUser1.setTasks([newTask.id])
    await newUser1.save()
    const foundUser = await User.findByPk(1, {include: Task})
    expect(foundUser.tasks[0]).to.deep.include(task)
  })

  it('Each Project belongs to one Organization, each Organization has many Project', async () => {
    const newOrganization = await Organization.create(organization)
    const newProject = await Project.create(project)
    await newOrganization.setProjects([newProject.id])
    await newOrganization.save()
    const foundOrganization = await Organization.findByPk(1, {
      include: [{model: Project}],
    })
    expect(foundOrganization.projects[0]).to.deep.include(project)
  })

  it('Each Task belongs to one Column, each Column has many Task', async () => {
    const newTask = await Task.create(task)
    const newColumn = await Column.create(column1)
    await newColumn.setTasks([newTask.id])
    await newColumn.save()
    const foundColumn = await Column.findByPk(1, {
      include: [{model: Task}],
    })
    expect(foundColumn.tasks[0]).to.deep.include(task)
  })

  it('Each Column belongs to one Project, each Project has many Columns', async () => {
    const newProject = await Project.create(project)
    const newColumn1 = await Column.create(column1)
    const newColumn2 = await Column.create(column2)
    await newProject.setColumns([newColumn1.id, newColumn2.id])
    await newProject.save()
    const foundProject = await Project.findByPk(1, {
      include: [{model: Column}],
    })
    expect(foundProject.columns[0]).to.deep.include(column1)
    expect(foundProject.columns[1]).to.deep.include(column2)
  })
})
