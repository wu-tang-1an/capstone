const {User} = require('../db/models')

async function checkUser(req, res, next) {
  // checks if someone is logged in
  if (req.session.passport) {
    // this userId is only accessible if someone is logged in
    const userId = req.session.passport.user
    const {isUser} = await User.findByPk(userId)

    if (isUser || (isUser && isUser.status === 'admin')) {
      //if logged-in user OR admin
      next()
    } else {
      // if logged-in user is NOT in user db
      res.status(403).json({
        message: 'Access Denied',
      })
    }
  } else if (
    process.env.NODE_ENV === 'test' &&
    req.headers['user-agent'].indexOf('superagent')
  ) {
    next()
  } else {
    // this block runs when nobody is logged in
    res.status(403).json({
      message: 'Access Denied',
    })
  }
}

async function checkAdmin(req, res, next) {
  // checks if someone is logged in
  if (req.session.passport) {
    // this userId is only accessible if someone is logged in
    const userId = req.session.passport.user
    const {isUser} = await User.findByPk(userId)

    if (isUser && isUser.status === 'admin') {
      //if admin
      next()
    } else {
      // if logged-in user is NOT in user db / NOT an admin
      res.status(403).json({
        message: 'Access Denied',
      })
    }
  } else if (
    process.env.NODE_ENV === 'test' &&
    req.headers['user-agent'].indexOf('superagent')
  ) {
    next()
  } else {
    // this block runs when nobody is logged in
    res.status(403).json({
      message: 'Access Denied',
    })
  }
}

module.exports = {checkUser, checkAdmin}
