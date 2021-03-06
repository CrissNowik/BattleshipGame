import React from 'react';
import ReactDOM from 'react-dom';

import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormControlFeedback from 'react-bootstrap/lib/FormControlFeedback';

class PlayerData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  };

  getValidationState = () => {
    const length = this.state.value.length;
    if (length > 2 && length < 20) return 'success';
    else if (length > 0 ) return 'error';
    return null;
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    const length = this.state.value.length;
    if (length > 2 && length < 20 && this.state.value !== "Place name Sir!") {
      this.hideWelcome(e);
      this.showGame(e);
    }
    else {
      this.setState({
        value: "Place name Sir!"
      })
    }
  }

  hideWelcome = (e) => {
    e.preventDefault();
    if (typeof this.props.hideWelcome === 'function' ){
        this.props.hideWelcome("none");
    }
  }

  showGame = (e) => {
    e.preventDefault();
    if ( typeof this.props.showGame === 'function' ){
        this.props.showGame("block");
    }
  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel className="start-label">Captain:</ControlLabel>
          <FormControl className="start-input" bsSize="large"
            type="text"
            value={this.state.value}
            placeholder=""
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <Button bsStyle="primary" bsSize="large" onClick={this.handleClick}>To battle!</Button>
        </FormGroup>
      </form>
    );
  }
};

export {PlayerData};
