const router = require('express').Router()
const {
  Project,
  Column,
  Organization,
  Task,
  Comment,
  User,
} = require('../db/models')
const {checkUser, checkAdmin} = require('./helper/gatekeeper')
const {resNaN, resDbNotFound, resAssoc, resDeleted} = require('./helper/helper')
const {
  STR_PROJECTS,
  STR_PROJECT,
  STR_ORGANIZATION,
  STR_COLUMNS,
  STR_COLUMN,
  STR_TASKS,
} = require('./helper/strings')
module.exports = router

// GET all projects route '/api/projects' (ADMIN ONLY)
router.get('/', checkAdmin, async (req, res, next) => {
  try {
    const projects = await Project.findAll()
    if (!projects) return resDbNotFound(STR_PROJECTS, res)

    return res.json(projects)
  } catch (error) {
    next(error)
  }
})

// GET single project route '/api/projects/:projectId' (AUTH USER ONLY)
router.get('/:projectId', checkUser, async (req, res, next) => {
  try {
    const {projectId} = req.params
    if (isNaN(projectId)) return resNaN(projectId, res)

    const project = await Project.findByPk(projectId, {
      include: [
        {
          model: Column,
          include: [
            {
              model: Task,
              include: [
                {
                  model: User,
                },
                {
                  model: Comment,
                  include: [
                    {
                      model: User,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    })
    if (!project) return resDbNotFound(STR_PROJECT, res)

    return res.json(project)
  } catch (error) {
    next(error)
  }
})

// POST create new project route '/api/projects/' (AUTH USER ONLY)
// creates a free floating project (unassociated)
router.post('/', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {dataValues} = await Project.create(data)

    return res.json(dataValues)
  } catch (error) {
    next(error)
  }
})

// PUT edit project route '/api/projects/:projectId' (AUTH USER ONLY)
router.put('/:projectId', checkUser, async (req, res, next) => {
  try {
    const data = req.body
    const {projectId} = req.params
    if (isNaN(projectId)) return resNaN(projectId, res)

    const [, updatedProject] = await Project.update(data, {
      plain: true,
      returning: true,
      where: {id: projectId},
    })
    if (!updatedProject) return resDbNotFound(STR_PROJECT, res)

    return res.json(updatedProject)
  } catch (error) {
    next(error)
  }
})

// PUT set project to org route '/api/projects/:projectId/organizations/:orgId' (AUTH USER ONLY)
router.put(
  '/:projectId/organizations/:orgId',
  checkUser,
  async (req, res, next) => {
    try {
      const {projectId, orgId} = req.params
      if (isNaN(projectId)) return resNaN(projectId, res)
      if (isNaN(orgId)) return resNaN(orgId, res)

      const project = await Project.findByPk(projectId)
      if (!project) return resDbNotFound(STR_PROJECT, res)

      const org = await Organization.findByPk(orgId)
      if (!org) return resDbNotFound(STR_ORGANIZATION, res)

      project.setOrganization(org)

      return resAssoc(STR_PROJECT, STR_ORGANIZATION, projectId, orgId, res)
    } catch (error) {
      next(error)
    }
  }
)

// DELETE project route '/api/projects/:projectId' (AUTH USER ONLY)
router.delete('/:projectId', checkUser, async (req, res, next) => {
  try {
    const {projectId} = req.params
    if (isNaN(projectId)) return resNaN(projectId, res)

    // get project columns
    const projectColumns = await Column.findAll({
      where: {
        projectId: projectId,
      },
    })
    if (!projectColumns) return resDbNotFound(STR_COLUMNS, res)

    projectColumns.forEach(async (col) => {
      // get column tasks
      const columnTasks = await Task.findAll({
        where: {
          columnId: col.id,
        },
      })
      if (!columnTasks) return resDbNotFound(STR_TASKS, res)

      // destroy column tasks before destroying column
      // this removes tasks from db rather than simply
      // removing the association of a task to a column
      columnTasks.forEach(async (task) => {
        // should we destroy task comments as well?
        await Task.destroy({
          where: {
            id: task.id,
          },
        })
      })

      // then destroy column
      const column = await Column.destroy({
        where: {
          id: col.id,
        },
      })
      if (!column) return resDbNotFound(STR_COLUMN, res)
    })

    // now destroy project
    const project = await Project.destroy({where: {id: projectId}})
    if (!project) return resDbNotFound(STR_PROJECT, res)

    return resDeleted(STR_PROJECT, projectId, res)
  } catch (error) {
    next(error)
  }
})
