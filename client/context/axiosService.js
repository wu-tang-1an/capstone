import axios from 'axios'
import history from '../history'

/* COLUMNS */

// add a column
const addColumnDB = async (newColumn) => {
  try {
    await axios.post(`/api/columns/`, newColumn)
  } catch (err) {
    console.error(err)
  }
}

// delete a column and move its tasks to the previous column
const deleteColumnDB = async (columnId) => {
  try {
    await axios.delete(`/api/columns/${columnId}`)
  } catch (err) {
    console.error(err)
  }
}

/* TASKS */

// add task to a column
const addTaskToColumnDB = async (newTask) => {
  try {
    await axios.post('/tasks/columns/:columnId', newTask)
  } catch (err) {
    console.error(err)
  }
}

// delete task and cascade to its comments, user
const deleteTaskDB = async (taskId) => {
  try {
    await axios.delete(`/api/tasks/${taskId}`)
  } catch (err) {
    console.error(err)
  }
}

/* COMMENTS */

// add comment to a task
const addCommentToTaskDB = async (newComment) => {
  try {
    await axios.post(`/api/comments`, newComment)
  } catch (err) {
    console.error(err)
  }
}

// delete comment from a task
const deleteCommentDB = async (commentId) => {
  try {
    await axios.delete(`/api/comments/${commentId}`)
  } catch (err) {
    console.error(err)
  }
}

/* ---- USER ACTIONS ---- */

/* LOGOUT */

// log user out
const logout = async () => {
  try {
    await axios.post('/auth/logout')
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/* SIGNUP */

// create user account and bounce them back to login page