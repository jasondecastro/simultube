import React, { Component } from 'react'
import { Link } from 'react-router'

const rooms = {
  margin: '0 auto',
  paddingLeft: '15px',
  paddingTop: '120px'
}

const doorStyle = {
  width: '300px',
  height: '300px',
  marginLeft: '60px'
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

      <div className="row" style={rooms}>

        <div className="col-md-4">
          <center>
            <h2>
              <Link to="/rooms/the_garden">The Garden</Link>
            </h2>
            <p>{this.state.topics[0]}</p>
          </center>
          <img src="http://www.crdoors.net/wp-content/uploads/2015/08/door.png" style={doorStyle}/>
        </div>

        <div className="col-md-4">
          <center>
            <h2>
              <Link to="/rooms/the_pool">The Pool</Link>
            </h2>
            <p>{this.state.topics[1]}</p>
          </center>
          <img src="http://www.crdoors.net/wp-content/uploads/2015/08/door.png" style={doorStyle}/>
        </div>

        <div className="col-md-4">
          <center>
            <h2>
              <Link to="/rooms/the_parlor">The Parlor</Link>
            </h2>
            <p>{this.state.topics[2]}</p>
          </center>
          <img src="http://www.crdoors.net/wp-content/uploads/2015/08/door.png" style={doorStyle}/>
        </div>
      </div>

    )
  }
}

export default Rooms
