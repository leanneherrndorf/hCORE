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
        <Message post={post} key={post.id}/>
      )}
      </main>
    );
  }
}

export default Postlist;