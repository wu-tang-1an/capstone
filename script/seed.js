'use strict'

const db = require('../server/db')
const {User, Task, Organization} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const Fullstack = await Organization.create({
    name: 'Fullstack',
  })

  const Johnny = await User.create({
    firstName: 'Johhn',
    lastName: 'Vazquez',
    email: 'john@email.com',
    password: '123',
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
