import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Welcome from './Welcome.jsx';
import Postform from './Postform.jsx';
import Postlist from './Postlist.jsx';
import Timer from './Timer.jsx';
import RoundTimer from './RoundTimer.jsx';
import Results from './Results.jsx';
import Foot from './Foot.jsx';
import FormFoot from './FormFoot.jsx';

const randomPrompt = require('../../server/random-prompt.js');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTimeUser: true,
      posts: [],
      listOfUsers: [],
      count: 0,
      topic: '',
      malaisePoints: 0,
      timeUp: false,
      roundTimeUp: false,
      userName: '',
      pic: '',
      newRoundCounter: 0,
      roundReady: false
    }
  }

  updateUserName = (event) => {

      this.setState({firstTimeUser: true});
      let newName = event.target.value;

      if (newName.length > 12){
        this.socket.send(JSON.stringify({type: 'incomingNameChange', name: 'Dingus'}));
      } else if (newName.toLowerCase() === 'leanne' || newName.toLowerCase() === 'brendan'){
        this.socket.send(JSON.stringify({type: 'incomingNameChange', name: 'Nerd'}));
      } else if (newName === '') {
        this.socket.send(JSON.stringify({type: 'incomingNameChange', name: this.state.userName}));
      } else {
        this.socket.send(JSON.stringify({type: 'incomingNameChange', name: newName}));
      }
  }

  updateUserMalaiseOnClick = () => {
    const newMalaise = this.state.malaisePoints - 1;
    this.setState({malaisePoints: newMalaise});
    console.log('current user malaise:', this.state.malaisePoints);
  }

  updateUserMalaiseOnPraise = () => {
    const increaseMalaise = this.state.malaisePoints + 1;
    this.setState({malaisePoints: increaseMalaise});
    console.log('current user malaise:', this.state.malaisePoints);
  }

  updateHealthOnClick = (health, id) => {
    const newHealth = {type: 'postHealth', health: health, id: id}
    this.socket.send(JSON.stringify(newHealth));
    this.updateUserMalaiseOnClick();
  }

  updateMessageOnClick = (input) => {
    const newMessage = {type: 'postMessage', userName:this.state.userName, content: input};
    this.socket.send(JSON.stringify(newMessage));
    this.setState({malaisePoints: 1});
  }

  checkTimer = () => {
    let users = [];
    const arrayOfNewObjects = this.state.posts.map((post) => {
      users.push(post.name);
    });
    if(users.includes(this.state.userName)){
      //console.log(here);
    } else {
      const emptyPost = {type: 'postEmptyPost', userName: this.state.userName}
      this.socket.send(JSON.stringify(emptyPost));
    }

    this.setState({timeUp: true});
    this.setState({roundReady: false});
  }

  checkRoundTimer = () => {
    this.setState({roundTimeUp: true});
  }

  newRoundStart = () => {
    this.socket.send(JSON.stringify({type: 'postRoundReady'}));
    this.socket.send(JSON.stringify({type: 'postNewTopic'}));
  }

  clearPosts = () => {
    this.socket.send(JSON.stringify({type: 'postResetGame'}));
  }

  updateNewRoundCount = () => {
    let subtractOne = this.state.newRoundCounter - 1;
    const newRoundCountValue = {
      type: 'postRoundCount',
      value: subtractOne
    }
    this.socket.send(JSON.stringify(newRoundCountValue)); // broadcast change
  }

  componentDidMount = () => {
    this.socket = new WebSocket('ws://'+ location.host);
    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({type: 'incomingUser'}))
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
            pic: data.content.pic,
            eulogy: data.content.eulogy
          }
          const posts = this.state.posts.concat(postObj);
          this.setState({currentUser: data.content.name})
          this.setState({posts: posts});
        break;
        case 'outgoingUser':
          if (this.state.firstTimeUser) {
            this.setState({firstTimeUser: false, userName: data.content.userName, pic: data.content.pic});
          }
        break;

        case 'outgoingNameChange':
          if (this.state.firstTimeUser) {
            this.setState({firstTimeUser: false, userName: data.content.userName});
          }
        break;

        case 'clientCount':
          this.setState({count: data.count});
          this.setState({newRoundCounter: data.count});
        break;

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

        case 'incomingRoundCount':
          this.setState({newRoundCounter: data.value});
        break;

        case 'incomingRoundReady':
          let sentence = randomPrompt();
          this.setState({timeUp: false});
          this.setState({roundTimeUp: false});
          this.setState({roundReady: data.ready});
          this.setState({newRoundCounter: 0});
        break;

        case 'incomingResetGame':
          this.setState({posts: data.posts});
          this.setState({newRoundCounter: data.newRoundCount});
        break;

        case 'incomingNewTopic':
          this.setState({topic: data.topic});
        break;

        default:
        // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }
    }
  }

  render() {

    // Start state: enough users online, stage for users to enter their post, and the time is not yet up
    if(!this.state.timeUp && this.state.roundReady) {
      return (
        <div>
          <Nav/>
          <Postform updateMessageOnClick={this.updateMessageOnClick} currentUserName={this.state.userName}/>
          <Timer checkTimer={this.checkTimer} posts={this.state.posts}/>
          <FormFoot 
            topic={this.state.topic} 
          />
        </div>
      );
    // Results state: results of the round
    } else if (this.state.timeUp && this.state.roundTimeUp) {
      return (
        <div>
          <Nav/>
          <Results
            clearPosts={this.clearPosts}
            newRoundStart={this.newRoundStart}
            posts={this.state.posts}
            newRoundCounter={this.state.newRoundCounter}
            updateNewRoundCount={this.updateNewRoundCount}
          />
          <Foot 
            topic={this.state.topic} 
            count={this.state.count} 
            pic={this.state.pic} 
            username={this.state.userName} 
            malaisePoints={this.state.malaisePoints}
          />
        </div>
      );
    // Voting state: post entering time is up, all posts in view, users can vote on posts
    } else if (this.state.timeUp){
      return (
        <div>
          <Nav/>
          <RoundTimer checkRoundTimer={this.checkRoundTimer} determineScore={this.determineScore}/>
          <Postlist
            posts={this.state.posts}
            updateHealthOnClick={this.updateHealthOnClick}
            updateUserMalaiseOnPraise={this.updateUserMalaiseOnPraise}
            malaisePoints={this.state.malaisePoints}
            userName={this.state.userName}
          />
          <Foot 
            topic={this.state.topic} 
            count={this.state.count} 
            pic={this.state.pic} 
            username={this.state.userName} 
            malaisePoints={this.state.malaisePoints}
          />
        </div>
      );
    // In queue state: not enough users yet online
    } else {
    return (
      <div>
        <Welcome
          pic={this.state.pic}
          count={this.state.count}
          username={this.state.userName}
          clearPosts={this.clearPosts}
          newRoundStart={this.newRoundStart}
          newRoundCounter={this.state.newRoundCounter}
          updateNewRoundCount={this.updateNewRoundCount}
          updateUserName={this.updateUserName}
        />
      </div>
      );
    } console.log("post length:", this.state.posts.length);
  }
}

export default App;
