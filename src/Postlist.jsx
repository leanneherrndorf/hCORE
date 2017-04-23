import React, {Component} from 'react';
import Post from './Post.jsx'

class Postlist extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main className="postlist">
      {this.props.posts.map((post) =>
        <Post post={post} key={post.id} 
          updateHealthOnClick={this.props.updateHealthOnClick} 
          currentUserMalaise={this.props.currentUserMalaise}
        />
      )}
      </main>
    );
  }
}

export default Postlist;