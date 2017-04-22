import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  malaiseClick() {
    let health = this.props.health - 1;
    console.log('this.props.health: ', this.props.health);
    this.props.updateHealthOnClick(health);
  }

  render() {
    return (
    
      <article className="post">
        <span className="health">{this.props.health}</span>
        <p className="post-content">{this.props.post.content}</p>
        <Button bsStyle="danger" onClick={this.malaiseClick.bind(this)}>Malaise</Button>
      </article>
    
    );
  }
}

export default Post;