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
  } catch (err) {
    next(err)
  }
})

// GET single user route '/api/users/:userId' (AUTH USER ONLY)
router.get('/:userId', checkUser, async (req, res, next) => {
  try {
    const {userId} = req.params

    if (isNaN(userId)) res.status(400).send(userId + ' is not a number!')
    else {
      const user = await User.findByPk(userId)

      //if user doesn't exist
      if (!user) {
        res.status(404).send('User not found in database!')
      } else {
        res.json(user)
      }
    }
  } catch (error) {
    next(error)
  }
})

// GET single user's tasks route '/api/users/:userId/tasks'
router.get('/:userId/tasks', async (req, res, next) => {
  try {
    const {userId} = req.params

    if (isNaN(userId)) res.status(400).send(userId + ' is not a number!')
    else {
      const user = await User.findByPk(userId)

      //if user doesn't exist
      if (!user) {
        res.status(404).send('User not found in database!')
      } else {
        const tasks = await user.getTasks()
        res.json(tasks)
      }
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
router.put('/:userId', async (req, res, next) => {
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

// PUT
router.put('/addorg', async (req, res, next) => {
  try {
    //test route
    const UserFound = await User.findOne({
      where: {
        id: 2,
      },
    })

    const FoundOrg = await Organization.findByPk(1)

    UserFound.addOrganization(FoundOrg, {
      through: {
        role: 'user',
      },
    })

    res.json([UserFound, FoundOrg])
  } catch (e) {
    console.log(e)
    next(e)
  }
})

//delete user from the org
// now i just need a user id and org id
// to do it dynamically
router.delete('/delete-user-org', async (req, res, next) => {
  try {
    //test route
    const UserFound = await User.findOne({
      where: {
        id: 2,
      },
    })

    const FoundOrg = await Organization.findByPk(1)

    UserFound.removeOrganization(FoundOrg)

    res.json([UserFound, FoundOrg])
  } catch (e) {
    console.log(e)
    next(e)
  }
})

//deletes user from database
router.delete('/delete-user', async (req, res, next) => {
  try {
    const UserFound = await User.findOne({
      where: {
        id: 1,
      },
    })

    UserFound.destroy()
    res.send('user deleted')
  } catch (e) {
    console.log(e)
    next(e)
  }
})
