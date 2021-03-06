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
    this.click = false
  }

  showAlert(){
    msg.show(<h3>Post must be less than 200 characters.</h3>, {
      time: 3000,
      type: 'error',
      icon: <img src="../huManatee.png" style={{width: 60, height: 60, borderRadius: 6}} />
    });
  }

  showAlert2(){
    msg.show(<h3>Write something you big dumb goof.</h3>, {
      time: 3000,
      type: 'error',
      icon: <img src="../huManatee.png" style={{width: 60, height: 60, borderRadius: 6}} />
    });
  }

  handleClick() {
    let input = this.textInput.value;
    if (input.length <= 200 && input.length > 0) {
      this.props.updateMessageOnClick(input);
      this.textInput.value = null;
      this.click = true;
    } else if (input.length === 0) {
      this.showAlert2();
    } else {
      this.showAlert();
    }
  }

  render() {
    if(!this.click){
      return (
        <header className="postform">
          <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
          <textarea type='text' ref={(thisInput) => {this.textInput = thisInput;}} placeholder="Write your answer" />
          <Button className= "submit" type='submit' bsStyle="success" onClick={this.handleClick.bind(this)}><i className="fa fa-envelope-o" aria-hidden="true"></i> Submit</Button>
        </header>
      );

    } else {
      return (
        <div className="waiting-for-posts"></div>
      );
    }
  }
}

export default Postform;
