import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Postform from './Postform.jsx';
import Postlist from './Postlist.jsx';
import Timer from './Timer.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      listOfUsers: [], // List for all active users for future feature
      count: 0,
      topic: '',
      currentUserMalaise: {
        id: 0,
        malaise: 0
      }
    }
  }


  updateUserMalaiseOnClick = () => {
    const newMalaise = this.state.currentUserMalaise.malaise - 1;
    this.setState({currentUserMalaise: {malaise: newMalaise}});
    console.log('current user malaise:', this.state.currentUserMalaise.malaise);
  }


  updateHealthOnClick = (health, id) => {
    const newHealth = {type: 'postHealth', health: health, id: id}
    this.socket.send(JSON.stringify(newHealth));
    this.updateUserMalaiseOnClick();
  }

  updateMessageOnClick = (input) => {
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
      const data = JSON.parse(event.data);

      switch(data.type) {
        case 'incomingMessage':
          const postObj = {
            id: data.content.id,
            post: data.content.post,
            health: data.content.health,
            name: data.content.name,
            maxHealth: data.content.maxHealth,
            malaiseID: data.content.malaiseID,
            malaise: data.content.malaise
          }

          this.setState({currentUserMalaise: {
            id: data.content.malaiseID,
            malaise: data.content.malaise
          }});
          const posts = this.state.posts.concat(postObj);
          console.log('posts: ', posts);
          this.setState({posts: posts});
        break;

        case 'clientCount':
          this.setState({count: data.count});
        break;

        case 'incomingTopic':
          this.setState({topic: data.topic});
        break;

        case 'incomingHealth':
          const arrayOfNewObjects = this.state.posts.map((post) => {
            if (post.id === data.id) {
              post.health = data.health;
            }
            // if (post.id === data.id && post.id === this.state.currentUserMalaise.malaise) {
            //   let newMalaise = this.state.currentUserMalaise.malaise + 1;
            //   console.log('this.state.currentUserMalaise.id: ', this.state.currentUserMalaise.id);
            //   this.setState({currentUserMalaise: {malaise: newMalaise}});
            // }
            return post;
          })
          // console.log('newMalaisePoints', newMalaisePoints);
          this.setState({posts: arrayOfNewObjects});
          console.log('current posts', this.state.posts);
          // this.setState({currentUserMalaise: newMalaisePoints});
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
        <Nav topic={this.state.topic} count={this.state.count} currentUserMalaise={this.state.currentUserMalaise}/>
        <Postform updateMessageOnClick={this.updateMessageOnClick}/>
        <Postlist posts={this.state.posts}
          updateHealthOnClick={this.updateHealthOnClick} 
          currentUserMalaise={this.state.currentUserMalaise}
        />
        <Timer/>
      </div>
    );
  }
}

export default App;
