const router = require('express').Router()
const {Column, Project, Task} = require('../db/models')
const {checkUser, checkAdmin} = require('./gatekeeper')
module.exports = router

// GET all columns route '/api/columns' (ADMIN ONLY)
router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const columns = await Column.findAll()
    res.json(columns)
  } catch (error) {
    next(error)
  }
})

// GET single column route '/api/columns/:columnId' (AUTH USER ONLY)
router.get('/:columnId', checkUser, async (req, res, next) => {
  try {
    const {columnId} = req.params

    if (isNaN(columnId)) res.status(400).send(columnId + ' is not a number!')
    else {
      const column = await Column.findByPk(columnId, {
        include: [
          {
            model: Task,
          },
        ],
      })
      res.json(column)
    }
  } catch (error) {
    next(error)
  }
})

// POST create new column route '/api/columns/' (AUTH USER ONLY)
router.post('/', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    console.log('req.body--->', req.body)
    const {dataValues} = await Column.create(data)

    res.status(201).json(dataValues)
  } catch (error) {
    next(error)
  }
})

// POST create new column with project route '/api/columns/projects/:projectId' (AUTH USER ONLY)
router.post('/projects/:projectId', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {projectId} = req.params

    if (isNaN(projectId)) res.status(400).send(projectId + ' is not a number!')

    const column = await Column.create(data)
    const project = await Project.findByPk(projectId)

    if (!project) res.status(404).send('Project not found in database!')

    column.setProjects(project)

    res.status(201).json(column.dataValues)
  } catch (error) {
    next(error)
  }
})

// PUT edit column route '/api/columns/:columnId' (AUTH USER ONLY)
router.put('/:columnId', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {columnId} = req.params

    const [updatedRows, updatedColumn] = await Column.update(data, {
      plain: true,
      returning: true,
      where: {id: columnId},
    })

    res.json(updatedColumn)
  } catch (error) {
    next(error)
  }
})

// PUT add task to column route '/api/column/:columnId/tasks/:taskId' (AUTH USER ONLY)
router.put('/:columnId/tasks/:taskId', checkUser, async (req, res, next) => {
  try {
    const {columnId, taskId} = req.params

    if (isNaN(columnId)) res.status(400).send(columnId + ' is not a number!')
    if (isNaN(taskId)) res.status(400).send(taskId + ' is not a number!')

    const column = await Column.findByPk(columnId)
    if (!column) res.status(404).send('Column not found in database!')

    const task = await Task.findByPk(taskId)
    if (!task) res.status(404).send('Task not found in database!')

    column.addTasks(task)
  } catch (error) {
    next(error)
  }
})

// DELETE column route '/api/columns/:columnId' (AUTH USER ONLY)
router.delete('/:columnId', checkUser, async (req, res, next) => {
  try {
    const {columnId} = req.params

    if (isNaN(columnId)) res.status(400).send(columnId + ' is not a number!')

    await Column.destroy({where: {id: columnId}})

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
