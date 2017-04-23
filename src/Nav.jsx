import React, {Component} from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="the-nav">
        <h1 className="nav-brand">hCORE</h1>
        <h4 className="topic">Topic of the round: {this.props.topic}</h4>
        <p className="nav-count">{this.props.count} User(s) online</p>
      </nav>

    );
  }
}

export default Nav;