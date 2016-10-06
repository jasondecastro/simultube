import { combineReducers } from 'redux'
import topicsReducer from './topicsReducer'
import messagesReducer from './messagesReducer'
import usersReducer from './usersReducer'

const rootReducer =  combineReducers({
  topics: topicsReducer,
  messages: messagesReducer,
  users: usersReducer
})

export default rootReducer
