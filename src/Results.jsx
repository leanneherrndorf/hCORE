import React, {Component} from 'react';
import { Link } from 'react-router';
import {Jumbotron} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  newRoundClick(){
    this.props.newRoundStart();
  }

  render() {
    // console.log('current Malaise', this.props.currentMalaise);
    return (
      <div>
      <Jumbotron className= "results">
        <h1 className="jumbo-text">Results</h1>
        <p>Winner: </p>
        <p>Loser: </p>
        <Button type='submit' bsStyle="success" onClick={this.newRoundClick.bind(this)}> Start a new round! </Button>
      </Jumbotron>
      </div>

    );
  }
}

export default Results;