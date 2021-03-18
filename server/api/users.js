const router = require('express').Router()
const {User, UserOrganization, Organization} = require('../db/models')
module.exports = router

async function checkUser(req, res, next) {
  // checks if someone is logged in
  if (req.session.passport) {
    // this userId is only accessible if someone is logged in
    const userId = req.session.passport.user
    const {isUser} = await User.findByPk(userId)
    if (isUser) {
      //if logged-in user
      next()
    } else {
      // if logged-in user is NOT an user
      res.status(403).json({
        message: 'Access Denied',
      })
    }
  } else {
    // this block runs when nobody is logged in
    res.status(403).json({
      message: 'Access Denied',
    })
  }
}
router.get('/', checkUser, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await User.findByPk(userId)

    //if user doesn't exist
    if (!user) {
      console.log('user not found in GET /api/users/id')
      res.status(404).send('This user does not exist in our database')
    } else {
      res.status(200).json(user)
    }
  } catch (error) {
    next(error)
  }
})

// add user to org
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

router.post('/', async (req, res, next) => {
  try {
    const createUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
    })

    res.status(201).json(createUser)
  } catch (err) {
    next(err)
  }
})
