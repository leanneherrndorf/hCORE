import React, {Component} from 'react';

class Postform extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer className="postlist">
        <input className="postlist" placeholder="What do you have to say?" onKeyPress={this.props.updateMessageOnEnter}/>
        {/*<button type="button">SUBMIT TO ME</button>*/}
      </footer>
    );
  }
}

export default Postform;