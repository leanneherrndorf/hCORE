"use strict";

require('dotenv').config();

//mongo setup
const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://hcore:hcoremanatee@ds127531.mlab.com:27531/hcore";

mongoose.Promise = global.Promise;
//MongoClient.connect
mongoose.connect(MONGODB_URI);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  //Express and websocket setup
  const PORT = process.env.PORT || 3001;
  const WebSocket = require('ws');
  const express = require('express');
  const uuidV1 = require('node-uuid');
  const randomPrompt = require('./random-prompt.js');
  const randomEulogy = require('./random-eulogy.js');
  const http = require('http');
  const url = require('url');
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });
  const sentence = randomPrompt();
  const bodyParser = require("body-parser");


  app.set("view engine", "ejs");

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('public'));

  //defining a schema
  let Schema = mongoose.Schema;

  let ArchiveSchema = new Schema({
    name: String,
    topic: String,
    content: String,
    created_at: Date
  });

  let ArchiveModel = mongoose.model('ArchiveModel', ArchiveSchema);

  let archiveArray = [];

  ArchiveModel.find().sort({created_at: -1}).exec(function(err, result) {
    if (err) {
      console.log(err);
    } else if (result.length) {
      archiveArray.push(result);
    }
  });

  //routes
  app.get('/', function(req, res){
    res.render("index", {development: process.env.NODE_ENV !== "production"});
  });

  app.get('/archive', function(req, res){
    let templateVars = {archivedPosts: archiveArray};
    res.render('archive', templateVars);
  });

  // A list of all the users
  let listOfUsers = [];

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
    if (num < 9) {
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


  wss.on('connection', (ws) => {
    const location = url.parse(ws.upgradeReq.url, true);

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

        case 'incomingNameChange':
          let outputNameChange = {
            type: 'outgoingNameChange',
            content: {
              userName: post.name,
              pic: picRoute
            }
          }
          wss.broadcast(JSON.stringify(outputNameChange));
        break;

        case 'postMessage':
          let outputPost = {
            type: 'incomingMessage',
            content: {
              id: id,
              post: post.content,
              health: wss.clients.size - 1,
              maxHealth: wss.clients.size - 1,
              name: post.userName,
              pic: picRoute,
              eulogy: randomEulogy()
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
            currentWinner: {},
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
              name: post.userName,
              pic: picRoute
              //newRoundClick: 1
            }
          }
          wss.broadcast(JSON.stringify(outputEmptyPost));
        break;

        case 'postArchivePost':
          let newArchivedPost = new ArchiveModel({
            name: post.archivePost.name,
            topic: post.topic,
            content: post.archivePost.post,
            created_at: Date.now()
          });

          if (post.currentUser === post.archivePost.name && post.archivePost.post !== '' && post.archivePost.maxHealth !== 0) {
            newArchivedPost.save(function(err) {
              if(err) throw err;
              console.log('Test saved successfully!');
            });
          } else {
            return;
          }
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



server.listen(PORT, () => console.log(`Listening on ${ PORT }`));
