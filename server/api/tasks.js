const router = require('express').Router()
const {User, UserOrganization, Organization, Task} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await Task.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})
