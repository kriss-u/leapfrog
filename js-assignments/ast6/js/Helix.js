class Helix {
  constructor(parentElement, width, height, numRows, numColumns, radiusOfCircles) {
    this.parentElement = parentElement;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.parentElement.appendChild(this.canvas);

    this.width = width || WIDTH;
    this.height = height || HEIGHT;
    this.radiusOfCircles = radiusOfCircles || RADIUS;
    this.circles = [];
    this.numRows = numRows || NUM_ROWS;
    this.numColumns = numColumns || NUM_COLUMNS;
    this.frequency = FREQUENCY;
    this.gapBetweenCircle = GAP_BETWEEN_CIRCLE;
    this.initialPositionY = INITIAL_Y;
    this.dPhase = D_PHASE;
    this.colors = ['#ffae73', '#fea978', '#fea57c', '#fea081', '#fe9b86', '#fa968b', '#f59190', '#f08c95', '#eb879a', '#e17da4'];

    this.init();
  }

  init() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx.fillStyle = '#043A4A';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.generateCircles(true);
    this.generateCircles(false);
    this.loop();
  }

  generateCircles(inPhase) {
    let currentPositionY = this.initialPositionY;
    for (let i = 0; i < this.numRows; ++i) {
      currentPositionY += this.gapBetweenCircle;

      let currentPositionX = 0;
      let currentPhase = 0;

      for (let j = 0; j < this.numColumns; ++j) {
        const circle = new Circle(this, inPhase, this.colors[i]);
        currentPositionX += this.gapBetweenCircle;
        circle.x = currentPositionX;
        circle.y = currentPositionY;

        currentPhase += this.dPhase;
        circle.currentPositionX = currentPhase;
        circle.currentPositionY = currentPositionY;

        this.circles.push(circle);
      }

    }
  }
  loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.circles.forEach((circle) => {
      circle.draw();
      circle.oscillate();
    });
    window.requestAnimationFrame(this.loop.bind(this));
  }
}