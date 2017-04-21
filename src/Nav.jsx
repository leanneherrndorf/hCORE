import React, {Component} from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar">
        <Link to="/login" className="navbar-brand">Login</Link>
        <Link to="/" className="navbar-home">Home</Link>
        <h1>hCORE</h1>
      </nav>
    );
  }
}

export default Nav;