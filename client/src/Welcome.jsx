import React, {Component} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import Nav from './Nav.jsx';
//import Foot from './Foot.jsx';
import Welcomefoot from './Welcomefoot.jsx';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
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
    if (!this.click) {
      return (
        <div>
          <Nav/>
          <Jumbotron className= "welcome">
            <div className = "welcome-text">
            <p>WELCOME to</p>
            <h1 className="logo-text">hC<img src="../huManatee.png" className="logo-img" style={{width: 60, height: 60}}/>RE</h1>
            <h2>Hi, {this.props.username}! <img src={this.props.pic} style={{width: 40, height: 40}}/> </h2>
            <p>Not a big fan of your auto-generated name? I guess you can change it here (but if it's over 12 characters then you're a dingus). </p>
            <input placeholder='Enter a new name...' onBlur={this.props.updateUserName}/>

            <p>At the start of the round, a topic will appear at the bottom of your screen. You have 30 seconds to think of your best response. Once all the posts are in you will have 1 Malaise Point to attack your least favourite. You can Praise a damaged post to increase its health and gain another Malaise Point. May your wits be with you!</p>
            <img src="../how-to-play-hCORE!.gif" className="how-to-gif"/>
            <Button type="submit" bsStyle="success" onClick={this.broadCastRoundCount.bind(this)}> Play </Button>
            <p> {this.props.count} User(s) Online </p>
            </div>
          </Jumbotron>
          <div className= "info">
            <p> Made with Malaise <i className="fa fa-heart" aria-hidden="true"></i></p>
            <p> Brendan Walker, Max Bergen, Leanne Herrndorf </p>
            <p className="github"><a href ="https://github.com/leanneherrndorf/hCORE"><i className="fa fa-github" aria-hidden="true"></i></a></p>
          </div>
        </div>
      );

    } else {
      return (
        <div>
          <Nav/>
          <div className="waiting-for-posts">
            <div className="form-group">
              <div className="col-md-12 text-center">
                <p>Waiting on {this.props.newRoundCounter} User(s)</p>
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
