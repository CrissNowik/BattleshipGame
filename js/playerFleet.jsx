import React from 'react';
import ReactDOM from 'react-dom';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class PlayerFleet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  };

  clickHandler = () => {
    console.log("Kliknięte");
  };

  render() {
    return (
      <Row className="radar-circle">
        <h2>Fleet status:</h2>
        <Col xs={18} md={12} className="battlefield">
          <Row >
            <Col className="cell-cord" xs={2} md={1}><p>X</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>A</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>B</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>C</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>D</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>E</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>F</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>G</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>H</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>I</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>J</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>X</p></Col>
          </Row>
          <Row >
            <Col className="cell-cord" xs={2} md={1}><p>1</p></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell-cord" xs={2} md={1}><p>1</p></Col>
          </Row>
          <Row >
            <Col className="cell-cord" xs={2} md={1}><p>2</p></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell-cord" xs={2} md={1}><p>2</p></Col>
          </Row>
          <Row >
            <Col className="cell-cord" xs={2} md={1}><p>3</p></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell-cord" xs={2} md={1}><p>3</p></Col>
          </Row>
          <Row >
            <Col className="cell-cord" xs={2} md={1}><p>4</p></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell-cord" xs={2} md={1}><p>4</p></Col>
          </Row>
          <Row>
            <Col className="cell-cord" xs={2} md={1}><p>5</p></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell-cord" xs={2} md={1}><p>5</p></Col>
          </Row>
          <Row>
            <Col className="cell-cord" xs={2} md={1}><p>6</p></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell-cord" xs={2} md={1}><p>6</p></Col>
          </Row>
          <Row>
            <Col className="cell-cord" xs={2} md={1}><p>7</p></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell-cord" xs={2} md={1}><p>7</p></Col>
          </Row>
          <Row>
            <Col className="cell-cord" xs={2} md={1}><p>8</p></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell-cord" xs={2} md={1}><p>8</p></Col>
          </Row>
          <Row>
            <Col className="cell-cord" xs={2} md={1}><p>9</p></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell-cord" xs={2} md={1}><p>9</p></Col>
          </Row>

          <Row>
            <Col className="cell-cord" xs={2} md={1}><p>10</p></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell" onClick={this.clickHandler} xs={2} md={1}></Col>
            <Col className="cell-cord" xs={2} md={1}><p>10</p></Col>
          </Row>
          <Row>
            <Col className="cell-cord" xs={2} md={1}><p>X</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>A</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>B</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>C</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>D</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>E</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>F</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>G</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>H</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>I</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>J</p></Col>
            <Col className="cell-cord" xs={2} md={1}><p>X</p></Col>
          </Row>
        </Col>
      </Row>
    );
  }
};

export {PlayerFleet};
