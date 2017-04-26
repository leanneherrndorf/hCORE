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
    this.props.clearPosts();
  }

  broadCastRoundCount() {
    this.props.updateNewRoundCount();
    this.click = true;
    return this.checkingRoundCount();
  }

  checkingRoundCount() {
    if (this.props.newRoundCounter === 1) {
      this.newRoundClick();
    } else {
      return;
    }
  }

  render() {
    // console.log('current Malaise', this.props.currentMalaise);
    if(!this.click){
    return (
      <div>
      <Jumbotron className= "results">
        <h1 className="jumbo-text">Results</h1>
        <p>Winner: {this.props.currentWinner}</p>
        <p>Loser: {this.props.currentLoser}</p>
        <Button type='submit' bsStyle="success" onClick={this.broadCastRoundCount.bind(this)}> Start a new round! </Button>
      </Jumbotron>
      </div>

    );
  } else {
    return (
      <div className="waiting-for-posts">
          <div className="form-group">
            <div className="col-md-12 text-center">
              <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
            </div>
          </div>
        </div>
    );     
  }
}
}

export default Results;