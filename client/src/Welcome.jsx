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

  // changeUserName() {
  //   let input = this.textInput.value;
  //   this.props.updateUserName(input);
  // }
  render() {
    if(!this.click){
      return (
        <div>
        <Nav/>
        <Jumbotron className= "welcome">
          <div className = "welcome-text">
          <h1 className="jumbo-text">WELCOME to hCORE</h1>
          <p>Hi, {this.props.username}! <img src={this.props.pic} style={{width: 40, height: 40}}/> </p>
          <p>Not a big fan of your auto-generated name? I guess you can change it here. </p>
          <input placeholder='Enter a new name...' onBlur={this.props.updateUserName}/>

          <p>At the start of the round, a topic will appear at the bottom of your screen. You have 20 seconds to think of your best response. Once the timer runs out, it's time to check out the other users posts. You will have 1 malaise point to downvote your least favourite. Best of luck surviving the round!</p>
          <Button type='submit' bsStyle="success" onClick={this.broadCastRoundCount.bind(this)}> Play </Button>
          </div>
        </Jumbotron>
          <div className="form-group">
            <div className="col-md-12 text-center">
              <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
            </div>
          </div>

          <Welcomefoot
            pic={this.props.pic}
            count={this.props.count}
            username={this.props.username}
          />
        </div>
      );
    }else{
      return (
        <div>
          <Nav/>
          <div className="waiting-for-posts">
            <div className="form-group">
              <div className="col-md-12 text-center">
                <p>waiting on {this.props.newRoundCounter} user(s)</p>
                <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
              </div>
            </div>
          </div>
          <Welcomefoot
            pic={this.props.pic}
            count={this.props.count}
            username={this.props.username}
          />
        </div>
      );
    }
  }
}

export default Welcome;



        // </div>
        //   <footer className="footer">
        //     <p className="footer-username">{this.props.username}<img src={this.props.pic} style={{width: 60, height: 60}}/></p>
        //     <h4 className="topic">In queue...</h4>
        //     <p className="footer-count">{this.props.count} User(s) online</p>

        //     <p className="footer-github"><a href ="https://github.com/leanneherrndorf/hCORE"><i className="fa fa-github" aria-hidden="true"></i></a></p>
        //   </footer>