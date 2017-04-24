import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  malaiseClick() {
    let health = this.props.post.health - 1;
    this.props.updateHealthOnClick(health, this.props.post.id);
  }

  praiseClick() {
    let health = this.props.post.health + 1;
    this.props.updateHealthOnClick(health, this.props.post.id);
  }

  render() {
    const percentageLost = this.props.post.health/this.props.post.maxHealth
    if (this.props.post.health === this.props.post.maxHealth){
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
      
    } else if (this.props.post.health !== this.props.post.maxHealth && this.props.post.health > 0) {   
       return (
          <article className="post">
            <span className="health">{this.props.post.health}</span>
            <div style={{border: '1px solid black', width: 302}}>
              <div style={{width: 300 * percentageLost, backgroundColor: 'tomato', height: 10}}></div>
            </div>
            <p className="post-content">{this.props.post.post}</p>
            <Button bsStyle="danger" onClick={this.malaiseClick.bind(this)}>Malaise</Button>
            <Button bsStyle="danger" onClick={this.praiseClick.bind(this)}>Praise</Button>  
          </article>
       );
    } else {
      return (
          <article className="post"> 
            <img src="../images/gravestone.png" className="grave-stone" style={{width: 120, height: 120}}/>
            <p className="grave-name">{this.props.post.name}</p>
          </article>
      );
    }
  }
}


export default Post;