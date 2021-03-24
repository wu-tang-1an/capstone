const router = require('express').Router()
const {Column, Project, Task} = require('../db/models')
const {checkUser, checkAdmin} = require('./helper/gatekeeper')
const {resNaN, resDbNotFound, resDeleted, resAssoc} = require('./helper/helper')
const {
  STR_COLUMNS,
  STR_COLUMN,
  STR_PROJECT,
  STR_TASK,
} = require('./helper/strings')
module.exports = router

// GET all columns route '/api/columns' (ADMIN ONLY)
router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const columns = await Column.findAll()
    if (!columns) return resDbNotFound(STR_COLUMNS, res)

    return res.json(columns)
  } catch (error) {
    next(error)
  }
})

// GET single column route '/api/columns/:columnId' (AUTH USER ONLY)
router.get('/:columnId', checkUser, async (req, res, next) => {
  try {
    const {columnId} = req.params
    if (isNaN(columnId)) return resNaN(columnId, res)

    const column = await Column.findByPk(columnId, {include: Task})
    if (!column) return resDbNotFound(STR_COLUMN, res)

    return res.json(column)
  } catch (error) {
    next(error)
  }
})

// POST create new column route '/api/columns/' (ADMIN ONLY)
// creates a free floating column (unassociated)
router.post('/', checkAdmin, async (req, res, next) => {
  try {
    const data = req.body
    const {dataValues} = await Column.create(data)

    return res.status(201).json(dataValues)
  } catch (error) {
    next(error)
  }
})

// POST create new column with project route '/api/columns/projects/:projectId' (AUTH USER ONLY)
router.post('/projects/:projectId', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {projectId} = req.params
    if (isNaN(projectId)) return resNaN(projectId, res)

    const project = await Project.findByPk(projectId)
    if (!project) return resDbNotFound(STR_PROJECT, res)

    const column = await Column.create(data)
    column.setProject(project)

    return res.status(201).json(column.dataValues)
  } catch (error) {
    next(error)
  }
})

// PUT edit column route '/api/columns/:columnId' (AUTH USER ONLY)
router.put('/:columnId', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {columnId} = req.params
    if (isNaN(columnId)) return resNaN(columnId, res)

    const [, updatedColumn] = await Column.update(data, {
      plain: true,
      returning: true,
      where: {id: columnId},
    })
    if (!updatedColumn) return resDbNotFound(STR_COLUMN, res)

    return res.json(updatedColumn)
  } catch (error) {
    next(error)
  }
})

// PUT add task to column route '/api/columns/:columnId/tasks/:taskId' (AUTH USER ONLY)
router.put('/:columnId/tasks/:taskId', checkUser, async (req, res, next) => {
  try {
    const {columnId, taskId} = req.params
    if (isNaN(columnId)) return resNaN(columnId, res)
    if (isNaN(taskId)) return resNaN(taskId, res)

    const column = await Column.findByPk(columnId)
    if (!column) return resDbNotFound(STR_COLUMN, res)

    const task = await Task.findByPk(taskId)
    if (!task) return resDbNotFound(STR_TASK, res)

    column.addTask(task)

    return resAssoc(STR_COLUMN, STR_TASK, columnId, taskId, res)
  } catch (error) {
    next(error)
  }
})

// PUT set column to project route '/api/columns/:columnId/projects/:projectId' (AUTH USER ONLY)
router.put(
  '/:columnId/projects/:projectId',
  checkUser,
  async (req, res, next) => {
    try {
      const {columnId, projectId} = req.params
      if (isNaN(columnId)) return resNaN(columnId, res)
      if (isNaN(projectId)) return resNaN(projectId, res)

      const column = await Column.findByPk(columnId)
      if (!column) return resDbNotFound(STR_COLUMN, res)

      const project = await Project.findByPk(projectId)
      if (!project) return resDbNotFound(STR_PROJECT, res)

      column.setProject(project)

      return resAssoc(STR_COLUMN, STR_PROJECT, columnId, projectId, res)
    } catch (error) {
      next(error)
    }
  }
)

// DELETE column route '/api/columns/:columnId' (AUTH USER ONLY)
router.delete('/:columnId', checkUser, async (req, res, next) => {
  try {
    const {columnId} = req.params
    if (isNaN(columnId)) return resNaN(columnId, res)

    const column = await Column.destroy({where: {id: columnId}})
    if (!column) return resDbNotFound(STR_COLUMN, res)

    return resDeleted(STR_COLUMN, columnId, res)
  } catch (error) {
    next(error)
  }
})
