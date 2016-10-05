import React, { Component } from 'react'

const inputStyle = {
  maxWidth: '300px'
}

class MessageForm extends Component {
  constructor() {
    super()
    this.state = {
      message: ''
    }
  }

  updateMessage(e) {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    this.setState({
      message: ''
    })
    
    this.props.sendMessage(this.state.message)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <input style={inputStyle} value={this.state.message} onChange={this.updateMessage.bind(this)} type="text" className="form-control" />
        </div>
      </form>
    )
  }
}

export default MessageForm