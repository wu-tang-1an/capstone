import axios from 'axios'

const GET_SINGLE_TASK = 'GET_SINGLE_TASK'

const getSingleTask = (task) => ({
  type: GET_SINGLE_TASK,
  task,
})

export const fetchSingleTask = (taskId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/tasks/${taskId}`)
      dispatch(getSingleTask(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initState = {}

export default (state = initState, action) => {
  switch (action.type) {
    case GET_SINGLE_TASK:
      return action.task
    default:
      return state
  }
}
