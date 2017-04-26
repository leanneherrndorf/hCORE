import React, {Component} from 'react';
import { Link } from 'react-router';
import {Jumbotron} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class Welcome extends React.Component {
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
        <nav className="the-nav">
          <h1 className="nav-brand">hCORE</h1>
          <h4 className="topic">In queue...</h4>
          <p className="nav-count">{this.props.count} User(s) online</p>
          <p className="nav-username">{this.props.username}<img src={this.props.pic} style={{width: 60, height: 60}}/></p>
          <p className="nav-github"><a href ="https://github.com/leanneherrndorf/hCORE"><i className="fa fa-github" aria-hidden="true"></i></a></p>
        </nav>
          <DropdownButton title="Dropdown" id="bg-nested-dropdown" className="the-dropdown">
            <h1 className="nav-brand">hCORE</h1>
            <h4>In queue...</h4>
            <p>{this.props.count} User(s) online</p>
            <p>{this.props.username}<img src={this.props.pic} style={{width: 60, height: 60}}/></p>
            <p><a href ="https://github.com/leanneherrndorf/hCORE"><i className="fa fa-github" aria-hidden="true"></i></a></p>
          </DropdownButton>
        <Jumbotron className= "welcome">
          <h1 className="jumbo-text">WELCOME</h1>
          <Button type='submit' bsStyle="success" onClick={this.broadCastRoundCount.bind(this)}> Start a new round! </Button>
        </Jumbotron>
          <div className="form-group">
            <div className="col-md-12 text-center">
              <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
            </div>
          </div>
        </div>
      );
    }else{
      return (
        <div>
          <nav className="the-nav">
            <h1 className="nav-brand">hCORE</h1>
            <h4 className="topic">In queue...</h4>
            <p className="nav-count">{this.props.count} User(s) online</p>
            <p className="nav-username">{this.props.username}<img src={this.props.pic} style={{width: 60, height: 60}}/></p>
            <p className="nav-github"><a href ="https://github.com/leanneherrndorf/hCORE"><i className="fa fa-github" aria-hidden="true"></i></a></p>
          </nav>
          <div className="waiting-for-posts">
            <div className="form-group">
              <div className="col-md-12 text-center">
                <p>waiting on {this.props.newRoundCounter} user(s)</p>
                <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Welcome;