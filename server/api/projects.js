const router = require('express').Router()
const {Project} = require('../db/models')
module.exports = router

// GET all projects route '/api/projects'
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll()
    res.json(projects)
  } catch (error) {
    next(error)
  }
})

// GET single project route '/api/projects/:projectId'
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

// POST create new project route '/api/projects/'
router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    const {dataValues} = await Project.create(data)

    res.json(dataValues)
  } catch (error) {
    next(error)
  }
})

// PUT edit project route '/api/projects/:projectId'
router.put('/:projectId', async (req, res, next) => {
  try {
    const data = req.body
    const {projectId} = req.params

    const [updatedRows, updatedProject] = await Project.update(data, {
      plain: true,
      returning: true,
      where: {id: projectId},
    }) // returns array: [updatedRows, {updatedProject}]

    res.json(updatedProject)
  } catch (error) {
    next(error)
  }
})

// DELETE project route '/api/projects/:projectId'
router.delete('/:projectId', async (req, res, next) => {
  try {
    const {projectId} = req.params

    await Project.destroy({where: {id: projectId}})

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
