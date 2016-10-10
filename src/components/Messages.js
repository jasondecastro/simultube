import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const messageStyle = {
  maxWidth: '462px',
  overflow: 'hidden',
  height: '60px',
  color: 'black',
  marginTop: '-250px'
}

class Messages extends Component {
  constructor() {
    super()

    this.currentMessage = this.currentMessage.bind(this)
  }

  currentMessage() {
    if (this.props.messages.length > 0) {
      return (
        <p><strong>{this.props.messages[this.props.messages.length - 1].attributes.sender}:</strong> {this.props.messages[this.props.messages.length - 1].attributes.content}</p>
      )
    }
  }
  render() {
    return (
      <div className="panel panel-default" style={messageStyle}>
        <div className="panel-body" id="messages">
          {this.currentMessage()}
        </div>
      </div>
    )
  }
}

export default Messages
