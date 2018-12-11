import React, { Component } from 'react';
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


  render() {

    let view = '';

    if (this.state.currentView === "ChatMessage") {
      view = <ChatMessage changeView={this.changeView} />
    } else if (this.state.currentView === "signup") {
      view = <Signup onSubmit={this.createUser} />
    } else if (this.state.currentView === "chatApp") {
      view = <ChatApp currentId={this.state.currentId} />
    }

    return (

      <div className="animated fadeIn">
        {!this.state.loggedIn ?
          <div id="loginScreen">
            <ModalEntry toggleLogin={this.toggleLogin} />
          </div> :
          <div id="userPage">
          <Navbar />
            <ModalQuiz userInfo={this.state.userInfo}/>
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
              <div className="App">
                {view}
              </div>
            </div>
          </div>}
      </div>
    )
  }
}

export default App;