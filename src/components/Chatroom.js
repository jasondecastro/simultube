import React, { Component } from 'react'
import { Link } from 'react-router'

import Messages from './Messages'
import MessageForm from './MessageForm'
import Stage from './Stage'

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
      topic: 'banana',
      messages: [],
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

  fetchMessages() {
    const url = 'http://localhost:8000/api/v1/rooms/' + this.room_id

    const messages = fetch(url,
    {
      method: 'GET',
      headers: {
        'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
      }
    })
    .then(response => {
      return response.json()
    }).then(responseBody => {
        this.setState({
          messages: responseBody.data.attributes.messages,
          users: responseBody.data.attributes.users
        })
    })
  }

  subscribeChannel() {
    this.pusher = new Pusher('4e452dd8187d9d856234');
    this.chatRoom = this.pusher.subscribe(this.name.replace(' ', '_').toLowerCase());
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
          room_id: this.room_id
        }
      })
    })
  }

  componentWillMount() {
    this.fetchMessages()
    this.subscribeChannel()
    this.patchUserRoomId()
  }

  componentDidMount() {
    this.chatRoom.bind('message_event', function(message){
        this.setState((state) => ({
          messages: state.messages.concat({
            sender: message.sender,
            content: message.content,
            room_id: this.room_id
          })
        }))
    }, this);
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-9">
          <Stage users={this.state.users} />
        </div>
        <div className="col-sm-3-offset" className="chatBoxStyle">
          <h1>{this.name.length == 0 ? this.state.name : this.name}</h1>
          <Messages messages={this.state.messages} />
          <MessageForm sendMessage={this.sendMessage.bind(this)} />
          <h3><Link to="/">Leave</Link></h3>
        </div>
      </div>
    )
  }
}

export default Chatroom
