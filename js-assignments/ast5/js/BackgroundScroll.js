const GROUND_WIDTH = 37;
const GROUND_HEIGHT = 128;
let imgWidth = 0;
let scrollSpeed = 3;
class BackgroundScroll {
  constructor(Game, ctx) {
    this.Game = Game;
    this.ctx = ctx;
    this.x = 0;
    this.y = 512;
    this.currentFrame = 0;
  }
  init() {
    this.draw();
  }
  draw() {
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, -imgWidth, this.y);
      this.ctx.drawImage(image, this.ctx.canvas.width - imgWidth, this.y);
      imgWidth += scrollSpeed;
      if (imgWidth === this.ctx.canvas.width)
        imgWidth = 0;
    }
    image.src = '../images/ground-full.png';
    if (this.Game.currentState !== this.Game.states.END_SCREEN)
      window.requestAnimationFrame(this.draw.bind(this));
  }
}