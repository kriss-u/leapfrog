'use strict';

class Background {
  constructor(Game) {
    this.Game = Game;
    this.parentElement = this.Game.element;
    this.width = this.Game.width;
    this.height = this.Game.height;
    this.init();
  }

  init() {
    this.canvas = this.createCanvas();
    this.parentElement.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.draw();
  }

  createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.zIndex = '-1';
    return canvas;
  }

  draw() {
    const backgroundImage = new Image();
    backgroundImage.onload = () => {
      this.ctx.drawImage(backgroundImage, 0, 0, this.width, this.height);
    }
    backgroundImage.src = '../images/background.png';
  }
}
