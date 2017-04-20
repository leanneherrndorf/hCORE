import React, {Component} from 'react';

class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    
      <div className="post">
        <span className="post-content">{this.props.posts.content}</span>
      </div>
    
    );
  }
}

export default Post;