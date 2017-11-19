import React from 'react';
import ReactDOM from 'react-dom';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class PlayerFleet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerBattlefields: new Array(10)

    }
  };

  componentDidMount() {
    let a = 0;
    for (let i = 0; i < 12; i++) {
      this.state.playerBattlefields[i] = new Array(12);
      for (let j = 0; j < 12; j++) {
        this.state.playerBattlefields[i][j] = a++;
      }
    }
    console.log(this.state.playerBattlefields);
  }

  drawBattlefield = (row) => {
    let battlefield = this.state.playerBattlefields.map(
      (xmap, b) => {/*console.log("test", xmap, b)*/;
        return xmap.map((x, index) => {
          // console.log(x);
          return (
            <div key={row++} className="cell" onClick={e => this.clickHandler(b, index)}>.</div>
          )
        })

      }
    )
    return battlefield;
  }

  clickHandler = (x,y) => {
    console.log("Kliknięte", x, y);
    // this.state.playerBattlefields[x][y] = 1;
    console.log("Test clickHandler", this.state.playerBattlefields[x][y]);
  };

  render() {
    return (
      <Row className="radar-circle">
        <h2>Fleet status:</h2>
        <Col xs={18} md={12} className="battlefield">
          {this.drawBattlefield(0)}
        </Col>
      </Row>
    );
  }
};

export {PlayerFleet};

 // rozwiązanie awaryjne <Col className="cell"  onClick={e => this.clickHandler(0,0)} xs={2} md={1}></Col>
