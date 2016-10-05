import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Character extends Component {
  render() {
    return (
      <div className="character" style={this.props.style()}>
      </div>
    )
  }
}

export default Character
