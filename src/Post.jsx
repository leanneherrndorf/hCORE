import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Fade} from 'react-bootstrap';

class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  showMalaiseButton() {
    if (this.props.userName == this.props.post.name) {
      return;
    } else {
      return (
        <Button bsStyle="danger" onClick={this.malaiseClick.bind(this)}>
        <i className="fa fa-bomb" aria-hidden="true"></i> Malaise
        </Button>
      );
    }
  }

  showPraiseButton() {
    if (this.props.userName == this.props.post.name) {
      return;
    } else {
      return (
        <Button bsStyle="danger" onClick={this.praiseClick.bind(this)}>
        <i className="fa fa-star" aria-hidden="true"></i> Praise
        </Button>
      );
    }
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
            <div style={{width: 302}}>
              <div className="health-bar" style={{width: 300 * percentageLost, height: 10, borderRadius: 4}}></div>
            </div>
            <p className="post-content">{this.props.post.post}</p>
            {this.showMalaiseButton()}
          </article>
      );
    } else if (this.props.post.health !== this.props.post.maxHealth && this.props.post.health > 0) {
       return (
          <article className="post">
            <span className="health">{this.props.post.health}</span>
            <div style={{width: 302}}>
              <div className="health-bar" style={{width: 300 * percentageLost, height: 10, borderRadius: 4}}></div>
            </div>
            <p className="post-content">{this.props.post.post}</p>
            {this.showMalaiseButton()}
            {this.showPraiseButton()}
          </article>
       );
    } else {
      return (
        <article className="post">
          <img src="../images/gravestone.png" className="grave-stone" style={{width: 120, height: 120}}/>
          <img src={this.props.post.pic} className="dead-avatar" style={{width: 60, height: 60}}/>
          <p className="grave-name">{this.props.post.name}</p>
        </article>
      );
    }
  }
}

export default Post;