'use strict';

class Bird {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.x = this.ctx.canvas.width / 2 - BIRD_WIDTH / 2;
    this.y = this.ctx.canvas.height / 2 - BIRD_HEIGHT / 2;
    this.currentFrame = 0;
    this.init();
  }
  init() {
  }
  draw() {
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0, BIRD_WIDTH, BIRD_HEIGHT, this.x, this.y, BIRD_WIDTH, BIRD_HEIGHT);
    }
    image.src = '../images/bird.png';
    this.update(image);
  }
  update(image) {
    this.ctx.clearRect(this.x, this.y, BIRD_WIDTH, BIRD_HEIGHT);
    this.ctx.drawImage(image, BIRD_WIDTH * (Math.floor(this.currentFrame) % 3), 0, BIRD_WIDTH, BIRD_HEIGHT, this.x, this.y, BIRD_WIDTH, BIRD_HEIGHT);
    this.currentFrame += 0.1;
    if (this.game.currentState !== this.game.states.END_SCREEN)
      window.requestAnimationFrame(this.update.bind(this, image));
  }
}