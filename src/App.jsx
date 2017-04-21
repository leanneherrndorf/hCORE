import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Postform from './Postform.jsx';
import Postlist from './Postlist.jsx';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

const routes = (
  <Route path="/" component={() => (
    <div>
      <Nav/>
      <Postform updateMessageOnClick={this.updateMessageOnClick}/>
      <Postlist posts={this.state.posts}/>
    </div>
  )}/>
);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
  }

  updateMessageOnClick = (input) => {
    console.log('value', input);
    const newMessage = {type: 'postMessage', content: input};
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount = () => {
    console.log('componentDidMount <App />');
    this.socket = new WebSocket('ws://0.0.0.0:3001');
    this.socket.onopen = () => {
      console.log('is connected');
    }

    this.socket.onmessage = (event) => {
      console.log('event.data:', event.data);
      const data = JSON.parse(event.data);
      const posts = this.state.posts.concat(data);

      switch(data.type) {
        case 'incomingMessage':
          const posts = this.state.posts.concat(data);
          console.log('posts:', posts);
          this.setState({posts: posts});
          break;
        default:
        // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }
    }
  }

  routes = (
    <Route path="/" component={() => (
      <div>
        <Nav/>
        <Postform updateMessageOnClick={this.updateMessageOnClick}/>
        <Postlist posts={this.state.posts}/>
      </div>
    )}/>
  );

  render() {
    return (
      <div>
      <Router history={hashHistory}>
        {this.routes}
      </Router>  
      </div>
    );
  }
}

export default App;
