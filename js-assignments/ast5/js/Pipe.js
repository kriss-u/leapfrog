'use strict';

class Pipe {
  constructor(game, ctx, x, y) {
    this.game = game;
    this.ctx = ctx;
    this.canvas = this.ctx.canvas;
    this.x = x;
    this.y = y;
    this.init();
  }

  static get image() {
    const img = new Image();
    img.src = 'images/pipe.png';
    return img;
  }


  init() {

  }
  draw() {
    Pipe.image.onload = () => {
      this.ctx.save();
      let flipY = true;
      let scaleY = () => flipY ? -1 : 1;
      this.ctx.scale(1, -1);
      this.ctx.drawImage(Pipe.image, this.x, scaleY() * this.y, PIPE_WIDTH, PIPE_HEIGHT);
      this.ctx.restore();
      flipY = false;
      this.ctx.drawImage(Pipe.image, this.x, scaleY() * this.canvas.height - this.y - BACKGROUND_SCROLL_OFFSET + PIPE_DIFFERENCE, PIPE_WIDTH, PIPE_HEIGHT);
    }
    Pipe.image.src = 'images/pipe.png';
  }
  update() {
  }
}