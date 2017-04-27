import React, {Component} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Leaderboard from './Leaderboard.jsx';

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
    if (this.props.newRoundCounter <= 1) {
      this.newRoundClick();
    } else {
      return;
    }
  }

  render() {
    if(!this.click){
      return (
        <div>
          <Jumbotron className= "results">
            <h1 className="jumbo-text">Results</h1>
            
            <main className="leaderboard">
            {this.props.posts.map((post) =>
            <Leaderboard post={post}
            malaisePoints={this.props.malaisePoints}
            />
            )}
            </main>

            <Button type='submit' bsStyle="success" onClick={this.broadCastRoundCount.bind(this)}> Start a new round! </Button>
          </Jumbotron>
        </div>
      );
    } else {
      return (
        <div className="waiting-for-posts">
            <div className="form-group">
              <div className="col-md-12 text-center">
                <p>waiting on {this.props.newRoundCounter} user(s)</p>
                <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
              </div>
            </div>
        </div>
      );
    }
  }
}

export default Results;