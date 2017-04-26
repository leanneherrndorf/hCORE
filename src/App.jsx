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
      timeUp: false,
      roundTimeUp: false,
      userName: '',
      pic: '',
      currentWinner: "",
      currentLoser: "",
      newRoundCounter: 0,
      roundReady: false
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
    let users = [];
    const arrayOfNewObjects = this.state.posts.map((post) => {
      users.push(post.name);
    });
    if(users.includes(this.state.userName)){
      console.log("here");
    }else{
      //send request to server to generate empty post
      const emptyPost = {type: 'postEmptyPost'}
      this.socket.send(JSON.stringify(emptyPost));
    }

    this.setState({timeUp: true});
    this.setState({roundReady: false});
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

      if (diff > 0) {
        return -1;
        this.setState({currentWinner: sortedposts[0].name});
        this.setState({currentLoser: sortedposts[sortedposts.length-1].name});
      } else if (diff < 0) {
        return 1;
        this.setState({currentWinner: sortedposts[0].name});
        this.setState({currentLoser: sortedposts[sortedposts.length-1].name});
      } else {
        //return 0;
        this.setState({currentWinner: "It's a tie!"});
        this.setState({currentLoser: "It's a tie!"});
      }
    });
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
            malaise: data.content.malaise,
            pic: data.content.pic
          }
          this.setState({currentUser: data.content.name})
          this.setState({currentUserMalaise: {
            id: data.content.malaiseID,
            malaise: data.content.malaise,
          }});
          const posts = this.state.posts.concat(postObj);
          this.setState({posts: posts});
        break;
        case 'outgoingUser':
          if (this.state.firstTimeUser) {
            this.setState({firstTimeUser: false, userName: data.content.userName, pic: data.content.pic});
          }
          console.log("pic:", this.state.pic);
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
    console.log("your username is: ", this.state.userName);
    // Start state: enough users online, stage for users to enter their post, and the time is not yet up
    if(!this.state.timeUp && this.state.roundReady){
      return (
        <div>
          <Nav topic={this.state.topic} count={this.state.count} pic={this.state.pic} username={this.state.userName} currentUserMalaise={this.state.currentUserMalaise}/>
          <Postform updateMessageOnClick={this.updateMessageOnClick} currentUserName={this.state.userName}/>
          <Timer checkTimer={this.checkTimer}/>
        </div>
      );

    // Results state: results of the round
    } else if (this.state.timeUp && this.state.roundTimeUp) {
      return (
        <div>
          <Nav topic={this.state.topic} count={this.state.count} pic={this.state.pic} username={this.state.userName} currentUserMalaise={this.state.currentUserMalaise}/>
          <Results
          clearPosts={this.clearPosts}
          newRoundStart={this.newRoundStart}
          currentWinner={this.state.currentWinner}
          currentLoser={this.state.currentLoser}
          newRoundCounter={this.state.newRoundCounter}
          updateNewRoundCount={this.updateNewRoundCount}/>
        </div>
      );
    // Voting state: post entering time is up, all posts in view, users can vote on posts
    } else if (this.state.timeUp){
      return (
        <div>
          <Nav topic={this.state.topic} count={this.state.count} pic={this.state.pic} username={this.state.userName} currentUserMalaise={this.state.currentUserMalaise}/>

          <Postlist posts={this.state.posts}
            updateHealthOnClick={this.updateHealthOnClick}
            currentUserMalaise={this.state.currentUserMalaise}
            userName={this.state.userName}
          />
          <RoundTimer checkRoundTimer={this.checkRoundTimer} determineScore={this.determineScore}/>
        </div>
      );
    // In queue state: not enough users yet online
    }else {
    return (
      <div>
        <Welcome
          pic={this.state.pic}
          count={this.state.count}
          username={this.state.userName}
          clearPosts={this.clearPosts}
          newRoundStart={this.newRoundStart}
          newRoundCounter={this.state.newRoundCounter}
          updateNewRoundCount={this.updateNewRoundCount}/>
      </div>
      );
    }
  }
}

export default App;
