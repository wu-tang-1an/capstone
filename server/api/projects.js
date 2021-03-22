const router = require('express').Router()
const {Project, User} = require('../db/models')
const {checkUser, checkAdmin} = require('./gatekeeper')
module.exports = router

// GET all projects route '/api/projects' (ADMIN ONLY)
router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const projects = await Project.findAll()
    res.json(projects)
  } catch (error) {
    next(error)
  }
})

// GET single project route '/api/projects/:projectId' (AUTH USER ONLY)
router.get('/:projectId', checkUser, async (req, res, next) => {
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

// POST create new project route '/api/projects/' (AUTH USER ONLY)
router.post('/', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {dataValues} = await Project.create(data)

    res.json(dataValues)
  } catch (error) {
    next(error)
  }
})

// PUT edit project route '/api/projects/:projectId' (AUTH USER ONLY)
router.put('/:projectId', checkUser, async (req, res, next) => {
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

// PUT add user to project route '/api/projects/:projectId/users/:userId' (AUTH USER ONLY)
router.put('/:projectId/users/:userId', checkUser, async (req, res, next) => {
  try {
    const {projectId, userId} = req.params

    if (isNaN(projectId)) res.status(400).send(projectId + ' is not a number!')
    if (isNaN(userId)) res.status(400).send(userId + ' is not a number!')

    const project = await Project.findByPk(projectId)
    if (!project) res.status(404).send('Project not found in database!')

    const user = await User.findByPk(userId)
    if (!user) res.status(404).send('User not found in database!')

    project.addUsers(user)
  } catch (error) {
    next(error)
  }
})

// DELETE project route '/api/projects/:projectId' (AUTH USER ONLY)
router.delete('/:projectId', checkUser, async (req, res, next) => {
  try {
    const {projectId} = req.params

    if (isNaN(projectId)) res.status(400).send(projectId + ' is not a number!')

    await Project.destroy({where: {id: projectId}})

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
