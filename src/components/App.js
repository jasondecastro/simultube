import React, { Component } from 'react'
import '../static/bootstrap.min.css'

import Rooms from './Rooms'

class App extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    window.history.pushState('hallway', 'Hallway', '/hallway')
  }

  render() {
    return (
      <div className="App">
        <Rooms />
      </div>
    )
  }
}

export default App
