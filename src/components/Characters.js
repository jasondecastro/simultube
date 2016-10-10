import React, { Component } from 'react'

const characterStyle = {
  width: '70px',
  height: '70px'
}

const characters = {
  padding: '15px',
  width: '462',
  overflowY: 'scroll',
  height: '86px'
}

class Characters extends Component {
  render() {
    return (
      <div style={characters}>
        {this.props.users.map(user => {
          return (
            <img style={characterStyle} src="http://66.media.tumblr.com/9c2e91c675901c919ffc544a4e387823/tumblr_noejg9qNbW1sigvjco1_400.png" />
          )
        })}
      </div>
    )
  }
}

export default Characters
