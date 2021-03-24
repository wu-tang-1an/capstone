const router = require('express').Router()
const {Organization, Project} = require('../db/models')
const {checkUser, checkAdmin} = require('./helper/gatekeeper')
const {resNaN, resDbNotFound, resDeleted} = require('./helper/helper')
const {STR_ORGANIZATIONS, STR_ORGANIZATION} = require('./helper/strings')
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
router.get('/:orgId', checkUser, async (req, res, next) => {
  try {
    const {orgId} = req.params
    if (isNaN(orgId)) return resNaN(orgId, res)

    const org = await Organization.findByPk(orgId, {include: Project})
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
    const data = req.body
    const {dataValues} = await Organization.create(data)

    return res.json(dataValues)
  } catch (error) {
    next(error)
  }
})

// PUT edit organization route '/api/organizations/:orgId' (AUTH USER ONLY)
router.put('/:orgId', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {orgId} = req.params
    if (isNaN(orgId)) return resNaN(orgId, res)

    const [, updatedOrg] = await Organization.update(data, {
      plain: true,
      returning: true,
      where: {id: orgId},
    })
    if (!updatedOrg) return resDbNotFound(STR_ORGANIZATION, res)

    return res.json(updatedOrg)
  } catch (error) {
    next(error)
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
