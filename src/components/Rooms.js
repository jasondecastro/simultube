import React, { Component } from 'react'
import { Link } from 'react-router'

const rooms = {
  margin: '0 auto',
  paddingLeft: '100px'
}

class Rooms extends Component {
  constructor() {
    super()
    this.state = {
      topics: []
    }
  }

  fetchTopics() {
    const url = 'http://localhost:8000/api/v1/rooms'

    const topics = fetch(url)
    .then(response => {
      return response.json()
    }).then(responseBody => {
      const topics = responseBody.data.map(data => {
        return data.attributes.topic
      })

      this.setState({
        topics: topics
      })
    })
  }

  componentWillMount() {
    this.fetchTopics()
  }

  render() {
    return (
      <div style={rooms}>
        <h2>
          <Link to="/rooms/1">The Garden</Link>
        </h2>
        <p>{this.state.topics[0]}</p>

        <h2>
          <Link to="/rooms/2">The Pool</Link>
        </h2>
        <p>{this.state.topics[1]}</p>
        <h2>
          <Link to="/rooms/3">The Pool</Link>
        </h2>
        <p>{this.state.topics[2]}</p>
      </div>
    )
  }
}

export default Rooms
