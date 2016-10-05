import React, { Component } from 'react'

class Stage extends Component {
  render() {
    return (
      <div className="stageStyle">
        {this.props.users.map(user => {
            return <h2>{user.nickname}</h2>
          })}
      </div>
    )
  }
}

export default Stage
