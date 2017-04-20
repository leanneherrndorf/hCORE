import React, {Component} from 'react';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand"></a>
        <h1>hCORE</h1>
      </nav>
    );
  }
}

export default Nav;