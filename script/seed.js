'use strict'

const db = require('../server/db')
const {
  User,
  Task,
  Organization,
  Column,
  Project,
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const tasks = [
    {
      createdBy: 'Samuel',
      description: 'design logo',
      status: 'todo',
      completionDate: '03/25/2021',
    },
    {
      createdBy: 'Lisa',
      description: 'design header',
      status: 'todo',
      completionDate: '03/26/2021',
    },
    {
      createdBy: 'Jim',
      description: 'update vscode',
      status: 'done',
      completionDate: '03/27/2021',
    },
    {
      createdBy: 'Alice',
      description: 'update oauth',
      status: 'done',
      completionDate: '03/27/2021',
    },
    {
      createdBy: 'Daniel',
      description: 'changeover localSecrets.js',
      status: 'done',
      completionDate: '03/30/2021',
    },
    {
      createdBy: 'Gene',
      description: 'oversee merge',
      status: 'done',
      completionDate: '04/25/2021',
    },
    {
      createdBy: 'David',
      description: 'build component tree',
      status: 'in-progress',
      completionDate: '06/28/2021',
    },
    {
      createdBy: 'Michael',
      description: 'diagram changes',
      status: 'in-progress',
      completionDate: '03/25/3021',
    },
    {
      createdBy: 'Donald',
      description: 'update layout',
      status: 'in-progress',
      completionDate: '03/25/2020',
    },
    {
      createdBy: 'Tim',
      description: 'modularize css',
      status: 'in-progress',
      completionDate: '08/25/2021',
    },
    {
      createdBy: 'Sarah',
      description: 'write user stories',
      status: 'review',
      completionDate: '10/25/2021',
    },
    {
      createdBy: 'Kim',
      description: 'refactor db',
      status: 'review',
      completionDate: '12/25/2021',
    },
    {
      createdBy: 'Trainer',
      description: 'update models',
      status: 'review',
      completionDate: '03/25/2024',
    },
    {
      createdBy: 'Mohammad',
      description: 'write gatekeeping middleware',
      status: 'review',
      completionDate: '02/25/2022',
    },
    {
      createdBy: 'Blake',
      description: 'reverse linked list',
      status: 'done',
      completionDate: '03/25/2021',
    },
    {
      createdBy: 'Natasha',
      description: 'buy popcorn',
      status: 'in-progress',
      completionDate: '03/25/2021',
    },
    {
      createdBy: 'George',
      description: 'play guitar hero',
      status: 'todo',
      completionDate: '03/25/2021',
    },
    {
      createdBy: 'Marguerite',
      description: 'deploy on heroku',
      status: 'review',
      completionDate: '03/25/2026',
    },
  ]

  const columns = [
    {
      name: 'Todo',
    },
    {
      name: 'In-progress',
    },
    {
      name: 'Review',
    },
    {
      name: 'Review-2',
    },
    {
      name: 'Review-3',
    },
    {
      name: 'Redo',
    },
    {
      name: 'deletedTask',
    },
    {
      name: 'Done',
    },
  ]

  const newColumns = await Column.bulkCreate(columns, {
    returning: true,
  })

  const newTasks = await Task.bulkCreate(tasks, {
    returning: true,
  })

  newColumns.map(async (column) => {
    await column.addTasks(newTasks)
  })

  const Capstone = await Project.create({
    name: 'Note-Ary',
    status: 'in-progress',
    description: 'we are stealing trellos idea',
  })

  await Capstone.addColumns(newColumns)
  //asoc proj with an org

  // assoc org with user

  // const TaskOne = await Task.create({
  //   createdBy: 'Johnny',
  //   description: 'refactor components',
  //   status: 'todo',
  //   completionDate: new Date(),
  // })

  // const TaskTwo = await Task.create({
  //   createdBy: 'Mary',
  //   description: 'marketing work',
  //   status: 'todo',
  //   completionDate: new Date(),
  // })

  // const TaskThree = await Task.create({
  //   createdBy: 'Samuel',
  //   description: 'design logo',
  //   status: 'todo',
  //   completionDate: new Date(),
  // })

  // const TaskFour = await Task.create({
  //       createdBy: 'Samuel',
  //       description: 'design logo',
  //       status: 'todo',
  //       completionDate: new Date(),
  // })

  const Fullstack = await Organization.create({
    name: 'Fullstack',
    imageUrl:
      'https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/39/original/fsa_logo_vertical-01_full_color_CR-01.png',
  })

  await Fullstack.addProject(Capstone)

  const Johnny = await User.create({
    firstName: 'Johhn',
    lastName: 'Vazquez',
    email: 'john@email.com',
    password: '123',
    status: 'admin',
  })

  const Daniel = await User.create({
    firstName: 'Daniel',
    lastName: 'Shapiro',
    email: 'daniel@mail.com',
    password: '123',
  })

  const David = await User.create({
    firstName: 'David',
    lastName: 'Ahn',
    email: 'dahn@mail.com',
    password: '123',
  })

  const Gene = await User.create({
    firstName: 'Gene',
    lastName: 'Kyler',
    email: 'gkyler@mail.com',
    password: '123',
  })

  const Google = await Organization.create({
    name: 'Google Inc',
    imageUrl:
      'https://q3p9g6n2.rocketcdn.me/wp-content/ml-loads/2019/08/shutterstock_1283238880-800x450.jpg',
  })

  const Facebook = await Organization.create({
    name: 'Facebook Inc',
    imageUrl:
      'https://ibw21.org/wp-content/uploads/2018/04/facebook-1-hacker-way-billboard.jpg',
  })

  const Apple = await Organization.create({
    name: 'Apple Inc',
    imageUrl: 'https://i.ytimg.com/vi/FzcfZyEhOoI/maxresdefault.jpg',
  })

  const Clean = await Task.create({
    name: 'Clean the room',
    createdBy: 'Mr. Johnny Vazquez',
    description: 'hello world',
    status: 'todo',
  })

  Johnny.addTask(Clean, {
    through: {
      ProjectId: 2,
    },
  })

  await Johnny.addOrganization(Fullstack, {
    through: {
      role: 'owner',
      OrgId: 1,
    },
  })

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Richardson',
      email: 'cody@email.com',
      password: '123',
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Clark',
      email: 'murphy@email.com',
      password: '123',
    }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
