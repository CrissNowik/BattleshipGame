import React from 'react';
import ReactDOM from 'react-dom';
import {playerFleet} from './playerFleet.jsx';
import {enemyFleet} from './enemyFleet.jsx';
import {shoots} from './shoots.jsx';
import {unitsDmg} from './unitsDmg.jsx';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  };

  render() {
    return (
      <p>test Game</p>
    );
  }
};

export {Game};
