'use strict';

class GameLayer {
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

    this.bird = new Bird(this.Game, this.ctx);
    this.backgroundScroll = new BackgroundScroll(this.Game, this.ctx);
    this.pipe = new Pipe(this.Game, this.ctx);

    this.bird.init();
    this.backgroundScroll.init();
    this.pipe.init();

  }

  createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.zIndex = '5';
    return canvas;
  }

}