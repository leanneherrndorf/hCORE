 import React, {Component} from 'react';
 
 class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
  }

 render() {
      return (
        <article className="score">           
          <p className="score-name">{this.props.post.name}'s post has {this.props.post.health} health remaining</p>
        </article>
      );    
    }
 }

 export default Leaderboard;