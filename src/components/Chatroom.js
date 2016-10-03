import React, { Component } from 'react'
import { Link } from 'react-router'

import Messages from './Messages'
import MessageForm from './MessageForm'

const chatroomStyle = {
  paddingLeft: '100px',
  margin: '0 auto'
}

class Chatroom extends Component {
  constructor(props) {
    super(props)
  
    this.name = ''
    switch(props.params.id) {
      case '1':
        this.name = 'The Garden'
        break
      case '2':
        this.name = 'The Pool'
        break
      case '3':
        this.name = 'The Parlor'
        break
      case 'the_garden':
        this.name = 'The Garden'
        break
      case 'the_pool':
        this.name = 'The Pool'
        break
      case 'the_parlor':
        this.name = 'The Parlor'
        break
      default:
        document.location.href = "http://www.urbandictionary.com/define.php?term=dummy"
        break
    }

   this.state = {
      topic: 'banana',
      messages: []
    }
  }

  sendMessage(message) {
    this.setState((state) => ({
      messages: state.messages.concat({
        sender: 'Jason',
        content: message
      })
    }))
    
    fetch('http://localhost:8000/api/v1/messages',
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        message: {
          sender: 'Jason',
          content: message,
          room_id: '1'
        }
      })
    })
  }

  fetchMessages() {
    const url = 'http://localhost:8000/api/v1/rooms/1'

    const messages = fetch(url)
    .then(response => {
      return response.json()
    }).then(responseBody => {
        this.setState({
          messages: responseBody.data.attributes.messages
        })
    })
  }

  componentWillMount() {
    this.fetchMessages()
  }

  render() {
    return (
      <div className="container">
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
