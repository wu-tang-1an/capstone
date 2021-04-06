import axios from 'axios'
import history from '../history'

/* USERS */

export const fetchUserDB = async (userId) => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`)
    return data
  } catch (err) {
    console.error(err)
  }
}

export const updateUserDB = async (userId, updateInfo) => {
  try {
    const {data} = await axios.put(`/api/users/${userId}`, updateInfo)
    return data
  } catch (err) {
    console.error(err)
  }
}

/* INVITES */

export const fetchUserInvites = async (userId) => {
  try {
    const {data} = await axios.get(`/api/invitations/${userId}/`)
    return data
  } catch (err) {
    console.error(err)
  }
}

// important! no returned value from put on this route
export const updateUserRoleDB = async (userId, orgId, inviteId, role) => {
  try {
    await axios.put(`/api/users/${userId}/organizations/${orgId}`, {
      role: role,
    })
    await axios.delete(`/api/invitations/${inviteId}`)
  } catch (err) {
    console.error(err)
  }
}

export const deleteInviteDB = async (inviteId) => {
  try {
    await axios.delete(`/api/invitations/${inviteId}`)
  } catch (err) {
    console.error(err)
  }
}

export const sendInvite = async (inviteObj) => {
  try {
    const response = await axios.post('/api/invitations', {
      orgId: inviteObj.orgId,
      userEmail: inviteObj.userEmail,
      inviter: inviteObj.inviter,
      role: inviteObj.role,
    })
    return response
  } catch (e) {
    console.log(e)
  }
}

/* ORGANIZATIONS */

// get a single org
export const getOrgDb = async (orgId) => {
  try {
    const {data} = await axios.get(`/api/organizations/${orgId}`)

    if (!data) return 404

    return data
  } catch (err) {
    console.error(err)
  }
}

export async function getOrganizationRole(userId, orgId) {
  try {
    const {data} = await axios.get(
      `/api/users/${userId}/organizations/${orgId}`
    )

    if (!data) return 404

    return data.role === 'admin'
  } catch (e) {
    console.log(e)
  }
}

export const addOrganizationDB = async ({userId, newOrg}) => {
  try {
    // remove imageUrl key if empty to trigger Sequelize defaultValue imageUrl
    if (!newOrg.imageUrl) delete newOrg.imageUrl

    const {data} = await axios.post(`/api/organizations/`, {userId, newOrg})
    return data
  } catch (err) {
    console.error(err)
  }
}

export const deleteOrganizationDB = async (orgId) => {
  try {
    const {data} = await axios.delete(`/api/organizations/${orgId}`)
    return data
  } catch (err) {
    console.error(err)
  }
}

export const editOrganizationDB = async (orgId, updateInfo) => {
  try {
    const {data} = await axios.put(`/api/organizations/${orgId}`, updateInfo)
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

export const removeUserFromOrgDB = async (orgId, userId) => {
  try {
    await axios.delete(`/api/organizations/${orgId}/users/${userId}`)
  } catch (err) {
    console.error(err)
  }
}

export const fetchAllOrganizations = async () => {
  try {
    const {data} = await axios.get('/api/organizations')
    return data
  } catch (err) {
    console.error(err)
  }
}

export const fetchUserOrgs = async (userId) => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/organizations`)
    return data
  } catch (err) {
    console.error(err)
  }
}

/* PROJECTS */

// create a project
export const createProjectDb = async (orgId, project) => {
  try {
    const {data} = await axios.post(
      `/api/projects/organizations/${orgId}`,
      project
    )
    return data
  } catch (err) {
    console.log(err)
  }
}

// update a project
export const updateProjectDb = async (projectId, updateData) => {
  try {
    const data = await axios.put(`/api/projects/${projectId}`, updateData)
    return data
  } catch (err) {
    console.log(err)
  }
}

// delete a project
export const deleteProjectDb = async (projectId) => {
  try {
    await axios.delete(`/api/projects/${projectId}`)
  } catch (err) {
    console.log(err)
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
export const addColumnDB = async (newColumn, projectId) => {
  try {
    const {data} = await axios.post(
      `/api/columns/projects/${projectId}`,
      newColumn
    )
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
    await axios.put(`/api/tasks/drop`, {
      sourColId,
      destColId,
      sourFETasks,
      destFETasks,
      taskId,
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

// add user to task
// important! returns a BOOLEAN indicating success / failure
export const addUserToTaskDB = async (userId, taskId) => {
  try {
    const response = await axios.put(`/api/tasks/${taskId}/users/${userId}`)
    return response.status === 200
  } catch (err) {
    console.error(err)
  }
}

// remove user from task
export const removeUserFromTaskDB = async (userId, taskId) => {
  try {
    const response = await axios.delete(`/api/tasks/${taskId}/users/${userId}`)
    return response.status === 200
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
