var positionsOfCar = [16.6666, 49.9999, 83.3333];
var POSITION_Y = 7;
var CAR_WIDTH = 50;
var CAR_HEIGHT = 80;
var GAME_HEIGHT = 600;

var carImages = [
  './images/fancy-car.png',
  './images/police-car.png',
  './images/red-racing-car.png',
  './images/orange-yellow-car.png',
  './images/yellow-racing-car.png'
];

function Car(parentElement) {
  this.parentElement = parentElement;
  this.element = document.createElement('div');
  this.parentElement.appendChild(this.element);

  this.width = CAR_WIDTH;
  this.height = CAR_HEIGHT;
  this.heightRatioPercent = 0;
  this.positionX = positionsOfCar[getRandomNumberBetween(0, 3)];
  this.positionY = POSITION_Y;
  this.init();
}
Car.prototype.init = function () {
  this.setStyles();
}
Car.prototype.setStyles = function () {
  this.element.classList.add('car');
  this.element.style.width = this.width + 'px';
  // this.element.style.height = this.height + 'px';
  this.image = document.createElement('img');
  this.image.src = './images/fancy-car.png';
  this.element.appendChild(this.image);

  this.height = this.element.clientHeight;

  this.heightRatioPercent = this.height / GAME_HEIGHT * 100;


}

Car.prototype.draw = function () {
  this.element.style.left = this.positionX + '%';
  this.element.style.bottom = this.positionY + '%';
}

Car.prototype.goLeft = function () {
  if (this.positionX > 20) {
    this.positionX -= 33.3333;
  }
}

Car.prototype.goRight = function () {
  if (this.positionX < 80) {
    this.positionX += 33.3333;
  }
}

function EnemyCar(parentElement) {
  Car.call(this, parentElement);
}

EnemyCar.prototype = Object.create(Car.prototype);
EnemyCar.prototype.constructor = EnemyCar;

EnemyCar.prototype.init = function () {
  this.speed = getRandomNumberBetween(1, 2);
  this.setStyles();
  this.element.style.transform = 'scaleY(-1) translate(-50%, 0%)';
  this.positionY = 100;
  this.image.src = carImages[getRandomNumberBetween(0, carImages.length)];

  this.heightRatioPercent = this.height / GAME_HEIGHT * 100;
  this.draw();
}

EnemyCar.prototype.goDown = function () {
  this.positionY -= this.speed;
}

EnemyCar.prototype.invalidate = function () {
  if (this.positionY <= -this.heightRatioPercent) {
    return true;
  }
  return false;
}

EnemyCar.prototype.detectObstacle = function (cars) {
  var positionOffset = 5;
  var lowSpeed = 0.5;

  for (var i = 0; i < cars.length; ++i) {
    var car = cars[i];
    if (this.positionX == car.positionX && this.positionY > car.positionY) {
      if (this.positionY - positionOffset <= car.positionY + car.heightRatioPercent) {
        this.speed = lowSpeed;
        break;
      }
    }
  }
}
EnemyCar.prototype.detectCollision = function (cars) {
  for (var i = 0; i < cars.length; ++i) {
    var car = cars[i];
    if (car.element != this.element) {
      if (this.positionX == car.positionX && car.positionY <= this.positionY + this.height && this.positionY <= car.positionY + car.height) {
        break;
      }
    }
  }
}

