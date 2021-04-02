const {User, UserOrganization} = require('../../db/models')

const checkUser = async (req, res, next) => {
  // checks if someone is logged in
  if (req.session.passport) {
    // this reqId is only accessible if someone is logged in
    const reqId = req.session.passport.user
    const user = await User.findByPk(reqId)

    if ((user && user.id === reqId) || (user && user.status === 'admin')) {
      // if logged-in user OR admin
      next()
    } else {
      // if logged-in user is NOT in user db
      res.status(403).send('Forbidden')
    }
  } else if (
    process.env.NODE_ENV === 'test' &&
    req.headers['user-agent'].indexOf('superagent')
  ) {
    next()
  } else {
    // this block runs when nobody is logged in
    res.status(401).send('Unauthorized')
  }
}

const checkAdmin = async (req, res, next) => {
  // checks if someone is logged in
  if (req.session.passport) {
    // this reqId is only accessible if someone is logged in
    const reqId = req.session.passport.user
    const user = await User.findByPk(reqId)

    if (user && user.status === 'admin') {
      // if admin
      next()
    } else {
      // if logged-in user is NOT in user db / NOT an admin
      res.status(403).send('Forbidden')
    }
  } else if (
    process.env.NODE_ENV === 'test' &&
    req.headers['user-agent'].indexOf('superagent')
  ) {
    next()
  } else {
    // this block runs when nobody is logged in
    res.status(401).send('Unauthorized')
  }
}

const checkOrgAdmin = async (req, res, next) => {
  if (req.session.passport) {
    const reqId = req.session.passport.user

    let user = await UserOrganization.findOne({
      where: {
        userId: reqId,
        organizationId: req.body.orgId,
      },
    })

    user.role === 'admin' ? next() : res.status(401).send('Unauthorized')
  } else {
    res.status(401).send('Unauthorized')
  }
}

const checkUserOrg = async (req, res, next) => {
  const userId = req.session.passport.user
  const {orgId} = req.params

  let user = await UserOrganization.findOne({
    where: {
      userId: userId,
      organizationId: orgId,
    },
  })

  if (user) {
    next()
  } else {
    res.status(401).send('Unauthorized')
  }
}

module.exports = {checkUser, checkAdmin, checkOrgAdmin, checkUserOrg}
