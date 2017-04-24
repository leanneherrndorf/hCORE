import React, {Component} from 'react';
import { Link } from 'react-router';
import {Jumbotron} from 'react-bootstrap';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log('current Malaise', this.props.currentMalaise);
    return (
      <div>
      <nav className="the-nav">
        <h1 className="nav-brand">hCORE</h1>
        <h4 className="topic">In queue...</h4>
        <p className="nav-count">{this.props.count} User(s) online</p>
        <p className="nav-username">{this.props.username}<img src="../images/user_icons/010-zebra.png"  style={{width: 60, height: 60}}/></p>       
        <p className="nav-github"><a href ="https://github.com/leanneherrndorf/hCORE"><i className="fa fa-github" aria-hidden="true"></i></a></p>
      </nav>
      <Jumbotron>
          <br/>
          <br/>
          <br/>
          <h1>WELCOME</h1>
          </Jumbotron>
      </div>

    );
  }
}

export default Welcome;