import React, {Component} from 'react';

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
        <input type='submit' value='Submit to me' onClick={this.handleClick.bind(this)} />

      </footer>
    );
  }
}


export default Postform;