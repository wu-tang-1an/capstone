const router = require('express').Router()
const {User, Task, Comment} = require('../db/models')
const {checkUser, checkAdmin} = require('./helper/gatekeeper')
const {
  resNaN,
  resDbNotFound,
  resDeleted,
  resAssoc,
  resUnassoc,
} = require('./helper/helper')
const {STR_COMMENTS, STR_COMMENT} = require('./helper/strings')

// GET all comments route '/api/comments' (ADMIN ONLY)
router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Task,
        },
      ],
    })
    if (!comments) return resDbNotFound(STR_COMMENTS, res)

    return res.json(comments)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// GET single comment route '/api/comments/:commentId'
// this route needs to be open access -- no gatekeeper!
router.get('/:commentId', async (req, res, next) => {
  try {
    const {commentId} = req.params
    if (isNaN(commentId)) return resNaN(commentId, res)

    const foundComment = await Comment.findByPk(+commentId, {
      include: [
        {
          model: User,
        },
      ],
    })
    if (!foundComment) return resDbNotFound(STR_COMMENT, res)

    res.json(foundComment)
  } catch (err) {
    next(err)
  }
})

// PUT single comment route '/api/comments/:commentId' (AUTH USER ONLY)
router.put('/:commentId', checkUser, async (req, res, next) => {
  try {
    const {text, editTimeStamp} = req.body
    const {commentId} = req.params
    if (isNaN(commentId)) return resNaN(commentId, res)

    const thisComment = await Comment.findByPk(commentId, {
      include: [
        {
          model: User,
        },
      ],
    })
    if (!thisComment) return resDbNotFound(STR_COMMENT, res)

    // reassign comment and persist to db
    // then reload and return
    thisComment.text = text
    thisComment.editTimeStamp = editTimeStamp
    await thisComment.save()
    await thisComment.reload()

    return res.json(thisComment)
  } catch (err) {
    next(err)
  }
})

//DELETE single comment route '/api/comments/:commentId' (AUTH USER ONLY)
router.delete('/:commentId', checkUser, async (req, res, next) => {
  try {
    const {commentId} = req.params
    if (isNaN(commentId)) return resNaN(commentId, res)

    const comment = await Comment.findByPk(commentId)
    if (!comment) return resDbNotFound(STR_COMMENT, res)

    await comment.destroy()

    return resDeleted(STR_COMMENT, commentId, res)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router
