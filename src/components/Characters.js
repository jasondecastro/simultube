import React, { Component } from 'react'

const characterStyle = {
  width: '70px',
  paddingLeft: '5px',
  height: '70px'
}

const characters = {
  padding: '15px',
  width: '462',
  overflow: 'scroll',
  height: '155px',
  marginTop: '-29px'
}

class Characters extends Component {
  render() {
    return (
      <div style={characters}>
        {this.props.users.map(user => {
          return (
            <img style={characterStyle} src="http://bbsimg.ngfiles.com/1/24095000/ngbbs5006e2369924e.png" />
          )
        })}
      </div>
    )
  }
}

export default Characters
