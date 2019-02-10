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
  world.addPlayer(req.params.name);
  res.send({ antwoord: `${req.params.name} added to world` });
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
