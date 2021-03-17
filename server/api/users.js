const router = require('express').Router()
const {User, UserOrganization, Organization} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
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
