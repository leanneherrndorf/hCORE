import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  malaiseClick() {
    let health = this.props.post.health - 1;
    console.log('this.props.health: ', this.props.health);
    this.props.updateHealthOnClick(health, this.props.post.id);
  }

  render() {
    console.log("testing", this.props.post)
    const percentageLost = this.props.post.health/this.props.post.maxHealth
    return (
        <article className="post">
          <span className="health">{this.props.post.health}</span>
          <div style={{border: '1px solid black', width: 302}}>
            <div style={{width: 300 * percentageLost, backgroundColor: 'tomato', height: 10}}></div>
          </div>
          <p className="post-content">{this.props.post.post}</p>
          <Button bsStyle="danger" onClick={this.malaiseClick.bind(this)}>Malaise</Button>
        </article>
    );
  }
}

export default Post;