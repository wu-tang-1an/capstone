const router = require('express').Router()
const {User, Invitation, Organization} = require('../db/models')

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

router.post('/', async (req, res, next) => {
  try {
    const orgId = req.body.orgId
    const userId = req.body.userId

    const org = await Organization.findByPk(orgId)

    const invitation = await Invitation.create({
      orgId: orgId,
      orgPicture: org.imageUrl,
      orgName: org.name,
    })

    let user = await User.findByPk(userId)
    user = await user.addInvitation(invitation)

    res.json(user)
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
