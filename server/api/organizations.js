const router = require('express').Router()
const {User, UserOrganization, Organization} = require('../db/models')
module.exports = router

// get all the orfs in the app
router.get('/', async (req, res, next) => {
  try {
    const orgs = await Organization.findAll()
    res.json(orgs)
  } catch (err) {
    next(err)
  }
})

// get the users in the org
router.get('/:orgId/users', async (req, res, next) => {
  const {orgId} = req.params

  try {
    //test route
    const OrgFound = await Organization.findOne({
      where: {
        id: orgId,
      },
      include: User,
    })

    res.json(OrgFound)
  } catch (e) {
    console.log(e)
    next(e)
  }
})
