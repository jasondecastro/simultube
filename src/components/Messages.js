import React, { Component } from 'react'

const messageStyle = {
  width: '400px',
  overflow: 'scroll',
  height: '300px'
}

class Messages extends Component {
  render() {
    return (
      <div className="panel panel-default" style={messageStyle}>
        <div className="panel-body" id="messages">
          { this.props.messages.map((payload, index)=> {
            return <p key={index}><strong>{payload.sender}:</strong> {payload.content}</p>
          })}
        </div>
      </div>
    )
  }
}

export default Messages
