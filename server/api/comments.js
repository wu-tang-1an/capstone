const router = require('express').Router()
const {User, Task, Comment} = require('../db/models')

//will get all the comments from all taskd
router.get('/', async (req, res, next) => {
  try {
    const comments = await Comment.findAll()

    res.json(comments)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

//DELETE comment based on commentId
router.delete('/:commentId', async (req, res, next) => {
  try {
    const {commentId} = req.params
    const comment = await Comment.findByPk(commentId)

    await comment.destroy()
    res.status(202).send('Comment was deleted!')
  } catch (e) {
    console.log(e)
    next(e)
  }
})

module.exports = router
