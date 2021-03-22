import axios from 'axios'

const GET_SINGLE_COLUMN = 'GET_SINGLE_COLUMN'

const getSingleColumn = (column) => ({
  type: GET_SINGLE_COLUMN,
  column,
})

export const fetchSingleTask = (columnId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/columns/${columnId}`)
      dispatch(getSingleColumn(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initState = {}

export default function column(state = initState, action) {
  switch (action.type) {
    case GET_SINGLE_COLUMN:
      return action.column
    default:
      return state
  }
}
