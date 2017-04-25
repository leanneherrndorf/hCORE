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
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

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

function randPic() {
  let randNum = Math.floor(Math.random() * (10));
  return ("../images/user_icons/" + randNum + ".png");
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
        console.log('outgoingUsre: ', outputUser);
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
          }
        }
        wss.broadcast(JSON.stringify(outputPost));
        console.log(outputPost);
      break;

      case 'postHealth':
        let outputHealth = {
          type: 'incomingHealth',
          health: post.health,
          id: post.id
        }
        wss.broadcast(JSON.stringify(outputHealth));
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

