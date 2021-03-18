const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/tasks', require('./tasks'))
router.use('/organization', require('./organization'))
router.use('/columns', require('./columns'))
router.use('/projects', require('./projects'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
