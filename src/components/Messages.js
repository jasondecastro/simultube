import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const messageStyle = {
  maxWidth: '640px',
  overflow: 'hidden',
  height: '60px',
  backgroundColor: 'black',
  color: 'white'
}

class Messages extends Component {
  render() {
    return (
      <div className="panel panel-default" style={messageStyle}>
        <div className="panel-body" id="messages">
          { this.props.messages.map((payload, index)=> {
            return <p key={index}><strong>{payload.attributes.sender}:</strong> {payload.attributes.content}</p>
          })}
        </div>
      </div>
    )
  }
}

export default Messages
