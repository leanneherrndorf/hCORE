import React, {Component} from 'react';
import { Link } from 'react-router';
import {Jumbotron} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';

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
        <p className="nav-username">{this.props.username}<img src={this.props.pic} style={{width: 60, height: 60}}/></p>
        <p className="nav-github"><a href ="https://github.com/leanneherrndorf/hCORE"><i className="fa fa-github" aria-hidden="true"></i></a></p>
      </nav>
        <DropdownButton title="Dropdown" id="bg-nested-dropdown" className="the-dropdown">
          <h1 className="nav-brand">hCORE</h1>
          <h4>In queue...</h4>
          <p>{this.props.count} User(s) online</p>
          <p>{this.props.username}<img src="../images/user_icons/010-zebra.png"  style={{width: 60, height: 60}}/></p>
          <p><a href ="https://github.com/leanneherrndorf/hCORE"><i className="fa fa-github" aria-hidden="true"></i></a></p>
        </DropdownButton>
      <Jumbotron className= "welcome">
        <h1 className="jumbo-text">WELCOME</h1>
      </Jumbotron>
      </div>

    );
  }
}

export default Welcome;