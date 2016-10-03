import React, { Component } from 'react'
import Messages from './Messages'
import MessageForm from './MessageForm'


const buttonStyle = {
  display: 'none'
}

class Chatroom extends Component {
  render() {
    return (
      <div className="container">
        <div className="row col-md-8 col-md-offset-2">
          <h1>The Garden</h1>
          <Messages />
          <MessageForm />
        </div>
      </div>
    )
  }
}

export default Chatroom
