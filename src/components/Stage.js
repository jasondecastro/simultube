import React, { Component } from 'react'
import Character from './Character'

import { connect } from 'react-redux'
import * as actions from '../actions'
import { bindActionCreators } from 'redux'

const nameStyle = {
  color: 'white'
}

      // <div className="usersActive">
      //     {this.props.users.map(user => {
      //         return (
      //           <div>
      //             <h2 style={nameStyle}>{user.attributes.nickname}</h2>
      //             <Character position={this.state.position} style={this.characterStyle.bind(this)} />
      //           </div>

      //         )
      //       })}
      //   </div>

const screenStyle = {
  width: '545px',
  height: '400px',
  paddingLeft: '60px',
  paddingTop: '5px'
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

  componentDidMount() {
    document.getElementById('stage').focus()
  }

  skipVideo() {
    fetch('http://localhost:8000/api/v1/messages/' + this.props.videos[0].id,
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
      return <iframe style={screenStyle} src={"https://youtube.com/embed/" + this.props.videos[0].attributes.content + "?rel=0?version=3&autoplay=1&controls=0"} />
    }
    else {
      return <div>NO VIDEO!!!!</div>
    }
  }
  //  <iframe style={screenStyle} src={"https://youtube.com/embed/" + this.props.videos[0].attributes.content + "?rel=0?version=3&autoplay=1&controls=0"} />

  render() {
    return (
      <div className="stageStyle" tabIndex="0" id="stage" onKeyDown={this.navigate.bind(this)}>

         <div className="screenTV" >
            <button className="btn" onClick={this.skipVideo.bind(this)}>Skip video</button>
            <div>
              {this.currentVideo()}
            </div>
            <ul>
              {this.props.videos.map(video => {
                return (
                  <li>{video.attributes.content}</li>
                )
              })}
            </ul>
          </div>
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
