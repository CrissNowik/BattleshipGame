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

      }
    };

    render() {
      return (
        <div>
          <Welcome/>
        </div>
      );
    }
  };

  ReactDOM.render(<App/>, document.getElementById("app"));

});
