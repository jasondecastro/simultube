import React, { Component } from 'react'
import Character from './Character'

const nameStyle = {
  color: 'white'
}

const screenStyle = {
  width: '545px',
  height: '400px',
  paddingLeft: '60px',
  paddingTop: '5px'
}


class Stage extends Component {
  constructor() {
    super()
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
  

  render() {
    return (
      <div className="stageStyle" tabIndex="0" id="stage" onKeyDown={this.navigate.bind(this)}>
        <div className="usersActive">
          {this.props.users.map(user => {
              return (
                <div>
                  <h2 style={nameStyle}>{user.attributes.nickname}</h2>
                  <Character position={this.state.position} style={this.characterStyle.bind(this)} />
                </div>

              )
            })}
        </div>

         <div className="screenTV" >
            <iframe style={screenStyle} src={"https://youtube.com/embed/" + this.props.videos[3].attributes.content + "?rel=0?version=3&autoplay=1&controls=0"} />
          </div>
      </div>
    )
  }
}

export default Stage
