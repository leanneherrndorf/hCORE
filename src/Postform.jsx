import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class Postform extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
  }

  handleClick() {
    console.log(this.textInput.value);
    let input = this.textInput.value;
    this.props.updateMessageOnClick(input);
    this.textInput.value = null;
  }

  render() {
    return (
      <footer className="postlist">
        <input type='text' ref={(thisInput) => {this.textInput = thisInput;}} className="postlist" placeholder="What do you have to say?" />
        <Button type='submit' bsStyle="success" onClick={this.handleClick.bind(this)}>Submit to me</Button>

      </footer>
    );
  }
}


export default Postform;