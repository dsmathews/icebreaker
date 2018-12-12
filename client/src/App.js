import React, { Component } from 'react';
import axios from 'axios';
import ModalEntry from './components/ModalEntry';
import ModalQuiz from './components/ModalQuiz';
import FormOpenQuiz from './components/FormOpenQuiz'
import FormConnect from './components/FormConnect'
import Navbar from './components/Navbar'

class App extends Component {
  state = {
    loggedIn: false,
    userInfo: {},
    otherQuizzes: [],
    connections: [],
  }

  setQuizzes = () => {
    axios.get('/api/quiz', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp => {
        this.setState({
          otherQuizzes: resp.data
        })
        console.log('Your Quizes Set!')
      })
  }

  setYourResults = () => {
    axios.get(`/api/user/${localStorage.getItem('userId')}/quizzesTaken`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp => {
        this.setState({
          connections: resp.data
        })
        console.log('Your Results Set!')
      })
  }

  getQuizTakers = () => {
    axios.get(`/api/quiz/${this.state.userInfo.quizId}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp => {
        console.log(resp)
      })
  }

  componentDidMount() {
    this.setQuizzes();
    this.setYourResults();
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

  render() {
    return (
      <div >
        {!this.state.loggedIn ?
          <div id="loginScreen">
            <ModalEntry 
              toggleLogin={this.toggleLogin} 
              setYourResults={this.setYourResults}
              setQuizzes={this.setQuizzes}
            />
          </div> :
          <div id="userPage">
          <Navbar />
            <ModalQuiz userInfo={this.state.userInfo}/>
            <div id="otherQuizzes">
            <h3>Quizzes To Take</h3>
              {this.state.otherQuizzes.map((user) => (
                this.state.userInfo._id === user.quizMaker._id ? null :
                  <FormOpenQuiz
                    setYourResults={this.setYourResults}
                    setQuizzes={this.setQuizzes}
                    key={user._id}
                    quizMakerId={user.quizMaker._id}
                    quizId={user._id}
                    username={user.quizMaker.username}
                    title={user.title}
                    questions={user.questions}
                    updateConnections={this.updateConnections}
                    connections={this.state.connections}
                  />
              ))}
            </div>
            <div id="resultsForYou">
            <h3>Your Scores! Let's Connect</h3>
              {this.state.connections.map((connection) => (
                !this.state.userInfo._id === connection.takerId._id ? null :
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