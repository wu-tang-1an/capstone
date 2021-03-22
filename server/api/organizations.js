const router = require('express').Router()
const {User, UserOrganization, Organization} = require('../db/models')
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
