import axios from 'axios'

const GET_ALL_ORGS = 'GET_ALL_ORGS'
const RESET = 'RESET'

const getAllOrgs = (orgs) => {
  return {
    type: GET_ALL_ORGS,
    organizations: orgs,
  }
}

const initialState = []

export function fetchOrgs(userId) {
  return async (dispatch) => {
    try {
      let {data} = await axios.get(`/api/users/${userId}/organizations`)
      dispatch(getAllOrgs(data))
    } catch (e) {
      console.log(e)
    }
  }
}

export function reset() {
  return {
    type: RESET,
    organizations: [],
  }
}

export function resetState() {
  return (dispatch) => {
    dispatch(reset())
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORGS:
      return [...state, ...action.organizations]
    case RESET:
      return initialState
    default:
      return state
  }
}
