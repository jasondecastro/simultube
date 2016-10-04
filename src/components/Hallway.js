import React, { Component } from 'react'
import { Link } from 'react-router'

const rooms = {
  margin: '0 auto',
  paddingLeft: '15px',
  paddingTop: '100px'
}

const doorStyle = {
  width: '300px',
  height: '300px',
  marginLeft: '60px'
}

const basicStyle = {
  color: 'white'
}

class Hallway extends Component {
  constructor() {
    super()
    this.state = {
      topics: [],
      nickname: ''
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

  setNickname() {
    const url = 'https://randomuser.me/api/'

    const nickname = fetch(url)
    .then(response => {
      return response.json()
    }).then(responseBody => {
      this.setState({
        nickname: responseBody.results[0].login.username
      })

      localStorage.setItem('nickname', this.state.nickname)
    })
  }

  getNicknameFromStorage() {
    return localStorage.getItem('nickname')
  }

  componentWillMount() {
    this.fetchTopics()
    this.setNickname()
  }

  render() {
    return (
      <div className="wrapper">
        <center><h1>{this.getNicknameFromStorage()}</h1></center>
        <div className="row" style={rooms}>

          <div className="col-md-4">
            <center>
              <h2 style={basicStyle}>
                <Link style={basicStyle} to="/rooms/the_garden">The Garden</Link>
              </h2>
              <p style={basicStyle}>{this.state.topics[0]}</p>
            </center>
            <Link to="/rooms/1"><img src="http://www.crdoors.net/wp-content/uploads/2015/08/door.png" style={doorStyle}/></Link>
          </div>

          <div className="col-md-4">
            <center>
              <h2 style={basicStyle}>
                <Link style={basicStyle} to="/rooms/the_pool">The Pool</Link>
              </h2>
              <p style={basicStyle}>{this.state.topics[1]}</p>
            </center>
           <Link to="/rooms/1"><img src="http://www.crdoors.net/wp-content/uploads/2015/08/door.png" style={doorStyle}/></Link>
          </div>

          <div className="col-md-4">
            <center>
              <h2 style={basicStyle}>
                <Link style={basicStyle} to="/rooms/the_parlor">The Parlor</Link>
              </h2>
              <p style={basicStyle}>{this.state.topics[2]}</p>
            </center>
            <Link to="/rooms/1"><img src="http://www.crdoors.net/wp-content/uploads/2015/08/door.png" style={doorStyle}/></Link>
          </div>
        </div>
      </div>

    )
  }
}

export default Hallway
