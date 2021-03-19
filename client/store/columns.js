import axios from 'axios'

const GET_ALL_COLUMNS = 'GET_ALL_COLUMNS'

const getAllColumns = (columns) => ({
  type: GET_ALL_COLUMNS,
  columns,
})

const initialState = [
  {
    id: 1,
    name: 'Todo',
  },
  {
    id: 2,
    name: 'In-progress',
  },
  {
    id: 3,
    name: 'Review',
  },
  {
    id: 4,
    name: 'Done',
  },
]

export default function columns(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
