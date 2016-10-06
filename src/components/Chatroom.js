import React, { Component } from 'react'
import { Link } from 'react-router'

import Messages from './Messages'
import MessageForm from './MessageForm'
import Stage from './Stage'

import { connect } from 'react-redux'
import * as actions from '../actions'
import { bindActionCreators } from 'redux'

import Pusher from 'pusher-js'

class Chatroom extends Component {
  constructor(props) {
    super(props)

    this.name = ''
    this.room_id = 0

    switch(props.params.id) {
      case '1':
        this.name = 'The Garden'
        this.room_id = 1
        break
      case '2':
        this.name = 'The Pool'
        this.room_id = 2
        break
      case '3':
        this.name = 'The Parlor'
        this.room_id = 3
        break
      case 'the_garden':
        this.name = 'The Garden'
        this.room_id = 1
        break
      case 'the_pool':
        this.name = 'The Pool'
        this.room_id = 2
        break
      case 'the_parlor':
        this.name = 'The Parlor'
        this.room_id = 3
        break
      default:
        document.location.href = "/undefined.html"
        break
    }

   this.state = {
      users: []
    }
  }

  sendMessage(message) {
    fetch('http://localhost:8000/api/v1/messages',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
      },
      body: JSON.stringify({
        message: {
          sender: sessionStorage.getItem('nickname'),
          content: message,
          room_id: this.room_id
        }
      })
    })
  }

  // subscribeChannel() {
  //   this.pusher = new Pusher('4e452dd8187d9d856234');
  //   this.chatRoom = this.pusher.subscribe(this.name.replace(' ', '_').toLowerCase());
  // }

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
          room_id: this.room_id
        }
      })
    })
  }


  // componentWillUnmount() {
  //   this.pusher.unsubscribe(this.name.replace(' ', '_').toLowerCase());
  // }


  componentWillMount() {
    const room_id = document.location.href.split("/")[document.location.href.split("/").length - 1]

    // this.props.actions.fetchUsers(room_id)

    // this.subscribeChannel()
    this.patchUserRoomId()

    // this.chatRoom.bind('join_event', function(user){
    //   this.setState((state) => ({
    //     users: state.users.concat({
    //        nickname: user.user.nickname
    //     })
    //   }))
    // }, this);

    // this.chatRoom.bind('leave_event', function(user){
    //   this.setState((state) => ({
    //     users: state.users.filter( item => {
    //       return item.nickname !== user.user.nickname
    //     })
    //   }))
    // }, this);
  }


  getRoomId() {
    return document.location.href.split("/")[document.location.href.split("/").length - 1]
  }

  filterMessages(room_id) {
    const messagesForRoom = this.props.messages.filter(el => {
      return el.attributes["room-id"] === parseInt(room_id)
    })
    return messagesForRoom 
  }

  filterUsers(room_id) {
    const usersForRoom = this.props.users.filter(el => {
      return el.attributes["room-id"] === parseInt(room_id)
    })
    return usersForRoom 
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-9">
          <Stage users={this.filterUsers(this.getRoomId())} />
        </div>
        <div className="col-sm-3-offset" className="chatBoxStyle">
          <h1>{this.name.length == 0 ? this.state.name : this.name}</h1>
          <Messages messages={this.filterMessages(this.getRoomId())} />
          <MessageForm sendMessage={this.sendMessage.bind(this)} />
          <h3><Link to="/">Leave</Link></h3>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
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
export default componentCreator(Chatroom)