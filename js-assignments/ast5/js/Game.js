'use strict';

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class Game {
  constructor(parentElement, width, height) {
    this.parentElement = parentElement;
    this.element = this.createElement();
    this.parentElement.appendChild(this.element);

    this.width = width;
    this.height = height;
    this.isInProgress = undefined;
    this.currentState = undefined;
    this.animationFrame = null;
    this.states = GAME_STATES;
    this.init();
  }

  init() {
    this.reset();
    this.initializeInputHandlers();
    this.createGameObjects();
  }

  reset() {
    this.resetState();
  }

  resetState() {
    this.isInProgress = true;
    this.currentState = this.states.START_SCREEN;
    this.animationFrame = null;
  }

  clearScreen() {
    switch (this.currentState) {
      case this.states.START_SCREEN:
      case this.states.END_SCREEN:
        break;

      case this.states.GAME_SCREEN:
        this.parentElement.removeChild(this.element);
        break;
    }
  }

  start() {

    this.createGameObjects();

  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('game');
    element.style.width = this.width + 'px';
    element.style.height = this.height + 'px';
    return element;
  }

  createGameObjects() {
    // Create a new background canvas
    this.background = new Background(this);
    this.gameLayer = new GameLayer(this);
  }

  loop() {
    if (this.isInProgress) {
      this.animationFrame = window.requestAnimationFrame(this.loop.bind(this));
    }
    this.clearScreen();
  }

  render() {
    switch (this.currentState) {
      case Game.states.START_SCREEN:
        this.background.init();
        break;
    }
  }

  initializeInputHandlers() {
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
  }

  keyDownHandler(e) {
    if (e.key === ' ') {
      this.consoleLog("Space Entered!");
    }
  }


  consoleLog(value) {
    console.log(value);
  }

}


const game = new Game(document.getElementById('app'), 480, 640);

// game.consoleLog(game.ctx);