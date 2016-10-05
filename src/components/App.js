import React, { Component } from 'react'

import '../static/bootstrap.min.css'
import '../static/hallway.css'
import '../static/stage.css'
import '../static/chatbox.css'

import Hallway from './Hallway'

class App extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    window.history.pushState('hallway', 'Hallway', '/hallway')
  }

  render() {
    return (
      <Hallway />
    )
  }
}

export default App
