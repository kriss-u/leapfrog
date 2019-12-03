var BULLET_SPEED = 1;
var FPS = 60;
function Bullet(parentElement, positionX, positionY) {
  this.parentElement = parentElement;
  this.element = document.createElement('div');
  this.parentElement.appendChild(this.element);

  this.positionX = positionX;
  this.positionY = positionY;
  this.speed = BULLET_SPEED;

  this.init();
}

Bullet.prototype.init = function () {
  this.setStyles();
  this.draw();
  this.move();
}

Bullet.prototype.setStyles = function () {
  this.element.classList.add('bullet');
}

Bullet.prototype.draw = function () {
  this.element.style.left = this.positionX + '%';
  this.element.style.bottom = this.positionY + '%';
}

Bullet.prototype.move = function () {
  this.moveBulletInterval = setInterval(function () {
    this.positionY += this.speed;
    this.draw();
  }.bind(this), 1000 / FPS);

}

Bullet.prototype.hasHitCar = function (cars, bullets) {
  var asphalt = document.querySelector('.asphalt');
  for (var i = 0; i < cars.length; ++i) {
    var car = cars[i];
    if (Math.round(this.positionX) === Math.round(car.positionX) && this.positionY >= car.positionY) {
      this.parentElement.removeChild(car.element);
      cars.splice(i, 1);

      asphalt.removeChild(this.element);
      bullets.splice(bullets.indexOf(this), 1);
      return true;
    }
  }
  return false;
}