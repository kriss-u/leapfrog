'use strict';

class Background {
  constructor(game) {
    this.game = game;
    this.parentElement = this.game.element;
    this.x = 0;
    this.y = -BACKGROUND_SCROLL_OFFSET;
    this.width = this.game.width;
    this.height = this.game.height;
    this.init();
  }

  init() {
    this.canvas = this.createCanvas();
    this.parentElement.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
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
      this.ctx.drawImage(backgroundImage, this.x, this.y, this.width, this.height);
    }
    backgroundImage.src = 'images/background.png';
  }
}
