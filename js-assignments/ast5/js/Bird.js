'use strict';

class Bird {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.canvas = this.ctx.canvas;
    this.x = Bird.initialX;
    this.y = Bird.initialY;
    this.currentFrame = 0;
    this.direction = -1;
    this.hopPixels = Bird.hopPixels;
    this.init();
  }
  static get image() {
    const img = new Image();
    img.src = 'images/bird.png';
    return img;
  }

  static get initialX() {
    return Game.width / 2 - BIRD_WIDTH / 2 - 50;
  }

  static get initialY() {
    return Game.height / 2 - BIRD_HEIGHT / 2 - 50;
  }

  static get hopMaxY() {
    return Bird.initialY - Bird.hopPixels;
  }

  static get hopMinY() {
    return Bird.initialY + Bird.hopPixels;
  }

  static get hopPixels() {
    return 15;
  }


  init() { }

  animate() {
    if (this.direction === -1) {
      if (this.y <= Bird.hopMaxY) {
        this.direction = 1;
      }
    } else {
      if (this.y >= Bird.hopMinY) {
        this.direction = -1;
      }
    }
    this.previousY = this.y;
    this.y = this.y + this.direction;

    Bird.image.onload = () => {
      this.ctx.clearRect(this.x, this.y - this.direction, 45, 32);
      // this.ctx.drawImage(image, 0, 0, BIRD_WIDTH, BIRD_HEIGHT, this.x, this.y, BIRD_WIDTH, BIRD_HEIGHT);
      this.ctx.drawImage(Bird.image, BIRD_WIDTH * (Math.floor(this.currentFrame) % 3), 0, BIRD_WIDTH, BIRD_HEIGHT, this.x, this.y, BIRD_WIDTH, BIRD_HEIGHT);
      this.currentFrame += 0.1;
    }
  }

  draw() {
    Bird.image.onload = () => {
      // this.ctx.drawImage(image, 0, 0, BIRD_WIDTH, BIRD_HEIGHT, this.x, this.y, BIRD_WIDTH, BIRD_HEIGHT);
      this.ctx.drawImage(Bird.image, BIRD_WIDTH * (Math.floor(this.currentFrame) % 3), 0, BIRD_WIDTH, BIRD_HEIGHT, this.x, this.y, BIRD_WIDTH, BIRD_HEIGHT);
      this.currentFrame += 0.1;
    }
  }
  update() {
    if (this.game.currentState === Game.states.GAME_SCREEN) {
      this.hopPixels = 0;
      this.y = this.previousY;
    } else {
      this.hopPixels = 15;
    }
  }

  handleInput() {
    if (this.game.isSpaceBarPressed) {
      console.log('Space bar pressed inside handleInput of Bird.js');
      this.game.isSpaceBarPressed = false;
    }
  }
}