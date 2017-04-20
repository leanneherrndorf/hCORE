import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Postform from './Postform.jsx';
import Postlist from './Postlist.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
  }

updateMessageOnEnter = (event) => {
      if(event.key === 'Enter'){
        const newMessage = {type: 'postMessage', content: event.target.value};
        this.socket.send(JSON.stringify(newMessage));
        event.target.value = '';
      }
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
        const messages = this.state.posts.concat(data);

        switch(data.type) {
      case 'incomingMessage':
        const messages = this.state.posts.concat(data);
        console.log('messages:', messages);
        this.setState({messages: messages});
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
        <Nav/>
        <Postform updateMessageOnEnter={this.updateMessageOnEnter}/>
        <Postlist posts={this.state.posts}/>
      </div>
    );
  }
}
export default App;
