"use strict";
module.exports = class Player {
  constructor(namePlayer, x, y) {
    this.posX = x;
    this.posY = y;
    this.name = namePlayer;
  }

  get x() {
    return this.posX;
  }
  get y() {
    return this.posY;
  }
  get name() {
    return this.name;
  }
};
