import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Welcome from './Welcome.jsx';
import Postform from './Postform.jsx';
import Postlist from './Postlist.jsx';
import Timer from './Timer.jsx';
import RoundTimer from './RoundTimer.jsx';
import Results from './Results.jsx';

const randomPrompt = require('../hcore_server/random-prompt.js');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstTimeUser: true,
      posts: [],
      listOfUsers: [], // List for all active users for future feature
      count: 0,
      topic: '',
      currentUserMalaise: {
        id: 0,
        malaise: 0
      },
      currentUser: 'Anonymous',
      timeUp: false,
      roundTimeUp: false,
      userName: '',
      currentWinner: "",
      currentLoser: ""
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

  checkRoundTimer = () => {
    this.setState({roundTimeUp: true});
  }

  compareNumbers = (a, b) => {
    return a - b;
  }

  determineScore = () => {
      let sortedposts = this.state.posts;
      sortedposts.sort((a, b) => {

        var diff = this.compareNumbers(a.health, b.health);
        console.log(diff);
        if (diff > 0){
          return -1;
        }else if (diff < 0){
          return 1;
        }else {
          return 0;
        }
      });
      console.log(sortedposts);
      console.log(sortedposts[0]);
      this.setState({currentWinner: sortedposts[0].name});
      this.setState({currentLoser: sortedposts[sortedposts.length-1].name});
  }

  newRoundStart = () => {
    this.setState({timeUp: false});
    this.setState({roundTimeUp: false});
    let sentence = randomPrompt();
    this.setState({topic: sentence});
  }

  componentDidMount = () => {
    console.log('componentDidMount <App />');
    this.socket = new WebSocket('ws://0.0.0.0:3001');
    this.socket.onopen = () => {
      console.log('is connected');
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
        case 'outgoingUser':
          if (this.state.firstTimeUser) {
            this.setState({firstTimeUser: false, userName: data.content.userName});
          }
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
    console.log("your username is: ", this.state.userName);
    //Start state: enough users online, stage for users to enter their post, and the time is not yet up
    if(this.state.count >= 3 && !this.state.timeUp){
      return (
        <div>
          <Nav topic={this.state.topic} count={this.state.count} username= {this.state.userName} currentUserMalaise={this.state.currentUserMalaise}/>
          <Postform updateMessageOnClick={this.updateMessageOnClick} currentUserName={this.state.userName}/>
          <Timer checkTimer={this.checkTimer}/>
        </div>
      );

    //Results state: results of the round
    } else if (this.state.count >= 3 && this.state.timeUp && this.state.roundTimeUp) {
      return (
        <div>
          <Nav topic={this.state.topic} count={this.state.count} username= {this.state.userName} currentUserMalaise={this.state.currentUserMalaise}/>
          <Results newRoundStart={this.newRoundStart} currentWinner={this.state.currentWinner} currentLoser={this.state.currentLoser}/>
        </div>
      );
    //Voting state: post entering time is up, all posts in view, users can vote on posts
    } else if (this.state.count >= 3 && this.state.timeUp){
      return (
        <div>
          <Nav topic={this.state.topic} count={this.state.count} username= {this.state.userName} currentUserMalaise={this.state.currentUserMalaise}/>

          <Postlist posts={this.state.posts}
            updateHealthOnClick={this.updateHealthOnClick}
            currentUserMalaise={this.state.currentUserMalaise}
          />
          <RoundTimer checkRoundTimer={this.checkRoundTimer} determineScore={this.determineScore}/>
        </div>
      );
    //Inqueue state: not enough users yet online
    }else {
    return (
      <div>
        <Welcome count={this.state.count} username= {this.state.userName}/>
        </div>
      );
    }

  }
}

export default App;
