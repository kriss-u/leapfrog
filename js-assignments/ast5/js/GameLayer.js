'use strict';

class GameLayer {
  constructor(game) {
    this.game = game;
    this.parentElement = this.game.element;
    this.canvas = this.createCanvas();
    this.parentElement.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.isInProgress = undefined;
    this.bird = null;
    this.score = null;
    this.backgroundScroll = null;
    this.pipes = [];
    // this.currentState = Game.states.START_SCREEN;
    this.lastPipeSpawnedTime = new Date(0);
    this.currentTime = new Date();
    this.currentPipePositionX = 600;
    this.init();
  }

  get currentDurationSinceLastSpawn() {
    return this.currentTime - this.lastPipeSpawnedTime;
  }

  get pipesCount() {
    return this.pipes.length;
  }

  static get width() {
    return Game.width;
  }
  static get height() {
    return Game.height;
  }

  init() {
    this.resetGame();
    this.initializeInputHandlers();
    this.start();
  }

  start() {
    if (!this.isInProgress) {
      this.isInProgress = true;
      this.loop();
    }
  }

  loop() {
    if (this.isInProgress) {
      this.animationFrame = window.requestAnimationFrame(this.loop.bind(this));
    }
    this.clearScreen();
    this.render();
    this.update();
    this.handleInput();
  }

  createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = Game.width;
    canvas.height = Game.height;
    canvas.style.zIndex = '5';
    return canvas;
  }

  resetGame() {
    this.resetGameState();
    this.createGameObjects();
  }

  resetGameState() {
    this.isInProgress = undefined;
    this.bird = null;
    this.pipes = [];
    this.score = null;
    this.backgroundScroll = null;
    // this.currentState = Game.states.START_SCREEN;
  }

  createGameObjects() {
    this.backgroundScroll = new BackgroundScroll(this.game, this.ctx);
    this.bird = new Bird(this.game, this.ctx);
    this.score = new Score(this.game, this.ctx);
  }

  clearScreen() {
    switch (this.game.currentState) {
      case Game.states.START_SCREEN:
      case Game.states.END_SCREEN:
        break;
      case Game.states.GAME_SCREEN:
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        break;
    }
  }
  render() {
    switch (this.game.currentState) {
      case Game.states.START_SCREEN:
        this.bird.animate();
        this.score.draw();
        this.backgroundScroll.draw();
        break;

      case Game.states.GAME_SCREEN:

        // this.backgroundScroll.draw();
        // this.score.draw();
        this.createPipes();
        this.pipes.forEach((pipe) => pipe.draw());
        // this.backgroundScroll.draw();
        this.bird.draw();
        break;

      case Game.states.END_SCREEN:
        break;

      default:
        break;
    }
  }

  update() {
    switch (this.game.currentState) {
      case Game.states.START_SCREEN:
        break;
      case Game.states.GAME_SCREEN:
        // this.updatePipes();
        this.backgroundScroll.draw();
        this.updatePipes();

        this.bird.draw();
        this.score.draw();
        break;
      default:
        break;
    }
  }

  handleInput() {
    this.bird.handleInput();
  }
  updatePipes() {
    for (var i = 0; i < this.pipesCount; ++i) {
      let pipe = this.pipes[i];
      if (pipe.x <= -PIPE_WIDTH) {
        this.pipes.splice(i, 1);
      }
      else {
        pipe.update();
      }
    }
  }

  createPipes() {
    this.currentTime = new Date();
    if (this.pipesCount <= 3 && this.currentDurationSinceLastSpawn >= PIPE_INTERVAL) {
      this.lastPipeSpawnedTime = this.currentTime;
      let x = this.currentPipePositionX;
      let y = getRandomNumberBetween(MINIMUM_POSITION_OFFSET, this.canvas.height - GROUND_HEIGHT - MINIMUM_POSITION_OFFSET - PIPE_DIFFERENCE);
      let pipe = new Pipe(this.game, this.ctx, x, y);
      this.pipes.push(pipe);
      this.currentPipePositionX += PIPE_DISTANCE;
    }
  }

  initializeInputHandlers() {
    document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
  }

  keyDownHandler(e) {
    if (e.key === ' ') {
      this.game.isSpaceBarPressed = true;
      this.game.currentState = Game.states.GAME_SCREEN;
    }
  }

}