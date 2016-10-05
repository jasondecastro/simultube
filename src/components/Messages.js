import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const messageStyle = {
  maxWidth: '300px',
  overflow: 'scroll',
  height: '300px'
}

class Messages extends Component {
  componentDidUpdate() {
    var node = ReactDOM.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }

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
