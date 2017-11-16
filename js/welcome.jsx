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

    }
  };

  render() {
    return (
      <Grid id="grid">
        <Row className="show-grid">
         <Col xs={12} md={7}>

         </Col>
         <Col xs={6} md={5}>
           <Row className="show-grid">
             <Col xs={18} md={12}>
               <h1>Gentlemens! Attention!</h1>
               <h2>Captain on the bridge!</h2>
               <p>Welcome Comander, we rapidly prepare to battle! <br/>
                 Just please, write your name below.</p>
             </Col>
             <Col xs={18} md={12}>
               <PlayerData/>
             </Col>
           </Row>
         </Col>
       </Row>
 </Grid>
    );
  }
};



export {Welcome};
