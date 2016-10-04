import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, browserHistory } from 'react-router'

import App from './components/App'
import Chatroom from './components/Chatroom'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/hallway" component={App} />
    <Route path="/rooms/:id" component={Chatroom} />
  </Router>,
  document.getElementById('root')
)
