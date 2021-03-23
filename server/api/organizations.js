const router = require('express').Router()
const {Organization, Project} = require('../db/models')
const {checkUser, checkAdmin} = require('./gatekeeper')
module.exports = router

// GET all organizations route '/api/organizations' (ADMIN ONLY)
router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const orgs = await Organization.findAll()
    res.json(orgs)
  } catch (error) {
    next(error)
  }
})

// GET single organizations route '/api/organizations/:orgId' (AUTH USER ONLY)
router.get('/:orgId', checkUser, async (req, res, next) => {
  try {
    const {orgId} = req.params

    if (isNaN(orgId)) res.status(400).send(orgId + ' is not a number!')
    else {
      const org = await Organization.findByPk(orgId, {
        include: [
          {
            model: Project,
          },
        ],
      })
      res.json(org)
    }
  } catch (error) {
    next(error)
  }
})

// GET single organization's users route '/api/organizations/:orgId/users' (AUTH USER ONLY)
router.get('/:orgId/users', checkUser, async (req, res, next) => {
  try {
    const {orgId} = req.params

    if (isNaN(orgId)) res.status(400).send(orgId + ' is not a number!')
    else {
      const org = await Organization.findByPk(orgId)

      // if organization doesn't exist
      if (!org) res.status(404).send('Organization not found in database!')

      const users = await org.getUsers()
      res.json(users)
    }
  } catch (error) {
    next(error)
  }
})

// POST create new organization route '/api/organizations/' (AUTH USER ONLY)
router.post('/', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {dataValues} = await Organization.create(data)

    res.json(dataValues)
  } catch (error) {
    next(error)
  }
})

// PUT edit organization route '/api/organizations/:orgId' (AUTH USER ONLY)
router.put('/:orgId', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {orgId} = req.params

    const [updatedRows, updatedOrg] = await Organization.update(data, {
      plain: true,
      returning: true,
      where: {id: orgId},
    }) // returns array: [updatedRows, {updatedProject}]

    res.json(updatedOrg)
  } catch (error) {
    next(error)
  }
})

// DELETE organization route '/api/organizations/:orgId' (AUTH USER ONLY)
router.delete('/:orgId', checkUser, async (req, res, next) => {
  try {
    const {orgId} = req.params

    if (isNaN(orgId)) res.status(400).send(orgId + ' is not a number!')

    await Organization.destroy({where: {id: orgId}})

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
