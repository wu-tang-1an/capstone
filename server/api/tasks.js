const router = require('express').Router()
const {User, UserOrganization, Organization, Task} = require('../db/models')
module.exports = router

//get all tasks along with user
router.get('/', async (req, res, next) => {
  try {
    const Tasks = await Task.findAll({
      include: User,
    })
    res.json(Tasks)
  } catch (err) {
    next(err)
  }
})

//get tasks for a single user
router.get('/task-user/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId

    const UserFound = await User.findByPk(userId)
    const tasks = await UserFound.getTasks()
    res.json(tasks)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

//assign a task to user if it exists already
// you need the project id, userId that is being assigned to

router.put('/task-user/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const taskId = req.body.taskId

    const UserFound = await User.findByPk(userId)
    const task = await Task.findByPk(taskId)

    await UserFound.addTask(task, {through: {ProjectId: 1}})
    res.json('task added assigned to user')
  } catch (err) {
    console.log(err)
    next(err)
  }
})

//create a task and assigned it to a user
// along with their project
// you will need userId, ProjectId,
router.post('/:userId/tasks', async (req, res, next) => {
  try {
    const userId = req.params.userId

    const UserFound = await User.findByPk(userId)
    const task = await Task.create({
      name: 'go to class',
      createdBy: 'daniel shapiro',
      description: 'go to calc',
      status: 'review',
    })

    await UserFound.addTask(task, {through: {ProjectId: 10}})
    res.json('task created!')
  } catch (err) {
    console.log(err)
    next(err)
  }
})
