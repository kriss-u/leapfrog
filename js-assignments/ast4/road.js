var FPS = 60;
var BACKGROUND_SCROLL_SPEED = 5;
function Asphalt(parentElement) {
  this.parentElement = parentElement;
  this.element = document.createElement('div');
  this.parentElement.appendChild(this.element);

  this.speed = BACKGROUND_SCROLL_SPEED;
  this.score = 0;
  this.highScore = Number(localStorage.getItem('highScore')) || 0;
  this.backgroundPosition = 0;
  this.scoreContainer = document.createElement('div');
  this.highScoreContainer = document.createElement('div');


  this.parentElement.appendChild(this.scoreContainer);
  this.parentElement.appendChild(this.highScoreContainer);
  this.scoreContainer.innerText = 'Score\n' + this.score;
  this.highScoreContainer.innerText = 'High Score\n' + this.highScore;


  this.init();
}
Asphalt.prototype.init = function () {
  this.setStyles();
  this.move();
}

Asphalt.prototype.setStyles = function () {
  this.element.classList.add('asphalt');
  this.scoreContainer.classList.add('score-container');
  this.highScoreContainer.classList.add('high-score-container');
}

Asphalt.prototype.move = function () {
  this.backgroundPosition = this.backgroundPosition + BACKGROUND_SCROLL_SPEED;
  this.element.style.backgroundPositionY = this.backgroundPosition + '%';
}

Asphalt.prototype.incrementScore = function () {
  this.score++;
  this.scoreContainer.innerText = 'Score\n' + this.score;
}