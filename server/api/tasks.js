const router = require('express').Router()
const {Task, Column, User, Comment} = require('../db/models')
const {checkUser, checkAdmin} = require('./helper/gatekeeper')
const {resNaN, resDbNotFound, resAssoc, resDeleted} = require('./helper/helper')
const {STR_TASKS, STR_TASK, STR_COLUMN, STR_USER} = require('./helper/strings')
module.exports = router

// GET all tasks with users route '/api/tasks' (ADMIN ONLY)
router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const tasks = await Task.findAll({include: [User]})
    if (!tasks) return resDbNotFound(STR_TASKS, res)

    return res.json(tasks)
  } catch (error) {
    next(error)
  }
})

// GET single task with (comments + users), (task + users) route '/api/tasks/:taskId' (AUTH USER ONLY)
router.get('/:taskId', checkUser, async (req, res, next) => {
  try {
    const {taskId} = req.params
    if (isNaN(taskId)) return resNaN(taskId, res)

    const task = await Task.findByPk(taskId, {
      include: [
        {
          model: User,
        },
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
    if (!task) return resDbNotFound(STR_TASK, res)

    return res.json(task)
  } catch (error) {
    next(error)
  }
})

// get the comments for a specific task
router.get('/:taskId/comments', async (req, res, next) => {
  try {
    const {taskId} = req.params

    let task = await Task.findByPk(taskId)

    task = await task.getComments()
    res.json(task)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

//POST a comment to a task
router.post('/:taskId/comments', async (req, res, next) => {
  try {
    const {taskId} = req.params
    const {userId, text} = req.body

    let task = await Task.findByPk(taskId)

    task = await task.createComment({
      text: text,
      userId: userId,
    })
    res.json(task)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

// POST create new task route '/api/tasks' (ADMIN ONLY)
// creates a free floating task (unassociated)
router.post('/', checkAdmin, async (req, res, next) => {
  try {
    const data = req.body
    const {dataValues} = await Task.create(data)

    res.status(201).json(dataValues)
  } catch (error) {
    next(error)
  }
})

// POST create new task with column route '/api/tasks/columns/:columnId' (AUTH USER ONLY)
router.post('/columns/:columnId', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {columnId} = req.params
    if (isNaN(columnId)) return resNaN(columnId, res)

    const column = await Column.findByPk(columnId)
    if (!column) return resDbNotFound(STR_COLUMN, res)

    const task = await Task.create(data)
    task.setColumn(column)

    return res.status(201).json(task.dataValues)
  } catch (error) {
    next(error)
  }
})

// PUT user dropped a task '/api/tasks/drop' (AUTH USER ONLY)
router.put('/drop', checkUser, async (req, res, next) => {
  try {
    const {sourColId, destColId, sourFETasks, destFETasks, taskId} = req.body

    const task = await Task.findByPk(taskId)
    const sourCol = await Column.findByPk(sourColId, {include: Task})
    const destCol = await Column.findByPk(destColId, {include: Task})

    sourCol.removeTask(task)
    destCol.addTask(task)

    sourFETasks.forEach(async (tsk) => {
      await Task.update({index: tsk.index}, {where: {id: tsk.id}})
    })

    destFETasks.forEach(async (tsk) => {
      await Task.update({index: tsk.index}, {where: {id: tsk.id}})
    })

    return res.status(200)
  } catch (error) {
    next(error)
  }
})

// PUT update task route '/api/tasks/:taskId' (AUTH USER ONLY)
router.put('/:taskId', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {taskId} = req.params
    if (isNaN(taskId)) return resNaN(taskId, res)

    const [, updatedTask] = await Task.update(data, {
      plain: true,
      returning: true,
      where: {id: taskId},
    })
    if (!updatedTask) return resDbNotFound(STR_TASK, res)

    return res.json(updatedTask)
  } catch (error) {
    next(error)
  }
})

// PUT add user to task route '/api/tasks/:taskId/users/:userId' (AUTH USER ONLY)
router.put('/:taskId/users/:userId', checkUser, async (req, res, next) => {
  try {
    const {taskId, userId} = req.params
    if (isNaN(taskId)) return resNaN(taskId, res)
    if (isNaN(userId)) return resNaN(userId, res)

    const task = await Task.findByPk(taskId)
    if (!task) return resDbNotFound(STR_TASK, res)

    const user = await User.findByPk(userId)
    if (!user) return resDbNotFound(STR_USER, res)

    task.addUser(user)

    return resAssoc(STR_TASK, STR_USER, taskId, userId, res)
  } catch (error) {
    next(error)
  }
})

// PUT set task to column route '/api/tasks/:taskId/columns/:columnId' (AUTH USER ONLY)
router.put('/:taskId/columns/:columnId', checkUser, async (req, res, next) => {
  try {
    const {taskId, columnId} = req.params
    if (isNaN(taskId)) return resNaN(taskId, res)
    if (isNaN(columnId)) return resNaN(columnId, res)

    const task = await Task.findByPk(taskId)
    if (!task) return resDbNotFound(STR_TASK, res)

    const column = await Column.findByPk(columnId)
    if (!column) return resDbNotFound(STR_COLUMN, res)

    task.setColumn(column)

    return resAssoc(STR_TASK, STR_COLUMN, taskId, columnId, res)
  } catch (error) {
    next(error)
  }
})

// DELETE task route '/api/task/:taskId' (AUTH USER ONLY)
router.delete('/:taskId', checkUser, async (req, res, next) => {
  try {
    const {taskId} = req.params
    if (isNaN(taskId)) return resNaN(taskId, res)

    const task = await Task.destroy({where: {id: taskId}})
    if (!task) return resDbNotFound(STR_TASK, res)

    return resDeleted(STR_TASK, taskId, res)
  } catch (error) {
    next(error)
  }
})
