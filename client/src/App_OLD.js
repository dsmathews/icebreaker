import React, { Component } from 'react';
import axios from 'axios';
import ModalEntry from './components/ModalEntry';
import ModalQuiz from './components/ModalQuiz';
import FormOpenQuiz from './components/FormOpenQuiz'
import FormConnect from './components/FormConnect'
class App extends Component {
  state = {
    loggedIn: false,
    userInfo: {},
    otherQuizzes: [],
    connections: []
  }

  componentDidMount() {
    axios.get('/api/quiz')
      .then(resp =>
        this.setState({
          otherQuizzes: resp.data
        })
      )
    axios.get('/api/connection')
      .then(resp => {
        this.setState({
          connections: resp.data
        })
      })
  };

  toggleLogin = (id) => {
    this.setState({
      loggedIn: !this.state.loggedIn,
      userInfo: id
    })
  }

  updateConnections = (newConnection) => {
    this.setState({
      connections: this.state.connections.concat(newConnection)
    });
  }

  checkForTaken = () => {
    const connection = this.state.connections;
    let count = 0;
    for (let i = 0; i < connection.length; i++) {
      if (localStorage.getItem('userId') === connection.takerId._id) {
        return
      }
    }
  }

  render() {
    return (
      <div >
        {!this.state.loggedIn ?
          <div id="loginScreen">
            <ModalEntry toggleLogin={this.toggleLogin} />
          </div> :
          <div id="userPage">
            <ModalQuiz userInfo={this.state.userInfo} />
            <div id="otherQuizzes">
              {this.state.otherQuizzes.map((user) => (
                this.state.userInfo._id === user.quizMaker._id ? null :
                  this.state.connections.map((connection) => (
                    <FormOpenQuiz
                      key={user._id}
                      takerId={connection.takerId._id}
                      score={connection.score}
                      quizMakerId={user.quizMaker._id}
                      quizId={user._id}
                      username={user.quizMaker.username}
                      title={user.title}
                      questions={user.questions}
                      updateConnections={this.updateConnections}
                      connections={this.state.connections}
                    />
                  ))

              ))}
            </div>
            <div id="otherQuizzes">
              {this.state.connections.map((connection) => (
                !this.state.userInfo._id === connection.takerId ? null :
                  <div key={connection._id}>
                    <FormConnect
                      makername={connection.makerId.username}
                      quizname={connection.quizId.title}
                      score={connection.score}
                    />
                  </div>
              ))}
            </div>
          </div>}
      </div>
    )
  }
}

export default App;