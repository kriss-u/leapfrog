class Score {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.canvas = this.ctx.canvas;
    // this.x = this.canvas.width / 2 - BIRD_WIDTH / 2;
    // this.y = this.canvas.height / 2 - BIRD_HEIGHT / 2;
    this.value = 0;
    this.init();
  }

  init() { }

  draw() {
    this.ctx.save();
    this.ctx.font = '60px Teko';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(this.value, this.canvas.width / 2, 80);
    this.ctx.restore();
  }

  increment() {
    this.value = this.value + 1;
  }
}