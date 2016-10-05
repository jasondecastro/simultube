import { combineReducers } from 'redux'
import topicsReducer from './topicsReducer'

const rootReducer =  combineReducers({
  topics: topicsReducer
})

export default rootReducer
