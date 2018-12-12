import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
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

  setUserInfo = () => {
    axios.get(`/api/user/${localStorage.getItem('userId')}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp => {
        this.setState({
        userInfo: resp.data
        })
      })
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

  startUp = () => {
    if (localStorage.getItem('userId')) {
      this.setUserInfo();
      this.setQuizzes();
      this.setYourResults();
      this.getQuizTakers();
      this.setState({
        loggedIn: true
      })
    }
  }

  componentDidMount() {
    // this.startUp();
  };

  toggleLogin = (id) => {
    this.setState({
      loggedIn: !this.state.loggedIn,
      userInfo: id
    })
  }

  render() {
    return (
      <Container >
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
          <Row>
            <Col>
            <Navbar />
            </Col>
          </Row>
            <Row>
            <ModalQuiz userInfo={this.state.userInfo} />
            <Col id="otherQuizzes">
            <Row>
              <Col>
              <h3>Quizzes To Take</h3>
              </Col>
            </Row>
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
            </Col>
            <Col id="resultsForYou">
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
            </Col>
            </Row>
            <Row>
            <Col id="tookYourQuiz">
            <h3>They Took Your Quiz! NOW TALK!</h3>
                {this.state.quizTakers.map((quizTaker) => (
                   <div key={quizTaker._id}>
                   <FormTookYours
                     takername={quizTaker.takerId.username}
                     score={quizTaker.score}
                   />
                 </div>
                ))} 
            </Col>
            </Row>
          </div>}
          <Row>
					<Col>
				<footer className="footer">
					<div className="container-footer">
						<span><b className="footer-text"> IceBreakers &copy; 2018</b></span>
					</div>
				</footer>
				</Col>
				</Row>
      </Container>
    )
  }
}

export default App;