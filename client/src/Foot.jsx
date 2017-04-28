import React, {Component} from 'react';

//import {DropdownButton} from 'react-bootstrap';

class Foot extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <footer className="footer">
        <p className="footer-username">{this.props.username}<img src={this.props.pic} style={{width: 60, height: 60}}/></p>
        <h4 className="topic">Topic of the round: {this.props.topic}</h4>
        <p className="footer-count">{this.props.count} User(s) online</p>
        <p className="footer-malaise">{this.props.malaisePoints} Malaise Points</p>
        <p className="footer-github"><a href ="https://github.com/leanneherrndorf/hCORE"><i className="fa fa-github" aria-hidden="true"></i></a></p>
        <p className="footer-timer"></p>
      </footer>
    );
  }
}

export default Foot;
