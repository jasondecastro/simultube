import React, { Component } from 'react'
import { Link } from 'react-router'

const rooms = {
  margin: '0 auto',
  paddingLeft: '100px'
}

class Rooms extends Component {
  render() {
    return (
      <div style={rooms}>
        <h2>
          <Link to="/rooms/the_garden">The Garden</Link>
          <br /><br />
          <Link to="/rooms/the_pool">The Pool</Link>
        </h2>
      </div>
    )
  }
}

export default Rooms
