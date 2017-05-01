import React, {Component} from 'react';

class FormFoot extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer className="footer">
        <h4 className="topic">Topic of the round: {this.props.topic}</h4>
      </footer>
    );
  }
}

export default FormFoot;