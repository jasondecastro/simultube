import React, { Component } from 'react'
import { Link } from 'react-router'

const rooms = {
  paddingLeft: '25px',
  position: 'absolute',
  marginLeft: '70px',
  bottom: '0'
}

const formStyle = {
  marginTop: '45px',
  marginLeft: '80px'
}

const doorStyle = {
  width: '300px',
  height: '300px',
  marginLeft: '60px'
}

const basicStyle = {
  color: 'black'
}

const inputStyle = {
  width: '250px',
  height: '50px',
  fontSize: '24px'
}

const textStyle = {
  marginLeft: '56px'
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

    fetch(url)
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
    return fetch(url,
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
    .then( response => {
      return response.json()
    })
    .then( responseBody => {
      let nickname = responseBody.nickname
      let jwt = responseBody.jwt
      let id = responseBody.id
      let room_id = responseBody.room_id
      sessionStorage.setItem('jwt', jwt)
      sessionStorage.setItem('nickname', nickname)
      sessionStorage.setItem('id', id)
      sessionStorage.setItem('room_id', room_id)
      this.setState({
        session: !!sessionStorage.jwt,
        nickname: nickname
      })
    })
  }

  getNicknameFromStorage() {
    return sessionStorage.getItem('nickname')
  }

  patchUserRoomId() {
    const url = 'http://localhost:8000/api/v1/users/' + sessionStorage.getItem('id')
    fetch(url,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
      },
      method: 'PATCH',
      body: JSON.stringify({
        user: {
          id: sessionStorage.getItem('id'),
          room_id: 4
        }
      })
    })
    .then( response => response.json() )
    .then( responseBody => {
      sessionStorage.setItem('room_id', 4)
    })
  }

  componentWillMount() {
    if (sessionStorage.getItem('nickname') === null) {
      this.initializeUser()
    } else {
      this.patchUserRoomId()
    }
    this.fetchTopics()
  }

  changeNicknameValue(event) {
    this.setState({
      nickname: event.target.value
    })
  }

  handleNicknameChange(event) {
    event.preventDefault();
    this.patchNickname()
    //sessionStorage.setItem('nickname', this.state.nickname)
  }

  patchNickname() {
    const url = 'http://localhost:8000/api/v1/users/' + sessionStorage.getItem('id')

    fetch(url,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
      },
      method: 'PATCH',
      body: JSON.stringify({
        user: {
          id: sessionStorage.getItem('id'),
          nickname: this.state.nickname
        }
      })
    })
    .then( response => response.json() )
    .then( responseBody => {

      const newNickname = responseBody.data.attributes.nickname

      sessionStorage.setItem('nickname', newNickname)
    })
  }

  render() {
    return (
      <div className="wrapper">
      <center>
          <form style={formStyle} onSubmit={this.handleNicknameChange.bind(this)}>
            <input className="form-control" style={inputStyle} value={this.state.nickname} onChange={this.changeNicknameValue.bind(this)}></input>
          </form>
        </center>
        <div className="row" style={rooms}>

          <div className="col-md-4">
            <div style={textStyle}>
              <center>
                <h2 style={basicStyle}>
                  <Link style={basicStyle} to="/rooms/the_garden">The Garden</Link>
                </h2>
                <p style={basicStyle}>{this.state.topics[0]}</p>
              </center>
            </div>
            <Link to="/rooms/1"><img src="http://i.imgur.com/uc2UetF.png" style={doorStyle}/></Link>
          </div>

          <div className="col-md-4">
            <div style={textStyle}>
              <center>
                <h2 style={basicStyle}>
                  <Link style={basicStyle} to="/rooms/the_pool">The Pool</Link>
                </h2>
                <p style={basicStyle}>{this.state.topics[1]}</p>
              </center>
            </div>
           <Link to="/rooms/2"><img src="http://i.imgur.com/uc2UetF.png" style={doorStyle}/></Link>
          </div>

          <div className="col-md-4">
            <div style={textStyle}>
              <center>
                <h2 style={basicStyle}>
                  <Link style={basicStyle} to="/rooms/the_parlor">The Parlor</Link>
                </h2>
                <p style={basicStyle}>{this.state.topics[2]}</p>
              </center>
            </div>
            <Link to="/rooms/3"><img src="http://i.imgur.com/uc2UetF.png" style={doorStyle}/></Link>
          </div>
        </div>
      </div>

    )
  }
}

export default Hallway
