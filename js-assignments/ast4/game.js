function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var FPS = 60;
var CAR_INTERVAL = 800;

function Game(parentElement) {
  this.parentElement = parentElement;
  this.element = document.createElement('div');
  this.parentElement.appendChild(this.element);
  this.asphalt = new Asphalt(this.element);
  this.isGameOver = false;
}

Game.prototype.startGame = function () {
  this.setStyles();
  this.createPlayingCar();
  this.createEnemyCars();
  this.playerControl();
  this.loop();
}

Game.prototype.setStyles = function () {
  this.element.classList.add('game');
}

Game.prototype.createPlayingCar = function () {
  this.playingCar = new Car(document.querySelector('.asphalt'));
  // this.playingCar = new Car(this.element, 50, 20);
  this.playingCar.draw();
}

Game.prototype.createEnemyCars = function () {
  this.enemyCars = [];
  this.enemyInterval = setInterval(function () {
    var car = new EnemyCar(document.getElementsByClassName('asphalt')[0]);
    this.enemyCars.push(car);
  }.bind(this), CAR_INTERVAL);
}

Game.prototype.playerControl = function () {
  document.onkeydown = this.onKeyPress.bind(this);
}

Game.prototype.onKeyPress = function (e) {
  if (e.key === 'ArrowLeft') {
    this.playingCar.goLeft();
  } else if (e.key === 'ArrowRight') {
    this.playingCar.goRight();
  }
  this.playingCar.draw();
}


Game.prototype.moveEnemyCars = function () {
  for (var i = 0; i < this.enemyCars.length; ++i) {
    var enemyCar = this.enemyCars[i];
    enemyCar.goDown();
    enemyCar.detectObstacle(this.enemyCars);
    enemyCar.draw();

    if (enemyCar.invalidate()) {
      enemyCar.element.style.display = 'none';
      // this.element.removeChild(enemyCar.element);
      this.asphalt.element.removeChild(enemyCar.element);
      this.enemyCars.splice(i, 1);
      this.asphalt.incrementScore();
      break;
    }
  }
  this.isGameOver = this.checkGameOver();
}
Game.prototype.checkGameOver = function () {
  for (var i = 0; i < this.enemyCars.length; ++i) {
    var enemyCar = this.enemyCars[i];
    if (Math.round(enemyCar.positionX) == Math.round(this.playingCar.positionX) && Math.round(enemyCar.positionY) <= Math.round(this.playingCar.positionY + this.playingCar.heightRatioPercent) && Math.round(enemyCar.positionY + enemyCar.heightRatioPercent) >= Math.round(this.playingCar.positionY)) {
      return true;
    }
  }
  return false;
}
Game.prototype.postGameOver = function () {
  if (this.isGameOver) {
    this.element.removeEventListener('keydown', this.playerControlEventListener);
    clearInterval(this.enemyInterval);
    clearInterval(this.loopInterval);
    if (this.asphalt.score > localStorage.getItem('highScore')) {
      localStorage.setItem('highScore', this.asphalt.score);
    }
    setTimeout(function () {
      var startGameButton = document.querySelector('.start-game-button');
      startGameButton.innerText = 'Retry';
      startGameButton.style.display = 'block';
      var rootElement = document.getElementById('app');
      startGameButton.onclick = function () {
        rootElement.removeChild(rootElement.querySelector('.game'));
        startGameButton.style.display = 'none';
        new Game(rootElement).startGame();
      }.bind(this);
    }, 0);
  }
}
Game.prototype.loop = function () {
  this.loopInterval = setInterval(function () {
    this.asphalt.move();
    this.moveEnemyCars();
    this.postGameOver();
  }.bind(this), 1000 / FPS)
}

function main() {
  var startGameButton = document.createElement('button');
  var rootElement = document.getElementById('app');
  var game = new Game(document.getElementById('app'));

  rootElement.appendChild(startGameButton);
  startGameButton.innerText = 'Start Game';
  startGameButton.classList.add('start-game-button');

  startGameButton.onclick = function () {
    game.startGame();
    startGameButton.style.display = 'none';
  }.bind(this);
}

main();