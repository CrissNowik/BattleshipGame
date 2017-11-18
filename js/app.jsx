import React from 'react';
import ReactDOM from 'react-dom';
// import Popover from 'react-bootstrap/lib/Popover';
import {Game} from './game.jsx';
import {Welcome} from './welcome.jsx';


document.addEventListener('DOMContentLoaded', function(){

  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        displayWelcome: "block",
        displayGame: "none"
      }
    };

    hideWelcome = (displayWelcome) => {
      this.setState({
        displayWelcome
      })
    }
    showGame = (displayGame) => {
      this.setState({
        displayGame
      })
    }

    render() {
      return (
        <div>
          <div style={{display: this.state.displayWelcome}}>
            <Welcome
              hideWelcome={this.hideWelcome}
              showGame={this.showGame}
            />
          </div>
          <div style={{display: this.state.displayGame}}>
            <Game />
          </div>
        </div>
      );
    }
  };

  ReactDOM.render(<App/>, document.getElementById("app"));

});
