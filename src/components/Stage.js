import React, { Component } from 'react'

import { Link } from 'react-router'

import { connect } from 'react-redux'
import * as actions from '../actions'
import { bindActionCreators } from 'redux'

const screenStyle = {
  width: '462px',
  height: '260px'
}

const titleStyle = {
  color: 'black',
  fontSize: '18px'
}

const beTheChangeYouWantToBe = {
  marginLeft: '-300px',
  marginTop: '-292px',
  width: '250px'
}

const panelHeight = {
  height: '410px',
  overflow: 'scroll'
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

          <span style={{maxWidth: '462px', overflow: 'scroll'}}><h1 style={titleStyle}>{this.props.videos[0].attributes.title}</h1></span>
          <iframe frameBorder="0" style={screenStyle} src={"https://youtube.com/embed/" + this.props.videos[0].attributes.content + "?rel=0?version=3&autoplay=1&controls=0&modestbranding=1&autohide=1&showinfo=0"} />
          <div style={beTheChangeYouWantToBe}>

            <div className="panel panel-primary" style={panelHeight}>
              <div className="panel-heading">Video Queue</div>
              <div className="panel-body">
                  {this.props.videos.map((video, index) => {
                    return (
                      <p key={index}><strong>({index + 1})</strong> <a target="_blank" href={"http://youtube.com/watch?v=" + video.attributes.content}>{video.attributes.title}</a></p>
                    )
                  })}
              </div>
            </div>  

             <div className="panel panel-primary">
              <div className="panel-heading">Controls</div>
              <div className="panel-body">
                <button className="btn btn-primary" onClick={this.skipVideo.bind(this)} >Next Video</button>                
                &nbsp;&nbsp;<Link to="/"><button className="btn btn-danger">Leave</button></Link>
              </div>
            </div>             
          </div>
        </div>
      )
    }
    else {
      return (
         <div>
          <h1 style={titleStyle}>No video. Why not add one?</h1>
          <iframe frameBorder="0" style={screenStyle}/>
          <div style={beTheChangeYouWantToBe}>

            <div className="panel panel-primary" style={panelHeight}>
              <div className="panel-heading">Video Queue</div>
              <div className="panel-body">
                  
              </div>
            </div>  

             <div className="panel panel-primary">
              <div className="panel-heading">Controls</div>
              <div className="panel-body">
                <button className="btn btn-primary" disabled>Next Video</button>                
                &nbsp;&nbsp;<Link to="/"><button className="btn btn-danger">Leave</button></Link>
              </div>
            </div>             
          </div>
        </div>
      )
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
