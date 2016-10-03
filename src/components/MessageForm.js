import React, { Component } from 'react'

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
        <input value={this.state.message} onChange={this.updateMessage.bind(this)} type="text" className="form-control" />
      </form>
    )
  }
}

export default MessageForm