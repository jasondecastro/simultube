import React, { Component } from 'react'
import Character from './Character'

import { connect } from 'react-redux'
import * as actions from '../actions'
import { bindActionCreators } from 'redux'

const nameStyle = {
  color: 'white'
}

const screenStyle = {
  width: '640px',
  height: '360px'
}

const titleStyle = {
  color: 'white',
  fontSize: '18px'
}

const noVideo = {
  width: '640px',
  height: '360px'
}


class Stage extends Component {
  constructor() {
    super()

    this.currentVideo = this.currentVideo.bind(this)

    this.state = {
      position: 0
    }
  }

  navigate(e) {
    if (e.keyCode === 37) {
      console.log("moving left")
      this.setState({
        position: this.state.position - 10
      })
    } else if (e.keyCode === 39) {
      console.log("moving right")
      this.setState({
        position: this.state.position + 10
      })
    }
  }

  characterStyle() {
   return {
      width: '50px',
      height: '50px',
      borderRadius: '50px',
      marginLeft: this.state.position + 'px',
      backgroundColor: 'white'
    }
  }

  skipVideo() {
    fetch('https://flowers-endpoint.herokuapp.com/api/v1/messages/' + this.props.videos[0].id,
    {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
        }
    })
}

  currentVideo() {
    if (this.props.videos.length > 0) {
      return (
        <div>
          <h1 style={titleStyle}>{this.props.videos[0].attributes.title}</h1>
          <iframe frameBorder="0" style={screenStyle} src={"https://youtube.com/embed/" + this.props.videos[0].attributes.content + "?rel=0?version=3&autoplay=1&controls=0"} />
          <br />
          <button className="btn" onClick={this.skipVideo.bind(this)} >Next Video</button>
          <br />
          <ul>
              {this.props.videos.map(video => {
                return (
                  <li><a target="_blank" href={"http://youtube.com/watch?v=" + video.attributes.content}>{video.attributes.title}</a></li>
                )
              })}
            </ul>
        </div>
      )
    }
    else {
      return <div>
      <h1 style={titleStyle}>A</h1>

        <div style={screenStyle}>
          <center><h1 style={titleStyle}>No video. Why not add one?</h1></center>
        </div>
      </div>
    }
  }

  render() {
    return (
      <div>
        {this.currentVideo()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

const componentCreator = connect(mapStateToProps, mapDispatchToProps)
export default componentCreator(Stage)
