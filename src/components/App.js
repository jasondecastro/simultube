import React, { Component } from 'react'
import '../static/bootstrap.min.css'

import Chatroom from './Chatroom'

class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
  }

  mainHandler(message) {
    this.setState((state) => ({
      messages: state.messages.concat({
        username: 'jason',
        content: message
      })
    }))
  }

  messages() {
    return this.state.messages
  }

  render() {
    return (
      <div className="App">
        <Chatroom messages={this.messages.bind(this)} mainHandler={this.mainHandler.bind(this)} />
      </div>
    )
  }
}

export default App
