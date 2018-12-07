import React, { Component } from 'react';
import * as $ from 'axios';
import ModalEntry from './components/ModalEntry';
import ModalQuiz from './components/ModalQuiz';

class App extends Component {

  state = {
    loggedIn: false
  }

  componentDidMount() {
    console.log('mounted')
  };

  render() {
    return (

      <div >
        {!this.state.loggedIn ?
          <div id="loginScreen">
            <ModalEntry />
          </div> :
          <div id="userPage">
            <ModalQuiz />
          </div>}
      </div>
    )
  }
}

export default App;