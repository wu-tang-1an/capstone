const router = require('express').Router()
const {User, UserOrganization, Organization, Task} = require('../db/models')
const {checkUser, checkAdmin} = require('./gatekeeper')
module.exports = router

// GET all tasks route '/api/tasks' (ADMIN ONLY)
/* router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const tasks = await Task.findAll()
    res.json(tasks)
  } catch (error) {
    next(error)
  }
}) */

// GET all tasks with users route '/api/tasks' (ADMIN ONLY)
router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const tasks = await Task.findAll({include: User})
    res.json(tasks)
  } catch (error) {
    next(error)
  }
})

// POST create new task route '/api/tasks' (AUTH USER ONLY)
router.post('/', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {dataValues} = await Task.create(data)

    res.status(201).json(dataValues)
  } catch (error) {
    next(error)
  }
})

// PUT update task route '/api/tasks/:taskId' (AUTH USER ONLY)
router.put('/:taskId', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {taskId} = req.params

    if (isNaN(taskId)) res.status(400).send(taskId + ' is not a number!')
    else {
      const [updatedRows, updatedTask] = await Task.update(data, {
        plain: true,
        returning: true,
        where: {id: taskId},
      })

      res.json(updatedTask)
    }
  } catch (error) {
    next(error)
  }
})

//assign a task to user if it exists already
// you need the project id, userId that is being assigned to

router.put('/:userId/tasks', async (req, res, next) => {
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

// DELETE task route '/api/task/:taskId' (AUTH USER ONLY)
router.delete('/:taskId', checkUser, async (req, res, next) => {
  try {
    const {taskId} = req.params

    if (isNaN(taskId)) res.status(400).send(taskId + ' is not a number!')

    await Task.destroy({where: {id: taskId}})

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
