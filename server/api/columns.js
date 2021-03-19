const router = require('express').Router()
const {Column} = require('../db/models')
module.exports = router

// GET all columns route '/api/columns'
router.get('/', async (req, res, next) => {
  try {
    const columns = await Column.findAll()
    res.json(columns)
  } catch (error) {
    next(error)
  }
})

// GET single column route '/api/columns/:columnId'
router.get('/:columnId', async (req, res, next) => {
  try {
    const {columnId} = req.params

    if (isNaN(columnId)) res.status(400).send(columnId + ' is not a number!')
    else {
      const column = await Column.findByPk(columnId)
      res.json(column)
    }
  } catch (error) {
    next(error)
  }
})

// POST create new column route '/api/columns/'
router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    const {dataValues} = await Column.create(data)

    res.status(201).json(dataValues)
  } catch (error) {
    next(error)
  }
})

// PUT edit column route '/api/columns/:columnId'
router.put('/:columnId', async (req, res, next) => {
  try {
    const data = req.body
    const {columnId} = req.params

    const [updatedRows, updatedColumn] = await Column.update(data, {
      plain: true,
      returning: true,
      where: {id: columnId},
    })

    res.json(updatedColumn)
  } catch (error) {
    next(error)
  }
})

// DELETE column route '/api/columns/:columnId'
router.delete('/:columnId', async (req, res, next) => {
  try {
    const {columnId} = req.params

    await Column.destroy({where: {id: columnId}})

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
