import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Balloon from './Balloon'

const messageStyle = {
  maxWidth: '462px',
  overflow: 'hidden',
  height: '60px',
  color: 'black',
  marginTop: '-260px'
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

  currentMessageContent() {
    if (this.props.messages.length > 0) {
      return (
        this.props.messages[this.props.messages.length - 1].attributes.content
      )
    }
  }
  render() {
    const center = {
     width: document.body.clientWidth / 2,
     height: document.body.clientHeight / 2,
   };

   //   box={{ x: center.width - 180, y: center.height - 150, width: 300, height: 105 }}

    return (
      <div style={messageStyle}>
        <Balloon
        box={{ x: 0, y: 0, width: 462, height: 50 }}
        pointer={{ x: center.width , y: center.height }}
        style={{ borderRadius: '5px' }}
        backgroundColor="#ECF0F1"
        className={ 'animated bounceInUp' }
        minWidth={ 250 }
        minHeight={ 105 }
        maxWidth={ 800 }
        maxHeight={ 400 }
        onPointerDragStop={(position) => console.dir(position)}
        onBoxResize={size => console.log(size)}
        onBoxResizeStop={size => console.log(size)}
        disable={true}
        >
          <p style={{ textAlign: 'center', fontSize: '28px' }}>{this.currentMessageContent()}</p>
        </Balloon>

      </div>

    )
  }
}

export default Messages
