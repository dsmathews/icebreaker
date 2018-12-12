import React, { Component } from 'react';
import axios from 'axios';
import ModalEntry from './components/ModalEntry';
import ModalQuiz from './components/ModalQuiz';
import FormOpenQuiz from './components/FormOpenQuiz';
import Navbar from './components/Navbar'

class App extends Component {
  state = {
    loggedIn: false,
    userInfo: {},
    otherUsers: []
  }

  componentDidMount() {
    axios.get('/api/quiz')
      .then(resp =>
        this.setState({
          otherUsers: resp.data
        })
      )
  };

  findUsers = () => {

  }

  toggleLogin = (id) => {
    this.setState({
      loggedIn: !this.state.loggedIn,
      userInfo: id
    })
  }

  render() {
    return (

      <div >
        {!this.state.loggedIn ?
          <div id="loginScreen">
            <ModalEntry toggleLogin={this.toggleLogin} />
          </div> :
          <div id="userPage">
            <Navbar />
            <ModalQuiz userInfo={this.state.userInfo} />
            <div id="otherQuizzes">
              {this.state.otherUsers.map((user) => (
                this.state.userInfo._id === user.quizMaker._id ? null :
                  <FormOpenQuiz
                    userId={this.state.userInfo._id}
                    quizMakerId={user.quizMaker._id}
                    quizId={user._id}
                    username={user.quizMaker.username}
                    title={user.title}
                    questions={user.questions}
                  />
              ))}
            </div>
          </div>}
      </div>
    )
  }
}

export default App;