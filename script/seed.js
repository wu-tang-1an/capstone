/* eslint-disable max-statements */

const {green, red} = require('chalk')
const db = require('../server/db')
const queryInterface = db.getQueryInterface()

const {
  User,
  Task,
  Organization,
  Column,
  Project,
  Comment,
  UserOrganization,
  UserTask,
} = require('../server/db/models')

const {
  users,
  tasks,
  organizations,
  columns,
  projects,
  commentsThroughTable,
  orgProjects,
  columnTasks,
  projectColumns,
  userTasks,
  userOrgs,
} = require('./seedFiles')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // seed users
  const createdUsers = await User.bulkCreate(users, {returning: true})
  console.log(green(`Seeded ${createdUsers.length} users`))

  // seed tasks
  const createdTasks = await Task.bulkCreate(tasks, {returning: true})
  console.log(green(`Seeded ${createdTasks.length} tasks`))

  // seed orgs
  const createdOrganizations = await Organization.bulkCreate(organizations, {
    returning: true,
  })
  console.log(green(`Seeded ${createdOrganizations.length} organizations`))

  // seed columns
  const createdColumns = await Column.bulkCreate(columns, {returning: true})
  console.log(green(`Seeded ${createdColumns.length} columns`))

  // seed projects
  const createdProjects = await Project.bulkCreate(projects, {returning: true})
  console.log(green(`Seeded ${createdProjects.length} projects`))

  // seed comments through table
  const createdComments = await Comment.bulkCreate(commentsThroughTable, {
    returning: true,
  })
  console.log(green(`Seeded ${createdComments.length} comments`))

  // seed user organization through table
  const createdUserOrgs = await UserOrganization.bulkCreate(userOrgs, {
    returning: true,
  })
  console.log(
    green(`Seeded ${createdUserOrgs.length} user_organization records`)
  )

  /*   // seed user task through table
  const createdUserTasks = await UserTask.bulkCreate(userTasks, {
    returning: true,
  })
  console.log(green(`Seeded ${createdUserTasks.length} user_task records`)) */

  // associate non through table
  const associableTaskIds = [...createdTasks].map((task) => task.id)
  let i = 0
  while (associableTaskIds.length) {
    const nextEight = associableTaskIds.splice(0, 8)
    await createdUsers[i].setTasks(nextEight)
    i++
  }
  console.log('Each user has been associated with 8 tasks')

  const associableColumnIds = [...createdColumns].map((column) => column.id)
  i = 0
  while (associableColumnIds.length) {
    const nextFour = associableColumnIds.splice(0, 4)
    await createdProjects[i].setColumns(nextFour)
    i++
  }
  console.log('Each project has been associated with 4 columns')

  const yetAgainMoreAssociableTaskIds = [...createdTasks].map((task) => task.id)
  i = 0
  while (yetAgainMoreAssociableTaskIds.length) {
    const nextTwo = yetAgainMoreAssociableTaskIds.splice(0, 2)
    await createdColumns[i].setTasks(nextTwo)
    i++
  }
  console.log('Each column has been associated with 2 tasks')

  const associableProjectIds = [...createdProjects].map((project) => project.id)
  i = 0
  while (associableProjectIds.length) {
    await createdOrganizations[i].setProjects([associableProjectIds.shift()])
  }
  console.log('Each organization has been associated with 1 project')

  console.log(green('Database sucessfully seeded!'))
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(red(err))
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
