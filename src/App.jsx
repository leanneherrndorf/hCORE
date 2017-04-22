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
      topic: ''
    }
  }


  updateHealthOnClick = (health, id) => {
    console.log('health', health);
    const newHealth = {type: 'postHealth', health: health, id: id}
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
      // const posts = this.state.posts.concat(data);

      switch(data.type) {
        case 'incomingMessage':
          const postObj = {
            id: data.content.id,
            post: data.content.post, 
            health: data.content.health,
            name: data.content.name,
            maxHealth: data.content.maxHealth
          }
          const posts = this.state.posts.concat(postObj);
          this.setState({posts: posts});
        break;

        case 'clientCount':
          this.setState({count: data.count});
        break;

        // case 'healthCount':
        //   console.log(data)
        //   console.log(this.state.posts)
        // break;

        case 'incomingTopic':
          this.setState({topic: data.topic});
        break;

        case 'incomingHealth':
          const arrayOfNewObjects = this.state.posts.map((post) => {
            if (post.id === data.id) {
              post.health = data.health;
            }
            return post;
          })
          this.setState({posts: arrayOfNewObjects});
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
          updateHealthOnClick={this.updateHealthOnClick} 
        />
      </div>
    );
  }
}

export default App;
