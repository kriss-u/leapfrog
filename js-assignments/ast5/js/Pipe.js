'use strict';

class Pipe {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.canvasHeight = this.ctx.canvas.height;
    this.x = 0;
    this.y = getRandomNumberBetween(MINIMUM_POSITION_OFFSET, this.canvasHeight - GROUND_HEIGHT - MINIMUM_POSITION_OFFSET);
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
      this.ctx.drawImage(Pipe.image, 200, scaleY() * 288, PIPE_WIDTH, PIPE_HEIGHT);
      this.ctx.restore();
      flipY = false;
      this.ctx.drawImage(Pipe.image, 200, scaleY() * this.ctx.canvas.height - 128 - 240 + 80, PIPE_WIDTH, PIPE_HEIGHT);
      // window.requestAnimationFrame(this.draw.bind(this));
    }
    Pipe.image.src = 'images/pipe.png';
    // window.requestAnimationFrame(this.draw.bind(this));
  }
}