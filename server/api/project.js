const router = require('express').Router()
const {Project} = require('../db/models')
module.exports = router

// GET all projects route '/api/project'
router.get('/', (req, res, next) => {
  try {
    const projects = Project.findAll()
    res.json(projects)
  } catch (error) {
    next(error)
  }
})

// GET single project route '/api/project/:projectId'
router.get('/:projectId', async (req, res, next) => {
  try {
    const {projectId} = req.params

    if (isNaN(projectId)) res.status(400).send(projectId + ' is not a number!')
    else {
      const project = await Project.findByPk(projectId)
      res.json(project)
    }
  } catch (error) {
    next(error)
  }
})

// POST create new project route '/api/project/'
router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    const {dataValues} = await Project.create(data)

    res.json(dataValues)
  } catch (error) {
    next(error)
  }
})

// PUT edit project route '/api/project/:projectId'
router.put('/:projectId', async (req, res, next) => {
  try {
    const data = req.body
    const {projectId} = req.params

    await Project.update({...data}, {where: {id: projectId}})

    res.json(data)
  } catch (error) {
    next(error)
  }
})

// DELETE project route '/api/project/:projectId'
router.delete('/:projectId', async (req, res, next) => {
  try {
    const {projectId} = req.params

    await Project.destroy({where: {id: projectId}})

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
