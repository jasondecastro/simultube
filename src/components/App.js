import React, { Component } from 'react'
import '../static/bootstrap.min.css'

const buttonStyle = {
  display: 'none'
}

class App extends Component {
  render() {
    return (
      <div className="App">
           <div className="container">
              <div className="row col-md-8 col-md-offset-2">
                <h1>rails</h1>

                <div className="panel panel-default">
                    <div className="panel-body" id="messages">
                      <p><strong>jason:</strong> hey</p>
                    </div>
                </div>


                  <form>
                    <textarea className="form-control" />
                    <input value="1" type="hidden" name="message[chatroom_id]" id="message_chatroom_id" />
                  </form>
                </div>
            </div>
      </div>
    )
  }
}

export default App
