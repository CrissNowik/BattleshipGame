import React from 'react';
import ReactDOM from 'react-dom';

import {PlayerFleet} from './playerFleet.jsx';
import {EnemyFleet} from './enemyFleet.jsx';
import {Shoots} from './shoots.jsx';
import {UnitsDmg} from './unitsDmg.jsx';
import {Officer} from './officer.jsx';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  };

  showGame = (e) => {
    e.preventDefault();
    if ( typeof this.props.showGame === 'function' ){
        this.props.showGame("block");
    }
  }

  render() {
    return (
      <Grid className="game-board">
        <Row className="show-grid">
          <Col xs={9} md={6}>
            <PlayerFleet />
          </Col>
          <Col xs={9} md={6}>
            <EnemyFleet />
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={9} md={6}>
            <UnitsDmg />
          </Col>
          <Col xs={9} md={6}>
            <Shoots />
          </Col>
        </Row>
      </Grid>
    );
  }
};

export {Game};
