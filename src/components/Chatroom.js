import React, { Component } from 'react'
import { Link } from 'react-router'

import Messages from './Messages'
import MessageForm from './MessageForm'

const chatroomStyle = {
  paddingLeft: '100px'
}

class Chatroom extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      topic: props.params.id,
      messages: []
    }
  }

  sendMessage(message) {
    this.setState((state) => ({
      messages: state.messages.concat({
        username: 'jason',
        content: message
      })
    }))
  }

  render() {
    return (
      <div className="container">
        <div className="row col-md-8 col-md-offset-2" style={chatroomStyle}>
          <h1>{this.state.topic}</h1>
          <Messages messages={this.state.messages} />
          <MessageForm sendMessage={this.sendMessage.bind(this)} />
          <h3><Link to="/">Leave {this.state.topic}</Link></h3>
        </div>
      </div>
    )
  }
}

export default Chatroom
