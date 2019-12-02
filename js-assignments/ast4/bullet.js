var BULLET_SPEED = 10;
function Bullet(parentElement, positionX) {
  this.parentElement = parentElement;
  this.element = document.createElement('div');
  this.parentElement.appendChild(this.element);

  this.positionX = positionX;

  this.init();
}

Bullet.prototype.init = function () {
  this.setStyles();
}

Bullet.prototype.setStyles = function () {
  this.element.classList.add('bullet');
  this.element.style.left = this.positionX + '%';
  this.element.style.bottom = 20 + '%';
}