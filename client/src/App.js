import React, { Component } from 'react';
import axios from 'axios';
import ModalEntry from './components/ModalEntry';
import ModalQuiz from './components/ModalQuiz';
import FormOpenQuiz from './components/FormOpenQuiz'

const testArray = [
  {
    _id: 'abcde',
    username: 'Albion',
    quiz: {
      _id: "12345abc",
      title: 'Test Quiz 11111',
      questions: [
        "Does 1 + 1 = 2?",
        "Does 2 + 2 = 4?",
        "Does 3 + 3 = 6?",
        "Does 4 + 4 = 8?",
        "Does 5 + 5 = 10?"
      ]
    }
  },
  {
    _id: 'bcdef',
    username: 'Bellatrix',
    quiz: {
      _id: '23456def',
      title: 'Test Quiz 22222',
      questions: [
        "Does 1 + 1 = 1?",
        "Does 2 + 2 = 2?",
        "Does 3 + 3 = 3?",
        "Does 4 + 4 = 4?",
        "Does 5 + 5 = 5?"
      ]
    }
  }
];

class App extends Component {
  state = {
    loggedIn: false,
    userInfo: {},
    otherUsers: []
  }

  componentDidMount() {
    this.findUsers();
  };

  findUsers = () => {
    //[NOTE]: IF THERE'S ANY PROXIMITY SEARCHING, IT SHOULD HAPPEN HERE
    //[NOTE]: AXIOS CALL TO GET THE USER IDS.
    //DEPENDING ON WHAT'S RETURNED, THE FOLLOWING FOR LOOP (JUST ISOLATES THE IDS
    //INTO THEIR OWN ARRAY) MAY NOT BE NEEDED. KEY IS TO ISOLATE THINGS IN STATE.
    this.setState({ otherUsers: testArray })
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
            <ModalEntry toggleLogin={this.toggleLogin}/>
          </div> :
          <div id="userPage">
            <ModalQuiz userInfo={this.state.userInfo}/>
            <div id="otherQuizzes">
              {this.state.otherUsers.map((user) => (
                <FormOpenQuiz
                  username={user.username}
                  title={user.quiz.title}
                  questions={user.quiz.questions}
                />
              ))}
            </div>
          </div>}
      </div>
    )
  }
}

export default App;