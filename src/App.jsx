import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Welcome from './Welcome.jsx';
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
      },
      currentUser: 'Anonymous',
      timeUp: false
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

checkTimer = () => {
    this.setState({timeUp: true});
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
          console.log(this.state.currentUser);

          this.setState({currentUser: data.content.name})
          this.setState({currentUserMalaise: {
            id: data.content.malaiseID,
            malaise: data.content.malaise
          }});
          const posts = this.state.posts.concat(postObj);
          console.log('posts: ', posts);
          this.setState({posts: posts});
        break;

        // case 'clientName':
        //   this.setState({currentUser: data.name});
        // break;

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
    
    if(this.state.count >= 3 && this.state.timeUp){

    return (
      <div>
        <Nav topic={this.state.topic} count={this.state.count} username= {this.state.currentUser} currentUserMalaise={this.state.currentUserMalaise}/>
       
        <Postlist posts={this.state.posts}
          updateHealthOnClick={this.updateHealthOnClick}
          currentUserMalaise={this.state.currentUserMalaise}

        />
        <Timer checkTimer={this.checkTimer}/>
      </div>
    );
  } else if (this.state.count >= 3 && !this.state.timeUp){

      return (
      <div>
        <Nav topic={this.state.topic} count={this.state.count} username= {this.state.currentUser} currentUserMalaise={this.state.currentUserMalaise}/>
        <Postform updateMessageOnClick={this.updateMessageOnClick} currentUserName={this.state.currentUser}/>
        
        <Timer checkTimer={this.checkTimer}/>
      </div>
    );
  } else {
    
    return (
    <div>
      <Welcome count={this.state.count} username= {this.state.currentUser}/>
      </div>
    );
  }
  }
}

export default App;
