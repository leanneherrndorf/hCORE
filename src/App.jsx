import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Postform from './Postform.jsx';
import Postlist from './Postlist.jsx';

function generateUserName() {
  let first = ['Gli', 'Shla', 'Gla', 'Blo', 'La', 'Flo', 'Ju', 'Plu'];
  let last = ['nkus', 'mbus', 'rbonzo', 'mbo', 'nkey', 'ngus', 'ster'];
  let firstRandom = Math.floor(Math.random() * (7));
  let lastRandom = Math.floor(Math.random() * (6));
  return (first[firstRandom] + last[lastRandom]);
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      count: 0,
      topic: '',
      user: {
        name: generateUserName(),
        health: 0
      }
    }
  }


  updateHealthOnClick = (health) => {
    console.log('health', health);
    const newHealth = {type: 'postHealth', health: health}
    this.socket.send(JSON.stringify(newHealth));
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

        case 'clientCount':
          this.setState({count: data.count});
        break;

        case 'healthCount':
          this.setState({user: {health: data.health}})
        break;

        case 'incomingTopic':
          this.setState({topic: data.topic});
        break;

        case 'incomingHealth':
          this.setState({user: {health: data.health}});
        break;

        default:
        // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }
    }
  }

  render() {
    return (
      <div>
        <Nav topic={this.state.topic} count={this.state.count}/>
        <Postform updateMessageOnClick={this.updateMessageOnClick}/>
        <Postlist posts={this.state.posts} 
          health={this.state.user.health} 
          updateHealthOnClick={this.updateHealthOnClick} 
        />
      </div>
    );
  }
}

export default App;
