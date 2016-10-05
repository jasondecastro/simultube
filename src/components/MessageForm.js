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
      <form className="form-control" onSubmit={this.handleSubmit.bind(this)}>
        <input style={inputStyle} value={this.state.message} onChange={this.updateMessage.bind(this)} type="text" className="form-control" />
      </form>
    )
  }
}

export default MessageForm