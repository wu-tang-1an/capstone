import axios from 'axios'
import history from '../history'

// INVITES

export async function sendInvite(inviteObj) {
  try {
    let response = await axios.post('/api/invitations', {
      orgId: inviteObj.orgId,
      userEmail: inviteObj.userEmail,
    })

    return response
  } catch (e) {
    console.log(e)
  }
}

/* ORGANIZATION*/

export async function getOrganizationRole(userId, orgId) {
  try {
    let admin = false
    let {data} = await axios.get(`/api/users/${userId}/organizations/${orgId}`)

    if (data.role === 'admin') admin = true

    return admin
  } catch (e) {
    console.log(e)
  }
}

export const addOrganizationDB = async (newOrg) => {
  try {
    const {data} = await axios.post(`/api/organizations/`, newOrg)
    return data
  } catch (err) {
    console.error(err)
  }
}

export const addUserToOrgDB = async (orgId, userId) => {
  try {
    const {data} = await axios.put(
      `/api/organizations/${orgId}/users/${userId}`
    )
    return data
  } catch (err) {
    console.error(err)
  }
}

/* COLUMNS */

// get all columns for a project
export const getColumnsDB = async (projectId) => {
  try {
    const {data} = await axios.get(`/api/projects/${projectId}`)
    return data.columns
  } catch (err) {
    console.error(err)
  }
}

// add a column
export const addColumnDB = async (newColumn) => {
  try {
    const {data} = await axios.post(`/api/columns/`, newColumn)
    return data
  } catch (err) {
    console.error(err)
  }
}

// delete a column and its associated tasks
export const deleteColumnDB = async (columnId) => {
  try {
    await axios.delete(`/api/columns/${columnId}`)
  } catch (err) {
    console.error(err)
  }
}

// update columns after drop
export const dropUpdateDb = async (
  sourColId,
  destColId,
  sourFETasks,
  destFETasks,
  taskId
) => {
  try {
    // remove task from source column
    await axios.delete(`/api/columns/${sourColId}/tasks/${taskId}`)

    // add task to destination column
    await axios.put(`/api/columns/${destColId}/tasks/${taskId}`)

    // update source column task indexes by getting tasks in a column from
    // the database, and then for each task in the database for a column,
    // update its index from the frontend reordering of the tasks array
    const sourDbTasks = await axios.get(`/api/columns/${sourColId}/tasks`)

    sourDbTasks.data.forEach(async (task) => {
      const sourTask = sourFETasks.find((tas) => tas.id === task.id)
      task.index = sourTask.index
      await axios.put(`/api/tasks/${task.id}`, task)
    })

    // update dest column task indexes by getting tasks in a column from
    // the database, and then for each task in the database for a column,
    // update its index from the frontend reordering of the tasks array
    const destDbTasks = await axios.get(`/api/columns/${destColId}/tasks`)

    destDbTasks.data.forEach(async (task) => {
      const destTask = destFETasks.find((tas) => tas.id === task.id)
      task.index = destTask.index
      await axios.put(`/api/tasks/${task.id}`, task)
    })
  } catch (err) {
    console.error(err)
  }
}

/* TASKS */

// fetch a single task
export const fetchTaskDB = async (taskId) => {
  try {
    const {data} = await axios.get(`/api/tasks/${taskId}`)
    return data
  } catch (err) {
    console.error(err)
  }
}

// add task to a column
export const addTaskToColumnDB = async (newTask, columnId) => {
  try {
    const {data} = await axios.post(`/api/tasks/columns/${columnId}`, newTask)

    return data
  } catch (err) {
    console.error(err)
  }
}

// update task
export const updateTaskDB = async (updateInfo, taskId) => {
  try {
    const {data} = await axios.put(`/api/tasks/${taskId}`, updateInfo)

    return data
  } catch (err) {
    console.error(err)
  }
}

// delete task and cascade to its comments, user
export const deleteTaskDB = async (taskId) => {
  try {
    await axios.delete(`/api/tasks/${taskId}`)
  } catch (err) {
    console.error(err)
  }
}

/* COMMENTS */

// get a single comment
export const getCommentDB = async (commentId) => {
  try {
    const {data} = await axios.get(`/api/comments/${commentId}`)
    return data
  } catch (err) {
    console.error(err)
  }
}

// add comment to a task
export const addCommentToTaskDB = async (newComment, taskId) => {
  try {
    const {data} = await axios.post(`/api/comments/tasks/${taskId}`, newComment)
    return data
  } catch (err) {
    console.error(err)
  }
}

export const updateCommentDB = async (commentId, updateInfo) => {
  try {
    const {data} = await axios.put(`/api/comments/${commentId}`, updateInfo)
    return data
  } catch (err) {
    console.error(err)
  }
}

// delete comment from a task
export const deleteCommentDB = async (commentId) => {
  try {
    const {data} = await axios.delete(`/api/comments/${commentId}`)
    return data
  } catch (err) {
    console.error(err)
  }
}

/* ---- USER ACTIONS ---- */

/* LOGOUT */

// log user out
export const logout = async () => {
  try {
    await axios.post('/auth/logout')
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}
