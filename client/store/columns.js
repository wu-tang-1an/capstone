import axios from 'axios'

const GET_ALL_COLUMNS = 'GET_ALL_COLUMNS'
const ADD_COLUMN = 'ADD_COLUMN'

const ADD_TASK = 'ADD_TASK'

const getAllColumns = (columns) => ({
  type: GET_ALL_COLUMNS,
  columns,
})

export const addColumn = (name) => ({
  type: ADD_COLUMN,
  name,
})

export const addTask = (columnId, description) => ({
  type: ADD_TASK,
  payload: {description, columnId},
})

export const fetchAllColumns = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/columns')
      dispatch(getAllColumns(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchAddColumn = (name) => {
  console.log('fetchAddColumnName--->', name)
  return async (dispatch) => {
    let {data} = await axios.post(`/api/columns/`, {name})
    console.log('helloData--->', data)
    dispatch(addColumn(data.name))
  }
}

export const fetchAddTask = (columnId, description) => {
  console.log('fetchAddTaskDescription--->', description)

  return async (dispatch) => {
    let {data} = await axios.post(`/api/tasks/columns/${columnId}`, {
      description,
    })

    console.log('helloDataDEEEEEEE--->', data)

    dispatch(addTask(data.description))
  }
}

const initialState = []

export default function columns(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COLUMNS:
      return action.columns
    case ADD_COLUMN:
      const newColumn = {
        name: action.name,
      }
      return [...state, newColumn]

    case ADD_TASK:
      const newTask = {
        description: action.payload.description,
      }

      const newState = state.map((column) => {
        if (column.id === action.payload.columnId) {
          return [...state, newTask]
        } else {
          return column
        }
      })
      return newState
    default:
      return state
  }
}
