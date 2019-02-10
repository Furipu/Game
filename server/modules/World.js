"use strict";
module.exports = class World {
  constructor() {
    this.allPlayersMap = new Map();
    this.allPlayers = [];
    this.startX = 0;
    this.startY = 0;
    this.positionExists = true;
    this.player = {};
    this.keyPosition = "";
  }

  getAllPlayers() {
    //Functie om alle spelers op te halen. Wordt gebruikt in server.js functie app.get('/getPlayers')
    return Array.from(this.allPlayersMap);
  }

  addPlayer(name) {
    this.keyPosition = this.initPosition();
    this.player = { name: this.name, x: this.startX, y: this.startY };
    this.allPlayers.push(this.player);
    //Nieuwe speler wordt toegevoegd. Naam wordt doorgegeven vanuit server.js functie app.get('/setPlayer/:name')
    //Positie wordt bepaald obv functie initPosition (nog verder uit te werken functie)
    this.allPlayersMap.set(this.keyPosition, name);
  }

  initPosition() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    this.positionExists = true;
    let xAverage;
    let yAverage;

    //Array maken van de map
    let arr = Array.from(this.allPlayersMap);
    //Aparte arrays maken om x en y positie later in op te slaan
    //Dit laat toe om achteraf apart voor x en y vb. de mediaan te berekenen
    let xArr = [];
    let yArr = [];

    //Voor elke reeds bestaande speler
    for (let i = 0; i < arr.length; i++) {
      //key ophalen en splitten naar x en y positie -> dus vb '1|2' wordt hier ['1','2']
      let key = arr[i][0].split("|");

      //x en y positie apart ophalen uit key en converteren naar nummer
      let xPos = Number(key[0]);
      let yPos = Number(key[1]);

      //aparte arrays voor x en y aanvullen
      xArr.push(xPos);
      yArr.push(yPos);
    }

    if (xArr.length !== 0) {
      this.xAverage = xArr.reduce(reducer) / xArr.length;
    } else {
      this.xAverage = 1;
    }
    if (yArr.length !== 0) {
      this.yAverage = yArr.reduce(reducer) / yArr.length;
    } else {
      this.yAverage = 1;
    }

    while (this.positionExists) {
      this.startX = ~~this.getRndInteger(this.xAverage, this.xAverage + 100);
      this.startY = ~~this.getRndInteger(this.yAverage, this.yAverage + 100);

      let currentKey = this.makeKey(this.startx, this.startY);

      if (currentKey in this.allPlayersMap) {
        this.positionExists = true;
      } else {
        this.positionExists = false;
      }
    }

    //Hier zouden we dan een functie kunnen aanroepen om de mediaan van x en y te berekenen
    //Voorlopig gewoon de lengte van de array genomen + een getal om te testen
    return this.makeKey(this.startX, this.startY);
  }
  movePlayer(name, positionX, positionY) {
    let currentPosition = `${positionX}|${positionY}`;
    if (currentPosition in this.allPlayers) {
      //vechten
    } else {
      this.getAllPlayers();
    }
  }

  makeKey(x, y) {
    return `${x}|${y}`;
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //TO DO logica init position, functie als speler beweegt, functie als 2 spelers op zelfde vakje komen (rekening houden maximum 2 spelers, anders melding)
};
