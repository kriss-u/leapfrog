'use strict';

class Bird {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.canvas = this.ctx.canvas;
    this.x = this.canvas.width / 2 - BIRD_WIDTH / 2;
    this.y = this.canvas.height / 2 - BIRD_HEIGHT / 2;
    this.currentFrame = 0;
    this.init();
  }
  static get image() {
    const img = new Image();
    img.src = 'images/bird.png';
    return img;
  }

  init() {
  }
  draw() {
    // this.ctx.clearRect(this.x, this.y, BIRD_WIDTH, BIRD_HEIGHT);
    Bird.image.onload = async () => {
      // this.ctx.drawImage(image, 0, 0, BIRD_WIDTH, BIRD_HEIGHT, this.x, this.y, BIRD_WIDTH, BIRD_HEIGHT);
      this.ctx.drawImage(Bird.image, BIRD_WIDTH * (Math.floor(this.currentFrame) % 3), 0, BIRD_WIDTH, BIRD_HEIGHT, this.x, this.y, BIRD_WIDTH, BIRD_HEIGHT);
      this.currentFrame += 0.1;
    }

    // this.update(image);
  }
}