var FPS = 60;
var BACKGROUND_SCROLL_SPEED = 2;
function Asphalt(parentElement) {
  this.parentElement = parentElement;
  this.element = document.createElement('div');
  this.parentElement.appendChild(this.element);

  this.speed = BACKGROUND_SCROLL_SPEED;
  this.score = 0;
  this.backgroundPosition = 0;
  this.scoreContainer = document.createElement('div');

  this.parentElement.appendChild(this.scoreContainer);
  this.scoreContainer.innerText = 'Score';

  this.init();
}
Asphalt.prototype.init = function () {
  this.setStyles();
  this.move();
}

Asphalt.prototype.setStyles = function () {
  this.element.classList.add('asphalt');
  this.scoreContainer.classList.add('score-container');
}

Asphalt.prototype.move = function () {
  this.backgroundPosition = this.backgroundPosition + BACKGROUND_SCROLL_SPEED;
  this.element.style.backgroundPositionY = this.backgroundPosition + '%';
}

Asphalt.prototype.incrementScore = function () {
  this.score++;
}