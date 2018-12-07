import React, { Component } from 'react';
import ModalEntry from './components/ModalEntry';
import ModalQuiz from './components/ModalQuiz';
import ModalTestTaker from './components/ModalTestTaker';

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
      ],
      answers: [
        "true",
        "true",
        "true",
        "true",
        "true",
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
      ],
      answers: [
        "false",
        "false",
        "false",
        "false",
        "false",
      ]
    }
  }
];

class App extends Component {
  state = {
    loggedIn: true,
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

    this.setState({otherUsers: testArray})
  }

  render() {
    return (

      <div >
        {!this.state.loggedIn ?
          <div id="loginScreen">
            <ModalEntry />
          </div> :
          <div id="userPage">
            <ModalQuiz />

            <div id="otherQuizzes">
            <ModalTestTaker />
            </div>
          </div>}
      </div>
    )
  }
}

export default App;