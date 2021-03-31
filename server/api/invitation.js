const router = require('express').Router()
const {User, Invitation, Organization} = require('../db/models')
const {checkOrgAdmin} = require('./helper/gatekeeper')

router.get('/', async (req, res, next) => {
  try {
    const invitations = await Invitation.findAll()
    res.json(invitations)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params

    let user = await User.findByPk(userId)
    user = await user.getInvitations()
    res.json(user)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.post('/', checkOrgAdmin, async (req, res, next) => {
  try {
    const orgId = req.body.orgId
    const userEmail = req.body.userEmail

    const org = await Organization.findByPk(orgId)

    const invitation = await Invitation.create({
      orgId: orgId,
      orgPicture: org.imageUrl,
      orgName: org.name,
    })

    let user = await User.findOne({
      where: {
        email: userEmail,
      },
    })

    if (user) {
      user = await user.addInvitation(invitation)
      res.json(user)
    } else {
      res.json('User not found!')
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.delete('/:inviteId', async (req, res, next) => {
  try {
    const {inviteId} = req.params
    let invite = await Invitation.findByPk(inviteId)
    await invite.destroy()
    res.send('Invite Deleted!').status(202)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
