const WebSocket = require('ws');
const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('node-uuid');
const randomPrompt = require('./random-prompt.js');
let listOfUsers = []; // A list of all the users
// Set the port to 3001
const PORT = 3001;

const sentence = randomPrompt();

// Create a new express server
const server = express();
   // Make the express server serve static assets (html, javascript, css) from the /public folder
server.set("view engine", "ejs");

server.use(express.static('public'));
server.get('/', function(req, res){
  res.render("index", {development: process.env.NODE_ENV !== "production"});
});
server.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


function generateUserName() {
  let first = ['Gli', 'Shla', 'Gla', 'Blo', 'La', 'Flo', 'Ju', 'Plu'];
  let last = ['nkus', 'mbus', 'rbonzo', 'mbo', 'nkey', 'ngus', 'ster'];
  let firstRandom = Math.floor(Math.random() * (7));
  let lastRandom = Math.floor(Math.random() * (6));
  let newUser = first[firstRandom] + last[lastRandom];
  return setUserName(newUser);
}

function setUserName(newUser) {
  if (listOfUsers.length == 0) {
    return newUser;
  }
  if (listOfUsers.includes(newUser)) {
    return generateUserName();
  } else {
    return newUser;
  }
}

let num = 0;

function randPic() {

  let img = "../images/user_icons/" + num + ".png";
  if (num < 9){
  num++;
  return (img);
 } else {
  num = 0;
  return (img);
 }
}

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

let clientCount = {
  count: 0,
  type: "clientCount"
}

let topicMessage = {
  topic: sentence,
  type: "incomingTopic"
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  let clientName = generateUserName();
  let picRoute = randPic();
  listOfUsers.push(clientName);
  clientCount.count = wss.clients.size;

  // broadcasting client Count which also determines newRoundCounter
  wss.broadcast(JSON.stringify(clientCount));
  wss.broadcast(JSON.stringify(topicMessage));

  ws.on('message', (data) => {
    let post = JSON.parse(data);
    let id = uuidV1();

    switch(post.type) {
      case 'incomingUser':
        let outputUser = {
          type: 'outgoingUser',
          content: {
            userName: clientName,
            pic: picRoute
          }
        }
        wss.broadcast(JSON.stringify(outputUser));
      break;

      case 'postMessage':
        let outputPost = {
          type: 'incomingMessage',
          content: {
            id: id,
            post: post.content,
            health: wss.clients.size - 1,
            maxHealth: wss.clients.size - 1,
            name: clientName,
            malaiseID: id,
            malaise: 1,
            pic: picRoute,
            // newRoundClick: 1
          }
        }
        wss.broadcast(JSON.stringify(outputPost));
      break;

      case 'postHealth':
        let outputHealth = {
          type: 'incomingHealth',
          health: post.health,
          id: post.id
        }
        wss.broadcast(JSON.stringify(outputHealth));
      break;

      case 'postRoundCount':
        let outputRoundCount = {
          type: 'incomingRoundCount',
          value: post.value
        }
        wss.broadcast(JSON.stringify(outputRoundCount));
      break;

      case 'postRoundReady':
        let outputRoundReady = {
          type: 'incomingRoundReady',
          ready: true
        }
        wss.broadcast(JSON.stringify(outputRoundReady));
      break;

      case 'postResetGame':
        let outputResetGame = {
          type: 'incomingResetGame',
          posts: [],
          newRoundCount: clientCount.count
        }
        wss.broadcast(JSON.stringify(outputResetGame));
      break;

      case 'postNewTopic':
        let outputNewTopic = {
          topic: randomPrompt(),
          type: "incomingNewTopic"
        }
        wss.broadcast(JSON.stringify(outputNewTopic));
      break;

      case 'postEmptyPost':
        let outputEmptyPost = {
          type: 'incomingMessage',
          content: {
            id: id,
            post: "",
            health: 0,
            maxHealth: wss.clients.size - 1,
            name: clientName,
            malaiseID: id,
            malaise: 1,
            pic: picRoute,
            newRoundClick: 1
          }
        }
        wss.broadcast(JSON.stringify(outputEmptyPost));
      break;

      default:
        throw new Error("Unknown event type" + post.type);
      }
    });

    ws.on('close', () => {
    clientCount.count = wss.clients.size;
    wss.broadcast(JSON.stringify(clientCount));
    if (clientCount.count === 0) {
      listOfUsers = [];
    }
  });

});

