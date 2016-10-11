import React, { Component } from 'react'
import Balloon from './Balloon'

const bubbleStyle = {
  maxWidth: '462px',
  overflow: 'hidden',
  height: '60px',
  color: 'black',
  marginTop: '-260px'
}

const textStyle = {
  textAlign: 'center'
}

class Messages extends Component {
  constructor() {
    super()
    this.bubbleMap = this.bubbleMap.bind(this)
  }

  determineUserIndex(message) {
    return this.props.users.findIndex( user => message.attributes.sender === user.attributes.nickname )
  }

  determinePointerXCoordinate(userIndex) {
    return ((462/6)*(userIndex+1)) - (462/6/2)
  }

  bubbleColorMap(index) {
    const colors = {
      0: "#848482",
      1: "#BFC1C2",
      2: "#E5E4E2"
    }

    return colors[index]
  }

  bubbleMap() {
    let messages = this.props.messages.slice(-3)

    if (messages.length === 1) {
      messages.unshift(undefined, undefined)
    }

    if (messages.length === 2) {
      messages.unshift(undefined)
    }

    return messages.map( (message, index) => {
      if (message) {
        let userIndex = this.determineUserIndex(message)
        let pointerX;
        let pointerY;

        if (userIndex === -1) {
          pointerX = 200
          pointerY = index*35
        } else {
          pointerX = this.determinePointerXCoordinate(userIndex);
          pointerY = 125
        }

        let color = this.bubbleColorMap(index)

        return (
          <Balloon
          box={{ x: 0, y: 0 + index*35, width: 462, height: 30 }}
          pointer={{ x: pointerX, y: pointerY }}
          style={{ borderRadius: '20px' }}
          backgroundColor={color}
          disable={true}
          >
            <p style={textStyle}>{message.attributes.content}</p>
          </Balloon>
      )
      } else {
        return ''
      }
    })
  }

  render() {
    return (
      <div style={bubbleStyle}>
        {this.bubbleMap()}
      </div>
    )
  }
}

export default Messages
