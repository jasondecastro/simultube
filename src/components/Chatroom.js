import React, { Component } from 'react'
import { Link } from 'react-router'

import Messages from './Messages'
import MessageForm from './MessageForm'
import Stage from './Stage'

import Pusher from 'pusher-js'

const chatroomStyle = {
  paddingLeft: '705px',
  paddingTop: '45px',
  marginTop: '-600px',
  float: 'left'
}

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
      messages: []
    }
  }

  sendMessage(message) {
    fetch('http://localhost:8000/api/v1/messages',
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        message: {
          sender: localStorage.getItem('nickname'),
          content: message,
          room_id: this.room_id
        }
      })
    })
  }

  fetchMessages() {
    const url = 'http://localhost:8000/api/v1/rooms/' + this.room_id

    const messages = fetch(url)
    .then(response => {
      return response.json()
    }).then(responseBody => {
        this.setState({
          messages: responseBody.data.attributes.messages
        })
    })
  }

  doWebSocketyStuff() {
    this.pusher = new Pusher('4e452dd8187d9d856234');
    this.chatRoom = this.pusher.subscribe(this.name.replace(' ', '_').toLowerCase());
  }

  componentWillMount() {
    this.fetchMessages()
    this.doWebSocketyStuff()
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
      <div>
        <Stage />
        <div className="row col-md-8 col-md-offset-2" style={chatroomStyle}>
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
