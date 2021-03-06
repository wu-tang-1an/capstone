const router = require('express').Router()
const {Organization, Project, User, UserOrganization} = require('../db/models')
const {checkUser, checkAdmin, checkUserOrg} = require('./helper/gatekeeper')
const {
  resNaN,
  resDbNotFound,
  resDeleted,
  resAssoc,
  resUnassoc,
} = require('./helper/helper')
const {
  STR_ORGANIZATIONS,
  STR_ORGANIZATION,
  STR_USER,
} = require('./helper/strings')
module.exports = router

// GET all organizations route '/api/organizations' (ADMIN ONLY)
router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const orgs = await Organization.findAll()
    if (!orgs) return resDbNotFound(STR_ORGANIZATIONS, res)

    return res.json(orgs)
  } catch (error) {
    next(error)
  }
})

// GET single organizations route '/api/organizations/:orgId' (AUTH USER ONLY)
router.get('/:orgId', checkUser, checkUserOrg, async (req, res, next) => {
  try {
    const {orgId} = req.params
    if (isNaN(orgId)) return resNaN(orgId, res)

    const org = await Organization.findByPk(orgId, {
      include: [{model: Project}, {model: User}],
    })
    if (!org) return resDbNotFound(STR_ORGANIZATION, res)

    return res.json(org)
  } catch (error) {
    next(error)
  }
})

// GET single organization's users route '/api/organizations/:orgId/users' (AUTH USER ONLY)
router.get('/:orgId/users', checkUser, async (req, res, next) => {
  try {
    const {orgId} = req.params
    if (isNaN(orgId)) return resNaN(orgId, res)

    const org = await Organization.findByPk(orgId)
    if (!org) return resDbNotFound(STR_ORGANIZATION, res)

    const users = await org.getUsers()
    return res.json(users)
  } catch (error) {
    next(error)
  }
})

// POST create new organization route '/api/organizations/' (AUTH USER ONLY)
router.post('/', checkUser, async (req, res, next) => {
  try {
    // grab auth user id and org instance from req.body
    const {userId, newOrg} = req.body

    // create org
    const createdOrg = await Organization.create(newOrg, {
      include: [User],
    })

    // associate auth user
    await createdOrg.addUsers([userId])

    // grab the userOrg through table intance and set role to admin
    const foundUserOrgAssoc = await UserOrganization.findOne({
      where: {
        organizationId: createdOrg.id,
      },
    })
    foundUserOrgAssoc.role = 'admin'
    await foundUserOrgAssoc.save()

    // refetch the associatedOrg and send to frontend
    const associatedOrg = await Organization.findByPk(createdOrg.id, {
      include: [User],
    })
    res.json(associatedOrg)
  } catch (error) {
    next(error)
  }
})

// PUT edit organization route '/api/organizations/:orgId' (AUTH USER ONLY)
router.put('/:orgId', checkUser, async (req, res, next) => {
  try {
    const {name, imageUrl} = req.body
    const {orgId} = req.params
    if (isNaN(orgId)) return resNaN(orgId, res)

    const foundOrg = await Organization.findByPk(orgId, {
      include: [Project, User],
    })

    console.log(foundOrg)

    if (!foundOrg) return resDbNotFound(STR_ORGANIZATION, res)

    foundOrg.name = name
    foundOrg.imageUrl = imageUrl

    await foundOrg.save()

    const fetchedOrg = await Organization.findByPk(orgId, {
      include: [Project, User],
    })

    console.log('fetchedOrg is: ', fetchedOrg)

    return res.json(fetchedOrg)
  } catch (error) {
    next(error)
  }
})

// PUT add user to org, '/api/organizations/:orgId/users/:userId' (AUTH USER ONLY)
router.put('/:orgId/users/:userId', checkUser, async (req, res, next) => {
  try {
    const {orgId, userId} = req.params
    if (isNaN(orgId)) return resNaN(orgId, res)
    if (isNaN(userId)) return resNaN(userId, res)

    const organization = await Organization.findByPk(orgId)
    if (!organization) return resDbNotFound(STR_ORGANIZATION, res)

    const user = await User.findByPk(userId)
    if (!user) return resDbNotFound(STR_USER, res)

    organization.addUser(user)

    return resAssoc(STR_ORGANIZATION, STR_USER, orgId, userId, res)
  } catch (err) {
    next(err)
  }
})

// PUT **remove** org from user's orgs '/api/organizations/:orgId/users/:userId' (AUTH USER ONLY)
router.delete('/:orgId/users/:userId', checkUser, async (req, res, next) => {
  try {
    const {orgId, userId} = req.params
    if (isNaN(orgId)) return resNaN(orgId, res)
    if (isNaN(userId)) return resNaN(userId, res)

    const organization = await Organization.findByPk(orgId)
    if (!organization) return resDbNotFound(STR_ORGANIZATION, res)

    const user = await User.findByPk(userId)
    if (!user) return resDbNotFound(STR_USER, res)

    organization.removeUser(user)

    return resUnassoc(STR_ORGANIZATION, STR_USER, orgId, userId, res)
  } catch (err) {
    next(err)
  }
})

// DELETE organization route '/api/organizations/:orgId' (AUTH USER ONLY)
router.delete('/:orgId', checkUser, async (req, res, next) => {
  try {
    const {orgId} = req.params
    if (isNaN(orgId)) return resNaN(orgId, res)

    const org = await Organization.destroy({where: {id: orgId}})
    if (!org) return resDbNotFound(STR_ORGANIZATION, res)

    return resDeleted(STR_ORGANIZATION, orgId, res)
  } catch (error) {
    next(error)
  }
})
