class Circle {
  constructor(helix, inPhase) {
    this.helix = helix;
    this.ctx = this.helix.ctx;
    this.radius = this.helix.radiusOfCircles;
    this.amplitude = AMPLITUDE;
    this.radiusAmplitude = RADIUS_AMPLITUDE;
    this.x = INITIAL_X;
    this.y = INITIAL_Y;
    this.phase = inPhase ? 0 : Math.PI;

    this.currentPositionX = 0;
    this.currentPositionY = INITIAL_Y;

    this.color = COLOR;
    this.speed = SPEED;
    this.currentFrame = 0;
  }

  draw() {
    // console.log(this.x, this.y, this.radius);
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    // console.log(this.ctx);
    // this.ctx.closePath();
    this.ctx.fill();
  }

  oscillate() {
    this.currentPositionX = ++this.currentPositionX % 180;
    // this.currentPositionX %= 180;


    this.y = this.amplitude * Math.sin(this.speed * toRad(this.currentPositionX) + this.phase) + this.currentPositionY;
    this.radius = (this.radiusAmplitude * Math.cos(this.speed * toRad(this.currentPositionX) + this.phase) + this.radiusAmplitude) / 2;

    this.currentFrame++;
  }
}