"use strict";
const Player = require("./Player.js");

module.exports = class World {
  constructor() {
    this.allPlayersMap = new Map();
  }

  getAllPlayers() {
    //Functie om alle spelers op te halen. Wordt gebruikt in server.js functie app.get('/getPlayers')
    return Array.from(this.allPlayersMap);
  }

  addPlayer(name) {

    //Nieuwe speler wordt toegevoegd. Naam wordt doorgegeven vanuit server.js functie app.get('/setPlayer/:name')
    //Positie wordt bepaald obv functie initPosition. Deze geeft een object met x en y positie terug
    const playerPosition = this.initPosition();
    //Nieuwe speler maken obv de klasse Player - x en y positie worden ook opgeslagen 
    //in de spelersklasse om gemakkelijk op te kunnen zoeken
    const player = new Player(name,playerPosition.xPos,playerPosition.yPos); 
    this.allPlayersMap.set(this.makeKey(playerPosition.xPos,playerPosition.yPos), player);
    return player;
  }
  
  initPosition() {
    
    let positionExists = true;
    let xPos;
    let yPos;

    //Aparte arrays maken om x en y positie later in op te slaan
    //Dit laat toe om achteraf apart voor x en y vb. de mediaan te berekenen
    let xArr = [];
    let yArr = [];

    this.allPlayersMap.forEach(function (val) {
      xArr.push(val.xPos);
      yArr.push(val.yPos);
    })

    let xBase = this.median(xArr);
    let yBase = this.median(yArr);

    //let xBase = this.average(xArr);
    //let yBase = this.average(yArr);

    while (positionExists) {
  
      xPos = ~~this.getRndInteger(xBase, xBase + 100);
      yPos = ~~this.getRndInteger(yBase, yBase + 100);

      let currentKey = this.makeKey(xPos, yPos);

      if (this.allPlayersMap.has(currentKey)) {
        positionExists = true;
      } else {
        positionExists = false;
      }

    }

    //Object teruggeven met x en y positie als resultaat van de functie
    return {'xPos':xPos, 'yPos':yPos};
  }

  movePlayer(xFrom,yFrom,xTo,yTo) {
    
    let posFrom = this.makeKey(xFrom, yFrom);
    let posTo = this.makeKey(xTo, yTo);

    if (!this.allPlayersMap.has(posFrom)) {
      //Player bestaat niet
      return 'no player';
    }

    if (this.allPlayersMap.has(posTo)) {
      //vechten
      return 'fight';
    } else {
      let player = this.allPlayersMap.get(posFrom);
      player.xPos = xTo;
      player.yPos = yTo;
      this.allPlayersMap.set(posTo, player);
      this.allPlayersMap.delete(posFrom);

      return 'success';
    }

  }

  makeKey(x, y) {
    return `${x}|${y}`;
  }

  median(numbers) {

    let median = 0;
    let count = numbers.length;

    numbers.sort(function (a, b) {
      return a - b
    });

    if (count % 2 === 0) { // even
      median = numbers[count / 2];
    } else { // oneven
      median = numbers[(count - 1) / 2];
    }

    if (median === undefined) {
      median = 1;
    }

    return median;

  }

  average(numbers) {

     const reducer = (accumulator, currentValue) => accumulator + currentValue;
     let average;

     if (numbers.length !== 0) {
       average = numbers.reduce(reducer) / numbers.length;
     } else {
       average = 1;
     }

     return average;

   }


  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //TO DO logica init position, functie als speler beweegt, functie als 2 spelers op zelfde vakje komen (rekening houden maximum 2 spelers, anders melding)
};
