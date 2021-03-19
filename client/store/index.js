import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

// sub-reducers
import singleUser from './singleUser'
import users from './users'
import singleTask from './singleTask'
import tasks from './tasks'
import columns from './columns'
import organizations from './organizations'

const reducer = combineReducers({
  singleUser,
  users,
  singleTask,
  tasks,
  columns,
  organizations,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './singleUser'
