class Pipe {
  constructor(Game, ctx) {
    this.Game = Game;
    this.ctx = ctx;
    this.x = undefined;
    this.y = undefined;
  }
  init() {
    this.draw();
  }
  draw() {
    const image = new Image();
    image.onload = () => {
      this.ctx.save();
      let flipY = true;
      let scaleY = () => flipY ? -1 : 1;
      this.ctx.scale(1, -1);
      this.ctx.drawImage(image, 200, scaleY() * 200, 200, 200);
      this.ctx.restore();
      flipY = false;
      this.ctx.drawImage(image, 200, scaleY() * 200, 200, 200)
    }
    image.src = '../images/pipe.png';
    // window.requestAnimationFrame(this.draw.bind(this));
  }
}