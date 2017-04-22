import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import AlertContainer from 'react-alert';


class Postform extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
    this.alertOptions = {
      offset: 14,
      position: 'top right',
      theme: 'light',
      time: 5000,
      transition: 'scale'
    };
  }


  showAlert(){
    msg.show('Post must be less than 200 characters.', {
      time: 2000,
      type: 'error',
      icon: <img src="../images/patgar.jpg" style={{width: 60, height: 60, borderRadius: 6 }} />
    });
  }

  handleClick() {
    console.log(this.textInput.value);
    let input = this.textInput.value;
    if (input.length <= 200) {
      this.props.updateMessageOnClick(input);
      this.textInput.value = null;
    } else {
      this.showAlert();
    }
  }

  render() {
    return (
      <footer className="postlist">
        <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
        <input type='text' ref={(thisInput) => {this.textInput = thisInput;}} className="postlist" placeholder="What do you have to say?" />
        <Button type='submit' bsStyle="success" onClick={this.handleClick.bind(this)}>Submit to me</Button>
      </footer>
    );
  }
}


export default Postform;