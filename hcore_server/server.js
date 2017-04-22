const WebSocket = require('ws');
const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('node-uuid');
const Sentencer = require('sentencer');


// Set the port to 3001
const PORT = 3001;

const sentence = Sentencer.make("{{ an_adjective }} {{ noun }}");

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

let healthCount = {
  health: wss.clients.size + 2,
  type: "healthCount"
}

let clientcount = {
  count: wss.clients.size,
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
  clientcount.count = wss.clients.size;
  wss.broadcast(JSON.stringify(clientcount));
  wss.broadcast(JSON.stringify(healthCount));
  wss.broadcast(JSON.stringify(topicMessage));
  ws.on('message', (data) => {
    let post = JSON.parse(data);
    let id = uuidV1();
    switch(post.type) {
    
    case 'postMessage':
      let outputPost = {
        type: 'incomingMessage',
        id: id,
        content: post.content,
      }
      wss.broadcast(JSON.stringify(outputPost));
    break;

    case 'postHealth':
      let outputHealth = {
        type: 'incomingHealth',
        health: post.health
      }
      wss.broadcast(JSON.stringify(outputHealth));
    break;

    default:
      throw new Error("Unknown event type" + post.type);
    }
    
  });

    ws.on('close', () => {
    clientcount.count = wss.clients.size;
    wss.broadcast(JSON.stringify(clientcount));
  });

});

