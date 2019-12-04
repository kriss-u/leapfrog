'use strict';
const BIRD_WIDTH = 92;
const BIRD_HEIGHT = 64;
const SCALING_FACTOR = 0.5;

class Bird {
  constructor(Game, ctx) {
    this.Game = Game;
    this.ctx = ctx;
    this.x = this.ctx.canvas.width / 2 - BIRD_WIDTH / 2;
    this.y = this.ctx.canvas.height / 2 - BIRD_HEIGHT / 2;
    this.currentFrame = 0;
  }
  init() {
    this.draw();
  }
  draw() {
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0 * BIRD_WIDTH, 0, BIRD_WIDTH, BIRD_HEIGHT, this.x, this.y, BIRD_WIDTH * SCALING_FACTOR, BIRD_HEIGHT * SCALING_FACTOR);
    }
    image.src = '../images/bird.png';
    this.update(image);
  }
  update(image) {
    this.ctx.clearRect(this.x, this.y, BIRD_WIDTH, BIRD_HEIGHT);
    this.ctx.drawImage(image, BIRD_WIDTH * (Math.floor(this.currentFrame) % 3), 0, BIRD_WIDTH, BIRD_HEIGHT, this.x, this.y, BIRD_WIDTH * SCALING_FACTOR, BIRD_HEIGHT * SCALING_FACTOR);
    this.currentFrame += 0.1;
    if (this.Game.currentState !== this.Game.states.END_SCREEN)
      window.requestAnimationFrame(this.update.bind(this, image));
  }
}