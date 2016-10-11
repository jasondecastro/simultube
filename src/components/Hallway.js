import React, { Component } from 'react'

import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { bindActionCreators } from 'redux'

import Pusher from 'pusher-js'

const tryHarder = {
  paddingLeft: '450px',
  margin: '0 auto',
  paddingTop: '100px'
}

const tableStyle = {
  width: '500px'
}

const btnStyle = {
  paddingTop: '0px',
  height: '20px'
}

const headerStyle = {
  fontSize: '72px'
}

const formStyle = {
  width: '220px'
}

class Hallway extends Component {
  constructor(props) {
    super(props)

    this.getUsersInRoomCount = this.getUsersInRoomCount.bind(this)

    this.state = {
      nickname: sessionStorage.getItem('nickname'),
      session: !!sessionStorage.jwt
    }
  }

  initializeUser() {
    const url = 'https://flowers-endpoint.herokuapp.com/api/v1/users/'
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

   patchUserRoomToHallway() {
    const url = 'https://flowers-endpoint.herokuapp.com/api/v1/users/' + sessionStorage.getItem('id')
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
    if (!sessionStorage.nickname) {
      this.initializeUser()
      .then( () => {
        this.props.actions.fetchUsers()
        this.props.actions.fetchVideos()
      })
      .then( () => {
        this.subscribeChannel()
        this.bindPushEvents()
      })
    } else {
      this.patchUserRoomToHallway()
    }
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
    const url = 'https://flowers-endpoint.herokuapp.com/api/v1/users/' + sessionStorage.getItem('id')

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

      if (message.data.type === "texts") {
        this.props.actions.newMessage(message.data)
      }

      if (message.data.type === "videos") {
        this.props.actions.newVideo(message.data)
      }

    }, this);

    this.mainSocketChannel.bind('new_user_event', function(user){
      this.props.actions.newUser(user.data)
    }, this);

    this.mainSocketChannel.bind('user_change_event', function(user){
      this.props.actions.changeUser(user.data)
    }, this);

    this.mainSocketChannel.bind('user_destroy_event', function(userToDelete){
      this.props.actions.destroyUser(userToDelete.id)
    }, this);

    this.mainSocketChannel.bind('remove_video', function(videoToDelete){
      this.props.actions.removeCurrentVideo(videoToDelete.id)
    }, this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", (ev) =>
    {
      ev.preventDefault()
      fetch('https://flowers-endpoint.herokuapp.com/api/v1/users/' + sessionStorage.getItem('id'),
      {
        method: 'DELETE'
      })
    })
  }

  getUsersInRoomCount(room_id) {
    const usersForRoom = this.props.users.filter(el => {
      return el.attributes["room-id"] === parseInt(room_id, 10)
    })
    
    return usersForRoom.length
  }

  getCurrentVideoTitle(room_id) {
    const videosForRoom = this.props.videos.filter(el => {
      return el.attributes["room-id"] === parseInt(room_id, 10)
    })

    if (videosForRoom.length > 0) {
      return videosForRoom[0].attributes.title
    } else {
      return "There are currently no videos."
    }
  }

  render() {
    return (
      <div style={tryHarder}>
        <h1 style={headerStyle}>Simultube</h1>
        <table className="table table-hover" style={tableStyle}>
          <thead>
            <tr>
              <th>#</th>
              <th>Current Video</th>
              <th>Online Users</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{this.getCurrentVideoTitle(1)}</td>
              <td><strong>{this.getUsersInRoomCount(1) + "/6"}</strong></td>
              <td><Link to="/rooms/1"><button style={btnStyle} className="btn btn-primary btn-sm">Enter</button></Link></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>{this.getCurrentVideoTitle(2)}</td>
              <td><strong>{this.getUsersInRoomCount(2) + "/6"}</strong></td>
              <td><Link to="/rooms/2"><button style={btnStyle} className="btn btn-primary btn-sm">Enter</button></Link></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>{this.getCurrentVideoTitle(3)}</td>
              <td><strong>{this.getUsersInRoomCount(3) + "/6"}</strong></td>
              <td><Link to="/rooms/3"><button style={btnStyle} className="btn btn-primary btn-sm">Enter</button></Link></td>
            </tr>
          </tbody>
        </table>
        <br />
        <form className="form-inline" style={formStyle} onSubmit={this.handleNicknameChange.bind(this)}>
          <div className="form-group">
            <label><h4>Your nickname is currently</h4></label>
            <div className="input-group">
                <input value={this.state.nickname} onChange={this.changeNicknameValue.bind(this)} type="text" className="form-control" placeholder="Change nickname..." />
                <span className="input-group-btn">
                  <button className="btn btn-primary" type="button">Change</button>
                </span>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    topics: state.topics,
    messages: state.messages,
    users: state.users,
    videos: state.videos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

const componentCreator = connect(mapStateToProps, mapDispatchToProps)
export default componentCreator(Hallway)
