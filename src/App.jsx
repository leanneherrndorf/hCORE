import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Postform from './Postform.jsx';
import Postlist from './Postlist.jsx';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      count: 0,
      topic: '',
    }
  }

  generateUserName = () => {
    let first = ['Gli', 'Shla', 'Gla', 'Blo', 'La', 'Flo', 'Ju', 'Plu'];
    let last = ['nkus', 'mbus', 'rbonzo', 'mbo', 'nkey', 'ngus', 'ster'];
    let firstRandom = Math.floor(Math.random() * (7 - 0));
    let lastRandom = Math.floor(Math.random() * (6 - 0));
    return (first[firstRandom] + last[lastRandom]);
  }


  updateMessageOnClick = (input) => {
    
    const newMessage = {type: 'postMessage', content: input};
    this.socket.send(JSON.stringify(newMessage));
  }

   updateHealthOnClick = (health) => {
    console.log('value', health);
    const newHealth = {type: 'postMessage', health: health};
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

        case 'clientCount':
          this.setState({count: data.count});
        break;

        case 'incomingTopic':
          this.setState({topic: data.topic});
        break;

        default:
        // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }
    }
  }

  render() {
    console.log(this.generateUserName());
    return (
      <div>
        <Nav topic={this.state.topic} count={this.state.count}/>
        <Postform updateMessageOnClick={this.updateMessageOnClick}/>
        <Postlist updateHealthOnClick={this.updateHealthOnClick} posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
