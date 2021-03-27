import axios from 'axios'
import history from '../history'

/* COLUMNS */

// add a column
export const addColumnDB = async (newColumn) => {
  try {
    const {data} = await axios.post(`/api/columns/`, newColumn)

    return data
  } catch (err) {
    console.error(err)
  }
}

// delete a column and move its tasks to the previous column
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
    console.log(err)
  }
}

/* TASKS */

// add task to a column
export const addTaskToColumnDB = async (newTask, columnId) => {
  try {
    const {data} = await axios.post(`/api/tasks/columns/${columnId}`, newTask)

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

// add comment to a task
export const addCommentToTaskDB = async (newComment) => {
  try {
    await axios.post(`/api/comments`, newComment)
  } catch (err) {
    console.error(err)
  }
}

// delete comment from a task
export const deleteCommentDB = async (commentId) => {
  try {
    await axios.delete(`/api/comments/${commentId}`)
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

/* SIGNUP */

// create user account and bounce them back to login page
