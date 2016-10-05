import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, browserHistory } from 'react-router'

import App from './components/App'
import Chatroom from './components/Chatroom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxPromise from 'redux-promise'
import rootReducer from './reducers'
import { fetchTopics } from './actions'

const store = createStore(rootReducer, applyMiddleware(ReduxPromise))
store.dispatch(fetchTopics())

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/hallway" component={App} />
      <Route path="/rooms/:id" component={Chatroom} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
