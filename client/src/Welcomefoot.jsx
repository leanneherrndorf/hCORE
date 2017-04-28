import React, {Component} from 'react';
//import {DropdownButton} from 'react-bootstrap';

class Welcomefoot extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <footer className="footer">
        <p className="footer-username">{this.props.username}<img src={this.props.pic} style={{width: 60, height: 60}}/></p>
        <p className="topic">In queue...</p>
        <p className="footer-count">{this.props.count} User(s) online</p>
      </footer>
    );
  }
}

export default Welcomefoot;
