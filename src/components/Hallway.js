import React, { Component } from 'react'

import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { bindActionCreators } from 'redux'

import Pusher from 'pusher-js'

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
  constructor(props) {
    super(props)

    this.state = {
      nickname: sessionStorage.getItem('nickname'),
      session: !!sessionStorage.jwt
    }
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
    .then( response => response.json() )
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

   patchUserRoomToHallway() {
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
  }

  componentWillMount() {
    if (sessionStorage.getItem('nickname') === null) {
      this.initializeUser()
      .then( () => {
        this.props.actions.fetchMessages()
        this.props.actions.fetchUsers()
      })
      .then( () => {
        this.subscribeChannel()
        this.bindPushEvents()
      })
    } else {
      this.patchUserRoomToHallway()
    }
    this.props.actions.fetchTopics()
  }

  changeNicknameValue(event) {
    this.setState({
      nickname: event.target.value
    })
  }

  handleNicknameChange(event) {
    event.preventDefault();
    this.patchNickname()
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

  subscribeChannel() {
    this.pusher = new Pusher('4e452dd8187d9d856234');
    this.mainSocketChannel = this.pusher.subscribe("flowers");
  }

  bindPushEvents() {
    this.mainSocketChannel.bind('message_event', function(message){
      this.props.actions.newMessage(message.data)
    }, this);

    this.mainSocketChannel.bind('new_user_event', function(user){
      this.props.actions.newUser(user.data)
    }, this);

    this.mainSocketChannel.bind('user_change_event', function(user){
      this.props.actions.changeUser(user.data)
    }, this);
  }

  componentDidMount() {

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
                  <Link style={basicStyle} to="/rooms/1">The Garden</Link>
                </h2>
                <p style={basicStyle}>{this.props.topics[0]}</p>
              </center>
            </div>
            <Link to="/rooms/1"><img src="http://i.imgur.com/uc2UetF.png" style={doorStyle}/></Link>
          </div>

          <div className="col-md-4">
            <div style={textStyle}>
              <center>
                <h2 style={basicStyle}>
                  <Link style={basicStyle} to="/rooms/2">The Pool</Link>
                </h2>
                <p style={basicStyle}>{this.props.topics[1]}</p>
              </center>
            </div>
           <Link to="/rooms/2"><img src="http://i.imgur.com/uc2UetF.png" style={doorStyle}/></Link>
          </div>

          <div className="col-md-4">
            <div style={textStyle}>
              <center>
                <h2 style={basicStyle}>
                  <Link style={basicStyle} to="/rooms/3">The Parlor</Link>
                </h2>
                <p style={basicStyle}>{this.props.topics[2]}</p>
              </center>
            </div>
            <Link to="/rooms/3"><img src="http://i.imgur.com/uc2UetF.png" style={doorStyle}/></Link>
          </div>
        </div>
      </div>

    )
  }
}

function mapStateToProps(state){
  return {
    topics: state.topics,
    messages: state.messages,
    users: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

const componentCreator = connect(mapStateToProps, mapDispatchToProps)
export default componentCreator(Hallway)