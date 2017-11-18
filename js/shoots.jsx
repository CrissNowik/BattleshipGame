

import React from 'react';
import ReactDOM from 'react-dom';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class Shoots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  };


  render() {
    return (
      <div>
        <p className="item-label">Ammo expense: </p>
        <Row className="item-container">
          <Col className="item" xs={3} md={2}>
            <img src="./pics/bulletgreen.png"/>
          </Col>
          <Col className="item" xs={3} md={2}>
            <img src="./pics/bulletgreen.png"/>
          </Col>
          <Col className="item" xs={3} md={2}>
            <img src="./pics/bulletgreen.png"/>
          </Col>
        </Row>
      </div>
    );
  }
};

export {Shoots};
