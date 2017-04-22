import React, {Component} from 'react';
import {Button} from 'react-bootstrap';


class Post extends React.Component {
  constructor(props) {
    super(props);
  }


  malaiseClick() { 
    let health = this.props.post.health - 1;
    this.props.updateHealthOnClick(health);
  }

  render() {
    return (
    
      <div className="post">
        <span className="post-health">{this.props.post.health}</span>
        <Button type='submit' bsStyle="success" onClick={this.malaiseClick.bind(this)}>Malaise</Button>
        <p className="post-content">{this.props.post.content}</p>
      </div>
    
    );
  }
}

export default Post;