import React, {Component} from 'react';
//import {DropdownButton} from 'react-bootstrap';


class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <nav className="the-nav">
          <img src="../huManatee.png" className="logo" style={{width: 50, height: 50}}/>
          <h1 className="nav-brand">hCORE</h1>
          <a className="top-posts" href="/archive"><i className="fa fa-star" aria-hidden="true"></i>Top posts</a>
        </nav>
      </div>
    );
  }
}

export default Nav;
