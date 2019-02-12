"use strict";
const meta = require("versiony");
const express = require("express");
const cors = require("cors");
const app = express();
const frontport = 5656;
const World = require("./modules/World.js");
let world = new World();

app.get("/getPlayers", cors(), function(req, res) {
  res.send({
    players: world.getAllPlayers()
  });
});


app.get("/setPlayer/:name", cors(), function(req, res) {
  let player = world.addPlayer(req.params.name);
  res.send({ antwoord: ` ${player.name} added to world at position x:${player.xPos}, y:${player.yPos}` });
});

app.get("/movePlayer/:xFrom/:yFrom/:xTo/:yTo", cors(), function (req, res) {
  let message;
  let result = world.movePlayer(
    Number(req.params.xFrom), 
    Number(req.params.yFrom),
    Number(req.params.xTo),
    Number(req.params.yTo)
  );
  switch (result) {
    case 'success':
      message = `Player moved from ${req.params.xFrom}|${req.params.yFrom} to ${req.params.xTo}|${req.params.yTo}`;
      break;
    case 'fight':
      message = `You gotta fight for your right`;
      break;
    case 'no player':
      message = `No player at this position`;
      break;
    default:
      message = `Move failed`;
  }
  
  res.send({
    antwoord: message
  });
});

app.listen(frontport, () => {
  console.log(`\r\nNODE ::: I started my backend on port ${frontport}.\r\n`);
});

/**
 * META versioning
 */
meta.from("package.json");
var pre = meta.model.version.preRelease;
meta.preRelease();
meta.to();

//==============================================
//
// const WebSocket = require('ws');
//
// const ws = new WebSocket.Server({ port: 2345 });
//
// ws.on('connection', function connection(ws) {
//     ws.on('message', function incoming(message) {
//         console.log('received: %s', message);
//     });
//
//     ws.send('something');
// });
