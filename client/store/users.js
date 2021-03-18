import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'
const UPDATE_USER = 'UPDATE_USER'

const getAllUsers = (users) => ({
  type: GET_ALL_USERS,
  users,
})
const updateUser = (user) => ({
  type: UPDATE_USER,
  user,
})

export const fetchAllUsers = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getAllUsers(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const fetchUpdateUser = (user) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/users/${user.id}`, user)
      dispatch(updateUser(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initState = []

export default (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case UPDATE_USER:
      return state.map((user) => {
        return user.id === action.user.id ? action.user : user
      })
    default:
      return state
  }
}
