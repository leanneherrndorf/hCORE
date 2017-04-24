import React, {Component} from 'react';
import { Link } from 'react-router';
import {Jumbotron} from 'react-bootstrap';

class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log('current Malaise', this.props.currentMalaise);
    return (
      <div>
      <Jumbotron className= "results">
        <h1 className="jumbo-text">Results</h1>
        <p>Winner: </p>
        <p>Loser: </p>
      </Jumbotron>
      </div>

    );
  }
}

export default Results;