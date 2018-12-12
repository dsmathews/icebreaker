import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import ModalEntry from './components/ModalEntry';
import ModalQuiz from './components/ModalQuiz';
import FormOpenQuiz from './components/FormOpenQuiz'
//All below imports are required for Pusher chat.
import ChatMessage from './components/ChatApp/ChatMessage';
import Signup from './components/ChatApp/Signup';
import ChatApp from './components/ChatApp/ChatApp';
import { default as Chatkit } from '@pusher/chatkit-server';
// import FormOpenQuiz from './components/FormOpenQuiz';
import FormConnect from './components/FormConnect';
import FormTookYours from './components/FormTookYours';
import Navbar from './components/Navbar'

//Initializes chat.
const chatkit = new Chatkit({
  instanceLocator: "v1:us1:bad848ac-b37b-454a-adf0-385bbf3be71a",
  key: "005ed346-fba1-4e3e-b588-3449e0c4a68f:5cHTYoI8rxc1JPVqwx9D61cXdTzJbVucwKB48cMaPUw=",
})

class App extends Component {
  state = {
    loggedIn: false,
    userInfo: {},
    otherUsers: [],
    chatOpen: false,
    otherQuizzes: [],
    connections: [],
    quizTakers: []
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUsername: '',
      currentId: '',
      currentView: 'signup'
    }
    this.changeView = this.changeView.bind(this);
    this.createUser = this.createUser.bind(this);
  };

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
        console.log('SET QUIZZES', resp)
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

  // startUp = () => {
  //   if (localStorage.getItem('userId')) {
  //     this.setUserInfo();
  //     this.setQuizzes();
  //     this.setYourResults();
  //     this.getQuizTakers();
  //     this.setState({
  //       loggedIn: true
  //     })
  //   }
  // }

  // componentDidMount() {
  //   this.startUp();
  // };

  
  //Create's user in chat. (Work with Pamela with integrating this into the login screen.)
  createUser(username) {
    chatkit.createUser({
      id: username,
      name: username,
    })
    .then((currentUser) => {
      this.setState({
        currentUsername: username,
        currentId: username,
        currentView: 'chatApp'
      })
    }).catch((err) => {
      if (err.status === 400) {
        this.setState({
          currentUsername: username,
          currentId: username,
          currentView: 'chatApp'
        })
      } else {
        console.log(err.status);
      }
    });
  };
  
  //Changes what you see when clicking on the chat screen. (From signup to chat.)
  changeView(view) {
    this.setState({
      currentView: view
    })
  }
  
  toggleChat = () => {
    this.setState({
      chatOpen: !this.state.chatOpen
    })
  }
  
  // componentDidMount() {
  //   axios.get('/api/quiz')
  //     .then(resp =>
  //       this.setState({
  //         otherUsers: resp.data
  //       })
  //     )
  // };

  toggleLogin = (id) => {
    this.setState({
      loggedIn: !this.state.loggedIn,
      userInfo: id
    }, function () {
      this.createUser(this.state.userInfo.email);
    })
  }
  
  renderChat() {
    if (this.state.currentView === "ChatMessage") {
      return <ChatMessage changeView={this.changeView} />
    } else if (this.state.currentView === "signup") {
      return <Signup onSubmit={this.createUser} />
    } else if (this.state.currentView === "chatApp") {
      return <ChatApp currentId={this.state.currentId} />
    }
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
            <div className="App">
              {this.state.chatOpen && this.renderChat()}
              <button className="chat-button" onClick={this.toggleChat}>Chat</button>
            </div>
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