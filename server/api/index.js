const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/tasks', require('./tasks'))
router.use('/organizations', require('./organizations'))
router.use('/columns', require('./columns'))
router.use('/projects', require('./projects'))
router.use('/comments', require('./comments'))
router.use('/invitations', require('./invitation'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
