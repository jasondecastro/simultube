import React, { Component } from 'react'
import '../static/bootstrap.min.css'
import '../static/hallway.css'


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
      <div>
        <Hallway />
      </div>
    )
  }
}

export default App
