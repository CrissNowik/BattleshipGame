import React from 'react';
import ReactDOM from 'react-dom';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class UnitsDmg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  };

  render() {
    return (
      <div>
        <p className="item-label">Units damage raport: </p>
        <Row className="item-container">
          <Col className="item" xs={3} md={2}>
            <img src="./pics/cruise-liner-green4c.png"/>
          </Col>
          <Col className="item" xs={3} md={2}>
            <img src="./pics/cruise-liner-green3.png"/>
          </Col>
          <Col className="item" xs={3} md={2}>
            <img src="./pics/cruise-liner-green3.png"/>
          </Col>
          <Col className="item" xs={3} md={2}>
            <img src="./pics/cruise-liner-green2.png"/>
          </Col>
          <Col className="item" xs={3} md={2}>
            <img src="./pics/cruise-liner-green2.png"/>
          </Col>
          <Col className="item" xs={3} md={2}>
            <img src="./pics/cruise-liner-green2.png"/>
          </Col>
          <Col className="item" xs={3} md={2}>
            <img src="./pics/cruise-liner-green.png"/>
          </Col>
          <Col className="item" xs={3} md={2}>
            <img src="./pics/cruise-liner-green.png"/>
          </Col>
          <Col className="item" xs={3} md={2}>
            <img src="./pics/cruise-liner-green.png"/>
          </Col>
          <Col className="item" xs={3} md={2}>
            <img src="./pics/cruise-liner-green.png"/>
          </Col>
        </Row>


      </div>
    );
  }
};

export {UnitsDmg};
