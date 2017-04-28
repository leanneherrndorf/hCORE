import React, {Component} from 'react';
//import {DropdownButton} from 'react-bootstrap';

class Welcomefoot extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <footer className="footer">
        <div className="row1">
          <p className="footer-username">{this.props.username}<img src={this.props.pic} style={{width: 60, height: 60}}/></p>
          <p className="topic">In queue...</p>
          <p className="footer-count">{this.props.count} User(s) online</p>
        </div>
        <div>
          <p className="footer-github"><a href ="https://github.com/leanneherrndorf/hCORE"><i className="fa fa-github" aria-hidden="true"></i></a></p>
        </div>
      </footer>
    );
  }
}

export default Welcomefoot;