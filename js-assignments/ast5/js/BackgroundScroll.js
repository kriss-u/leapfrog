'use strict';

let imgWidth = 0;
let scrollSpeed = 3;

class BackgroundScroll {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.canvas = this.ctx.canvas;
    this.x = 0;
    this.y = this.canvas.height - BACKGROUND_SCROLL_OFFSET;
    this.currentFrame = 0;
    this.init();
  }
  init() {
  }
  draw() {
    const image = new Image();
    image.onload = () => {
      setTimeout(() => {
        this.ctx.drawImage(image, -imgWidth, this.y);
        this.ctx.drawImage(image, this.canvas.width - imgWidth, this.y);
        imgWidth += 3;
        if (imgWidth === this.ctx.canvas.width) {
          imgWidth = 0;
        }
      }, 0);

    }
    image.src = 'images/ground-full.png';
    // if (this.game.currentState !== this.game.states.END_SCREEN)
    // window.requestAnimationFrame(this.draw.bind(this));
  }
}