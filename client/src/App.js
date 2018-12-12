import React, { Component } from 'react';
import axios from 'axios';
import ModalEntry from './components/ModalEntry';
import ModalQuiz from './components/ModalQuiz';
import FormOpenQuiz from './components/FormOpenQuiz';
import FormConnect from './components/FormConnect';
import FormTookYours from './components/FormTookYours';
import Navbar from './components/Navbar'

class App extends Component {
  state = {
    loggedIn: false,
    userInfo: {},
    otherQuizzes: [],
    connections: [],
    quizTakers: []
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
        console.log(resp.data)
        this.setState({
          connections: resp.data
        })
        console.log('Your Results Set!')
      })
  }

  getQuizTakers = () => {
    axios.get(`/api/connection/${this.state.userInfo.quizId}/list`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp => {
        this.setState({
          quizTakers: resp.data
        })
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

  render() {
    return (
      <div >
        {!this.state.loggedIn ?
          <div id="loginScreen">
            <ModalEntry 
              toggleLogin={this.toggleLogin} 
              setYourResults={this.setYourResults}
              setQuizzes={this.setQuizzes}
              getQuizTakers={this.getQuizTakers}
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
                    getQuizTakers={this.getQuizTakers}
                    key={user._id}
                    quizMakerId={user.quizMaker._id}
                    quizId={user._id}
                    username={user.quizMaker.username}
                    title={user.title}
                    questions={user.questions}
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
            <div id="tookYourQuiz">
            <h3>They Took Your Quiz! NOW TALK!</h3>
                {this.state.quizTakers.map((quizTaker) => (
                   <div key={quizTaker._id}>
                   <FormTookYours
                     takername={quizTaker.takerId.username}
                     score={quizTaker.score}
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