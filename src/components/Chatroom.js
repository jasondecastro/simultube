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

  messageIsYoutube(messageContent) {
    if (messageContent.match(/youtube.+v=([\w-]{11})/)) {
      return true
    } else {
      return false
    }
  }

  fetchTitle(content) {
    return fetch('https://www.googleapis.com/youtube/v3/videos?id='+ content +'&key=AIzaSyDilV5jMmHLNjPkstZhxIQkpfTwiRpK1Lo&fields=items(snippet(title))&part=snippet').then(response => {
      return response.json()
    }).then(responseBody => {
      return responseBody.items[0].snippet.title
    })
  }

  sendMessage(message) {
    let type;
    let content;
    let title;

    if (this.messageIsYoutube(message)) {
      type = "Video"
      content = message.match(/youtube.+v=([\w-]{11})/).slice(-1)[0] //just the 11 character youtube identifier
      title = this.fetchTitle(content)
      title.then( (title) => {
        this.postMessage(type, content, title)
      })
    } else {
      type = "Text"
      content = message //the original message
      this.postMessage(type, content)
    }
  }

  postMessage(type, content, title) {
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
          content: content,
          type: type,
          title: title,
          room_id: this.room_id
        }
      })
    })
  }

  patchUserRoomId() {
    const url = 'http://localhost:8000/api/v1/users/' + sessionStorage.getItem('id')
    fetch(url,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AUTHORIZATION': `Berarer ${sessionStorage.jwt}`
      },
      method: 'PATCH',
      body: JSON.stringify({
        user: {
          id: sessionStorage.getItem('id'),
          room_id: this.room_id
        }
      })
    })
    .then( response => response.json() )
    .then( responseBody => {
      sessionStorage.setItem('room_id', this.room_id)
    })
  }

  componentWillMount() {
    const room_id = document.location.href.split("/")[document.location.href.split("/").length - 1]
    this.patchUserRoomId()
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

  filterVideos(room_id) {
    const videosForRoom = this.props.videos.filter(el => {
      return el.attributes["room-id"] === parseInt(room_id)
    })

    return videosForRoom
  }

  render() {
    return (
      <div>
          <Stage videos={this.filterVideos(this.getRoomId())} users={this.filterUsers(this.getRoomId())} />
          <Messages messages={this.filterMessages(this.getRoomId())} />
          <MessageForm sendMessage={this.sendMessage.bind(this)} />
          <h3><Link to="/">Leave</Link></h3>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
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
export default componentCreator(Chatroom)
