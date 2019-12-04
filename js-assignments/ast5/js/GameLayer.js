'use strict';

class GameLayer {
  constructor(game) {
    this.game = game;
    this.parentElement = this.game.element;
    this.width = this.game.width;
    this.height = this.game.height;
    this.init();
  }

  init() {
    this.canvas = this.createCanvas();
    this.parentElement.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.bird = new Bird(this.game, this.ctx);
    this.backgroundScroll = new BackgroundScroll(this.game, this.ctx);
    this.pipe = new Pipe(this.game, this.ctx);
  }

  createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.zIndex = '5';
    return canvas;
  }

}