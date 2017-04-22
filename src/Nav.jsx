import React, {Component} from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar">

        <h1 className="navbar-brand">hCORE</h1>
        <p className="navbar-topic">Topic of the round : {this.props.topic}</p>
        <p className="navbar-count">{this.props.count} Users online</p>
      </nav>

    );
  }
}

export default Nav;