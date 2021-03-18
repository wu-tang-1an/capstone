import axios from 'axios'

const GET_ALL_TASKS = 'GET_ALL_TASKS'

const getAllTasks = (tasks) => ({
  type: GET_ALL_TASKS,
  tasks,
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

const initState = []

export default (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return action.tasks
    default:
      return state
  }
}
