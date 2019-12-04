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
    this.backgroundScroll = null;
    this.pipes = [];
    this.currentState = Game.states.START_SCREEN;
    this.init();
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
    this.render();
  }

  resetGameState() {
    this.isInProgress = undefined;
    this.bird = null;
    this.pipes = [];
    this.currentState = Game.states.START_SCREEN;
  }

  createGameObjects() {
    this.backgroundScroll = new BackgroundScroll(this.game, this.ctx);
    this.bird = new Bird(this.game, this.ctx);
    this.pipe = new Pipe(this.game, this.ctx);
  }

  render() {
    this.bird.draw();
    this.pipe.draw();
    this.backgroundScroll.draw();
  }
  initializeInputHandlers() {
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
  }

  keyDownHandler(e) {
    if (e.key === ' ') {
      console.log("Space Entered!");
    }
  }

}