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
      nickname: sessionStorage.getItem('nickname'),
      session: !!sessionStorage.jwt
    }
  }

  fetchTopics() {
    const url = 'http://localhost:8000/api/v1/topics'

    fetch(url,
      {
        method: 'GET',
        // headers: {
        //   'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
        // }
      }
    )
    .then(response => {
      return response.json()
    })
    .then(responseBody => {
      const topics = responseBody.data.map(data => {
        return data.attributes.topic
      })

      this.setState({
        topics: topics
      })
    })
  }

  initializeUser() {
    const url = 'http://localhost:8000/api/v1/users/'
    fetch(url,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        //no body?
      })
    })
    .then( response => response.json() )
    .then( responseBody => {
      let nickname = responseBody.nickname
      let jwt = responseBody.jwt
      sessionStorage.setItem('jwt', jwt)
      sessionStorage.setItem('nickname', nickname)

      this.setState({
        session: !!sessionStorage.jwt,
        nickname: nickname
      })
    })
  }

  getNicknameFromStorage() {
    return localStorage.getItem('nickname')
  }

  componentWillMount() {
    // if (sessionStorage.getItem('nickname') === null) {
      this.initializeUser()
    // }
    this.fetchTopics()
  }

  changeNicknameValue(event) {
    this.setState({
      nickname: event.target.value
    })
  }

  handleNicknameChange(event) {
    event.preventDefault();
    sessionStorage.setItem('nickname', this.state.nickname)
  }

  render() {
    return (
      <div className="wrapper">
        <form onSubmit={this.handleNicknameChange.bind(this)}>
          <input value={this.state.nickname} onChange={this.changeNicknameValue.bind(this)}></input>
        </form>
        <center><h1>{this.state.nickname}</h1></center>
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
