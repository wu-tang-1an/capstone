const router = require('express').Router()
const {User, Organization} = require('../db/models')
const {checkUser, checkAdmin} = require('./gatekeeper')
module.exports = router

// GET all users route '/api/users' (ADMIN ONLY)
router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id, name, and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'firstName', 'lastName', 'email'],
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

// GET single user route '/api/users/:userId' (AUTH USER ONLY)
router.get('/:userId', checkUser, async (req, res, next) => {
  try {
    const {userId} = req.params

    if (isNaN(userId)) res.status(400).send(userId + ' is not a number!')
    else {
      const user = await User.findByPk(userId)

      // if user doesn't exist
      if (!user) res.status(404).send('User not found in database!')

      res.json(user)
    }
  } catch (error) {
    next(error)
  }
})

// GET single user's tasks route '/api/users/:userId/tasks'
router.get('/:userId/tasks', checkUser, async (req, res, next) => {
  try {
    const {userId} = req.params

    if (isNaN(userId)) res.status(400).send(userId + ' is not a number!')
    else {
      const user = await User.findByPk(userId)

      // if user doesn't exist
      if (!user) res.status(404).send('User not found in database!')

      const tasks = await user.getTasks()
      res.json(tasks)
    }
  } catch (error) {
    next(error)
  }
})

// POST create new user route '/api/users'
router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    const {dataValues} = await User.create(data)

    res.status(201).json(dataValues)
  } catch (error) {
    next(error)
  }
})

// PUT update user route '/api/users/:userId'
router.put('/:userId', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {userId} = req.params

    if (isNaN(userId)) res.status(400).send(userId + ' is not a number!')
    else {
      const [updatedRows, updatedUser] = await User.update(data, {
        plain: true,
        returning: true,
        where: {id: userId},
      })

      res.json(updatedUser)
    }
  } catch (error) {
    next(error)
  }
})

// PUT add org to user route '/api/users/:userId/organizations/:orgId'
router.put(
  '/:userId/organizations/:orgId',
  checkUser,
  async (req, res, next) => {
    try {
      const {userId, orgId} = req.params

      if (isNaN(userId)) res.status(400).send(userId + ' is not a number!')
      if (isNaN(orgId)) res.status(400).send(orgId + ' is not a number!')

      const user = await User.findByPk(userId)
      if (!user) res.status(404).send('User not found in database!')

      const org = await Organization.findByPk(orgId)
      if (!org) res.status(404).send('Organization not found in database!')

      user.addOrganizations(org)
    } catch (error) {
      next(error)
    }
  }
)

// DELETE user route '/api/users/:userId'
router.delete('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params

    if (isNaN(userId)) res.status(400).send(userId + ' is not a number!')

    await User.destroy({where: {id: userId}})

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
