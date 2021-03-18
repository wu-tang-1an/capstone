import axios from 'axios'

const GET_ALL_TASKS = 'GET_ALL_TASKS'
const UPDATE_TASK = 'UPDATE_TASK'

const getAllTasks = (tasks) => ({
  type: GET_ALL_TASKS,
  tasks,
})
const updateTask = (task) => ({
  type: UPDATE_TASK,
  task,
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

const initState = []

export default (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return action.tasks
    case UPDATE_TASK:
      // map state and update the task that matches
      // our dispatched taskId
      return state.map((task) => {
        return task.id === action.task.id ? action.task.id : task
      })
    default:
      return state
  }
}
