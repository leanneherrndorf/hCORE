import React, {Component} from 'react';

class Foot extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer className="footer">
        <h4 className="topic">Topic of the round: {this.props.topic}</h4>
        <p className="footer-username">{this.props.username}<img src={this.props.pic} style={{width: 60, height: 60}}/></p>
        <p className="footer-malaise">{this.props.malaisePoints} Malaise Points</p>
        <p className="footer-timer"></p>
      </footer>
    );
  }
}

export default Foot;
