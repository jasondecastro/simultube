import React, { Component } from 'react'
import Messages from './Messages'
import MessageForm from './MessageForm'

class Chatroom extends Component {
  constructor() {
    super()
    this.state = {
      topic: 'The Garden'
    }
  }

  sendMessage(message) {
    this.props.mainHandler(message)
  }

  render() {
    return (
      <div className="container">
        <div className="row col-md-8 col-md-offset-2">
          <h1>{this.state.topic}</h1>
          <Messages messages={this.props.messages} />
          <MessageForm sendMessage={this.sendMessage.bind(this)} />
        </div>
      </div>
    )
  }
}

export default Chatroom
