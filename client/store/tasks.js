import axios from 'axios'

const GET_ALL_TASKS = 'GET_ALL_TASKS'
const ADD_TASK = 'ADD_TASK'
const UPDATE_TASK = 'UPDATE_TASK'
const DELETE_TASK = 'DELETE_TASK'

const getAllTasks = (tasks) => ({
  type: GET_ALL_TASKS,
  tasks,
})

const addTask = (columnId, name) => ({
  type: ADD_TASK,
  name,
})

const updateTask = (task) => ({
  type: UPDATE_TASK,
  task,
})
const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  taskId,
})

export const fetchAllTasks = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/tasks')
      dispatch(getAllTasks(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchAddTask = (task) => {
  return async (dispatch) => {
    let {data} = await axios.post(`/api/tasks/`, task)
    dispatch(addTask(data))
  }
}

export const fetchUpdateTask = (task) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/tasks/${task.id}`, task)
      dispatch(updateTask(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const fetchDeleteTask = (taskId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`)
      dispatch(deleteTask(taskId))
    } catch (err) {
      console.error(err)
    }
  }
}

const initState = []

export default (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return action.tasks
    case ADD_TASK:
      return [...state, action.task]
    case UPDATE_TASK:
      // map state and update the task that matches
      // our dispatched taskId
      return state.map((task) => {
        return task.id === action.task.id ? action.task.id : task
      })
    case DELETE_TASK:
      return state.filter((task) => task.id !== action.taskId)
    default:
      return state
  }
}
