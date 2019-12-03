function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var FPS = 60;
var CAR_INTERVAL = 600;

function Game(parentElement) {
  this.parentElement = parentElement;
  this.element = document.createElement('div');

  this.parentElement.appendChild(this.element);
  this.asphalt = new Asphalt(this.element);
  this.isGameOver = false;
  this.isGameStarted = false;
  this.playingCar = null;
  this.init();
}

Game.prototype.init = function () {
  if (!this.isGameOver) {
    this.showStartButton();
  }
  this.setStyles();
  this.playingCar = this.createPlayingCar();
  this.playingCar.generateBullets();
  this.playerControl();
}

Game.prototype.showStartButton = function () {
  this.startGameButton = document.createElement('button');
  this.startGameButton.classList.add('start-game-button');
  this.startGameButton.innerText = !this.isGameOver ? 'Start Game' : 'Retry!';
  this.element.appendChild(this.startGameButton);
  this.startGameButton.onclick = this.restartGame.bind(this);

}

Game.prototype.restartGame = function () {
  this.element.removeChild(this.startGameButton);
  this.startGame();
}

Game.prototype.startGame = function () {
  this.isGameStarted = true;
  this.createEnemyCars(this.playingCar);
  this.loop();
}

Game.prototype.setStyles = function () {
  this.element.classList.add('game');
}

Game.prototype.createPlayingCar = function () {
  this.playingCar = new Car(document.querySelector('.asphalt'));
  this.playingCar.draw();
  return this.playingCar;
}

Game.prototype.createEnemyCars = function (playingCar) {
  this.enemyCars = [];
  this.enemyInterval = setInterval(function () {
    var car = new EnemyCar(document.getElementsByClassName('asphalt')[0], playingCar);
    this.enemyCars.push(car);
  }.bind(this, playingCar), getRandomNumberBetween(CAR_INTERVAL - 300, CAR_INTERVAL + 300));
}

Game.prototype.playerControl = function () {
  document.onkeydown = this.onKeyPress.bind(this);
}

Game.prototype.onKeyPress = function (e) {
  if (this.isGameStarted && !this.isGameOver) {
    if (e.key === 'ArrowLeft') {
      this.playingCar.goLeft();
    } else if (e.key === 'ArrowRight') {
      this.playingCar.goRight();
    } else if (e.key === ' ') {
      this.playingCar.fire();
    }
    this.playingCar.draw();
  }
}


Game.prototype.moveEnemyCars = function () {
  for (var i = 0; i < this.enemyCars.length; ++i) {
    var enemyCar = this.enemyCars[i];
    enemyCar.goDown();
    // enemyCar.detectObstacle(this.enemyCars);
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
    if (Math.round(enemyCar.positionX) == Math.round(this.playingCar.positionX) && enemyCar.positionY <= this.playingCar.positionY + this.playingCar.heightRatioPercent && enemyCar.positionY + enemyCar.heightRatioPercent >= this.playingCar.positionY) {
      return true;
    }
  }
  return false;
}
Game.prototype.postGameOver = function () {
  if (this.isGameOver) {
    this.isGameStarted = false;
    this.element.removeEventListener('keydown', this.playerControlEventListener);
    clearInterval(this.enemyInterval);
    clearInterval(this.loopInterval);
    clearInterval(this.playingCar.generateBulletsInterval);

    if (this.asphalt.score > localStorage.getItem('highScore')) {
      localStorage.setItem('highScore', this.asphalt.score);
    }
    var gameOver = document.createElement('div');
    gameOver.innerText = 'Game Over!';
    gameOver.classList.add('game-over-text');
    this.parentElement.appendChild(gameOver);
    setTimeout(function () {
      this.parentElement.removeChild(this.element);
      new Game(document.getElementById('app'));
    }.bind(this), 2000);
  }
}

Game.prototype.checkHitBullet = function () {
  for (var i = 0; i < this.playingCar.bullets.length; ++i) {
    var bullet = this.playingCar.bullets[i];
    if (bullet.positionY >= 100) {
      this.playingCar.bullets.splice(i, 1);
      this.asphalt.element.removeChild(bullet.element);
      break;
    }
    if (bullet.hasHitCar(this.enemyCars, this.playingCar.bullets)) {
      this.asphalt.incrementScore();
    }
  }
}

Game.prototype.loop = function () {
  this.loopInterval = setInterval(function () {
    this.asphalt.move();
    this.moveEnemyCars();
    this.checkHitBullet();
    this.postGameOver();
  }.bind(this), 1000 / FPS)
}

new Game(document.getElementById('app'));