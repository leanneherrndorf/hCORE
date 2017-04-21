import React, {Component} from 'react';

class Postform extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer className="postform">
        <input ref="post" placeholder="What do you have to say?" onKeyPress={this.props.updateMessageOnEnter}/>
        <button type="button" >SUBMIT TO ME</button>
      </footer>
    );
  }
}

export default Postform;