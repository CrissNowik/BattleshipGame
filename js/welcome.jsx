import React from 'react';
import ReactDOM from 'react-dom';

import {PlayerData} from './playerData.jsx';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideWelcome: "block"
    }
  };

  render() {
    return (
      <Grid id="welcome-screen">
        <Row>
         <Col xs={12} md={7} className="start-photo">

         </Col>
         <Col xs={6} md={5}>
           <Row>
             <Col xs={18} md={12} className="start-info">
               <h2 className="welcome-headers">Gentlemens! Attention!</h2>
               <h2 className="welcome-headers">Captain on the bridge!</h2>
               <br/>
               <p className="welcome-text">Welcome Comander!  <br/>
                  We rapidly prepare to battle! <br/>
                Just please, write your name below!</p>
             </Col>
             <Col xs={18} md={12}>
               <PlayerData
                 hideWelcome={this.state.hideWelcome}
                 showGame={this.props.showGame}
               />
             </Col>
           </Row>
         </Col>
       </Row>
 </Grid>
    );
  }
};

export {Welcome}
