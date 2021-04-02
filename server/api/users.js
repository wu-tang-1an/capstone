const router = require('express').Router()
const {
  User,
  Organization,
  Project,
  Column,
  Task,
  Comment,
  UserOrganization,
} = require('../db/models')
const {checkUser, checkAdmin} = require('./helper/gatekeeper')
const {
  resNaN,
  resDbNotFound,
  resAssoc,
  resUnassoc,
  resDeleted,
} = require('./helper/helper')
const {STR_USERS, STR_USER, STR_ORGANIZATION} = require('./helper/strings')
module.exports = router

// const dee = User.prototype
// console.log('dee Add User---->', dee)

// GET all users route '/api/users' (ADMIN ONLY)
router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id, name, and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'firstName', 'lastName', 'email'],
    })
    if (!users) return resDbNotFound(STR_USERS, res)

    return res.json(users)
  } catch (error) {
    next(error)
  }
})

// GET single user with (tasks + comments), (user + comments) route '/api/users/:userId' (AUTH USER ONLY)
router.get('/:userId', checkUser, async (req, res, next) => {
  try {
    const {userId} = req.params
    if (isNaN(userId)) return resNaN(userId, res)

    const user = await User.findByPk(userId, {
      include: [
        Comment,
        {
          model: Task,
          // include: [Comment], do we need the task comments here?
        },
      ],
    })
    if (!user) return resDbNotFound(STR_USER, res)

    return res.json(user)
  } catch (error) {
    next(error)
  }
})

// GET single user's tasks route '/api/users/:userId/tasks' (AUTH USER ONLY)
router.get('/:userId/tasks', checkUser, async (req, res, next) => {
  try {
    const {userId} = req.params
    if (isNaN(userId)) return resNaN(userId, res)

    const user = await User.findByPk(userId)
    if (!user) return resDbNotFound(STR_USER, res)

    const tasks = await user.getTasks()
    return res.json(tasks)
  } catch (error) {
    next(error)
  }
})

// GET single user's organizations route '/api/users/:userId/organizations' (AUTH USER ONLY)
router.get('/:userId/organizations', checkUser, async (req, res, next) => {
  try {
    const {userId} = req.params
    if (isNaN(userId)) return resNaN(userId, res)

    const user = await User.findByPk(userId)
    if (!user) return resDbNotFound(STR_USER, res)

    const orgs = await user.getOrganizations({
      include: [
        {
          model: Project,
          include: [
            {
              model: Column,
              include: [
                {
                  model: Task,
                  include: [
                    {
                      model: User,
                      include: [
                        {
                          model: Comment,
                          include: [User],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    })
    return res.json(orgs)
  } catch (error) {
    next(error)
  }
})

// get a specific user's org
router.get('/:userId/organizations/:orgId', async (req, res, next) => {
  try {
    const {userId, orgId} = req.params

    let user = await UserOrganization.findOne({
      where: {
        userId: userId,
        organizationId: orgId,
      },
    })

    return res.json(user)
  } catch (error) {
    next(error)
  }
})

// post create new organzation for userId
router.post('/:userId/organizations/', checkAdmin, async (req, res, next) => {
  try {
    const {userId} = req.params
    if (isNaN(userId)) return resNaN(userId, res)

    const user = await User.findByPk(userId)
    if (!user) return resDbNotFound(STR_USER, res)

    if (user.status === 'admin') {
      const addOrg = await user.createOrganization(req.body)

      return res.json(addOrg)
    }
  } catch (error) {
    next(error)
  }
})

//GET a single user's comments
router.get('/:userId/comments', async (req, res, next) => {
  try {
    const {userId} = req.params

    let user = await User.findByPk(userId)

    user = await user.getComments()
    res.json(user)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

// POST create new user route '/api/users'
router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    const {dataValues} = await User.create(data)

    return res.status(201).json(dataValues)
  } catch (error) {
    next(error)
  }
})

// PUT update user route '/api/users/:userId' (AUTH USER ONLY)
router.put('/:userId', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {userId} = req.params
    if (isNaN(userId)) return resNaN(userId, res)

    const [, updatedUser] = await User.update(data, {
      plain: true,
      returning: true,
      where: {id: userId},
    })
    if (!updatedUser) return resDbNotFound(STR_USER, res)

    return res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

// PUT add org to user route '/api/users/:userId/organizations/:orgId' (AUTH USER ONLY)
router.put(
  '/:userId/organizations/:orgId',
  checkUser,
  async (req, res, next) => {
    try {
      const {userId, orgId} = req.params
      if (isNaN(userId)) return resNaN(userId, res)
      if (isNaN(orgId)) return resNaN(orgId, res)

      const user = await User.findByPk(userId)
      if (!user) return resDbNotFound(STR_USER, res)

      const org = await Organization.findByPk(orgId)
      if (!org) return resDbNotFound(STR_ORGANIZATION, res)

      user.addOrganization(org)

      return resAssoc(STR_USER, STR_ORGANIZATION, userId, orgId, res)
    } catch (error) {
      next(error)
    }
  }
)

// DELETE user route '/api/users/:userId'  (ADMIN ONLY)
router.delete('/:userId', checkAdmin, async (req, res, next) => {
  try {
    const {userId} = req.params
    if (isNaN(userId)) return resNaN(userId, res)

    const user = await User.destroy({where: {id: userId}})
    if (!user) return resDbNotFound(STR_USER, res)

    return resDeleted(STR_USER, userId, res)
  } catch (error) {
    next(error)
  }
})
