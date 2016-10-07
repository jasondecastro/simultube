import { combineReducers } from 'redux'
import topicsReducer from './topicsReducer'
import messagesReducer from './messagesReducer'
import usersReducer from './usersReducer'
import videosReducer from './videosReducer'

const rootReducer =  combineReducers({
  topics: topicsReducer,
  messages: messagesReducer,
  users: usersReducer,
  videos: videosReducer
})

export default rootReducer
