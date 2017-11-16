import React from 'react';
import ReactDOM from 'react-dom';

import Button from 'react-bootstrap/lib/Button';

class PlayerData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: ""
    }
  };
  handleNameChange = (event) => {
    event.preventDefault();
    this.setState({
      playerName: event.target.value
    })
    console.log(this.state.playerName);
  }

  render() {
    return (
    <form>
      <label>
        Captain:
        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
      </label>
      <Button bsStyle="primary" bsSize="large" block>To battle!</Button>
    </form>
    );
  }
};

export {PlayerData};
