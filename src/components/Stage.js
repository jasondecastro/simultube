import React, { Component } from 'react'

const nameStyle = {
  color: 'white'
}

class Stage extends Component {
  render() {
    return (
      <div className="stageStyle">
        <div className="usersActive">
          {this.props.users.map(user => {
              return (
                <h2 style={nameStyle}>{user.nickname}</h2>
                
              )
            })}
        </div>
      </div>
    )
  }
}

export default Stage
