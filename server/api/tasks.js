const router = require('express').Router()
const {Task, Column, User, Comment} = require('../db/models')
const {checkUser, checkAdmin} = require('./gatekeeper')
module.exports = router

// GET all tasks with users route '/api/tasks' (ADMIN ONLY)
router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const tasks = await Task.findAll({include: User})
    res.json(tasks)
  } catch (error) {
    next(error)
  }
})

// GET single task
router.get('/:taskId', checkAdmin, async (req, res, next) => {
  try {
    const task = await Task.findByPk(+req.params.taskId, {
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    })
    res.json(task)
  } catch (error) {
    next(error)
  }
})

// POST create new task route '/api/tasks' (AUTH USER ONLY)
/* router.post('/', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {dataValues} = await Task.create(data)

    res.status(201).json(dataValues)
  } catch (error) {
    next(error)
  }
}) */

// POST create new task with column route '/api/tasks/columns/:columnId' (AUTH USER ONLY)
router.post('/columns/:columnId', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {columnId} = req.params

    if (isNaN(columnId)) res.status(400).send(columnId + ' is not a number!')

    const task = await Task.create(data)
    const column = await Column.findByPk(columnId)

    console.log('TaskinServer--->', task)
    console.log('req.body intask--->', req.body)

    if (!column) res.status(404).send('Column not found in database!')

    task.setColumn(column)

    res.status(201).json(task.dataValues)
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

// PUT add user to task route '/api/tasks/:taskId/users/:userId' (AUTH USER ONLY)
router.put('/:taskId/users/:userId', checkUser, async (req, res, next) => {
  try {
    const {taskId, userId} = req.params

    if (isNaN(taskId)) res.status(400).send(taskId + ' is not a number!')
    if (isNaN(userId)) res.status(400).send(userId + ' is not a number!')

    const task = await Task.findByPk(taskId)
    if (!task) res.status(404).send('Task not found in database!')

    const user = await User.findByPk(userId)
    if (!user) res.status(404).send('Organization not found in database!')

    task.addUsers(user)
  } catch (error) {
    next(error)
  }
})

// PUT set task to column route '/api/tasks/:taskId/columns/:columnId' (AUTH USER ONLY)
router.put('/:taskId/columns/:columnId', checkUser, async (req, res, next) => {
  try {
    const {taskId, columnId} = req.params

    if (isNaN(taskId)) res.status(400).send(taskId + ' is not a number!')
    if (isNaN(columnId)) res.status(400).send(columnId + ' is not a number!')

    const task = await Task.findByPk(taskId)
    if (!task) res.status(404).send('Task not found in database!')

    const column = await Column.findByPk(columnId)
    if (!column) res.status(404).send('Organization not found in database!')

    task.setColumns(column)
  } catch (error) {
    next(error)
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
