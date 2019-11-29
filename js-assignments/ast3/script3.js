; (function () {
  var MAX_HEIGHT;
  var MAX_WIDTH;
  function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function Circle(parentElement, speed, radius) {
    this.parentElement = parentElement;
    this.element = document.createElement('div');
    // this.radius = getRandomNumberBetween(minRadius, maxRadius)
    this.radius = radius
    this.diameter = this.radius * 2;
    // this.speed = getRandomNumberBetween(1, 5) * speed;
    this.speed = speed;
    this.x = getRandomNumberBetween(0, MAX_WIDTH - this.diameter);
    this.y = getRandomNumberBetween(0, MAX_HEIGHT - this.diameter);
    this.center = {
      x: this.x + this.radius,
      y: this.y + this.radius
    };
    this.init();
  }
  Circle.prototype.init = function () {
    this.setDirection();
  }
  Circle.prototype.setDirection = function () {
    this.direction = {
      x: getRandomNumberBetween(-1, 2),
      y: getRandomNumberBetween(-1, 2)
    }
  }
  Circle.prototype.generate = function () {
    this.element.classList.add('circle');
    this.element.style.height = this.diameter + 'px';
    this.element.style.width = this.diameter + 'px';
    this.parentElement.appendChild(this.element);
    this.draw();
  }
  Circle.prototype.draw = function () {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }
  Circle.prototype.move = function () {
    this.x += this.speed * this.direction.x;
    this.y += this.speed * this.direction.y;

    if (this.x + this.diameter >= MAX_WIDTH) {
      // this.direction.x = -this.direction.x || -1;
      this.direction.x = -1;
    }
    if (this.y + this.diameter >= MAX_HEIGHT) {
      // this.direction.y = -this.direction.y || -1;
      this.direction.y = -1;
    }

    if (this.x <= 0) {
      this.direction.x = 1;
    }
    if (this.y <= 0) {
      this.direction.y = 1;
    }

    this.draw();
  }
  Circle.prototype.onClick = function () { }
  Circle.prototype.detectCollision = function (circles) {
    for (var i = 0; i < circles.length; ++i) {
      var circle = circles[i];
      if (circles.element != this.element) {
        var dx = this.x - circle.x;
        var dy = this.y - circle.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= this.radius + circle.radius) {
          if (dx > 0) {
            this.direction.x = -this.direction.x || 1;
            circle.direction.x = -circle.direction.x || -1;
          } else {
            this.direction.x = -this.direction.x || -1;
            circle.direction.x = -this.direction.x || 1;
          }
          if (dy > 0) {
            this.direction.y = -this.direction.y || 1;
            circle.direction.y = -circle.direction.y || -1;
          } else {
            this.direction.y = -this.direction.y || -1;
            circle.direction.y = -this.direction.y || 1;
          }
          break;
        }
      }
    }
  }

  function Game(parentElement, maxWidth, maxHeight, numberOfCircles, radius, speed) {
    this.FPS = 30;
    this.parentElement = parentElement;
    this.numberOfCircles = numberOfCircles;
    this.element = document.createElement('div');
    this.parentElement.appendChild(this.element);
    this.width = maxWidth;
    this.height = maxHeight;
    this.speed = speed;
    // this.minRadius = minRadius;
    // this.maxRadius = maxRadius;
    this.radius = radius;
    this.circles = [];
    this.init();
  }
  Game.prototype.init = function () {
    MAX_WIDTH = this.width;
    MAX_HEIGHT = this.height;
    this.setStyles();
    this.getCircles();
    this.moveCircles();
    this.detectCollision();
  }
  Game.prototype.setStyles = function () {
    this.element.classList.add('circle-game');
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
  }
  Game.prototype.getCircles = function () {
    for (var i = 0; i < this.numberOfCircles; ++i) {
      var circle;
      var isOverlapped = true;

      while (isOverlapped) {
        circle = new Circle(this.element, this.speed, this.radius);
        if (!this.checkOverlap(circle)) {
          isOverlapped = false;
        }
      }

      circle.generate();
      // circle.onClick(this.circles)
      this.circles.push(circle);

    }
  }
  Game.prototype.moveCircles = function () {
    setInterval(function () {
      for (var i = 0; i < this.circles.length; ++i) {
        var circle = this.circles[i];
        circle.move();
      }
    }.bind(this), 1000 / this.FPS);
  }
  Game.prototype.detectCollision = function () {
    setInterval(function () {
      for (var i = 0; i < this.circles.length - 1; ++i) {
        var circle = this.circles[i];
        circle.detectCollision(this.circles);
      }
    }.bind(this), 1000 / this.FPS);
  }
  Game.prototype.checkOverlap = function (currentCircle) {
    for (var i = 0; i < this.circles.length; i++) {
      var circle = this.circles[i];

      var dx = currentCircle.center.x - circle.center.x;
      var dy = currentCircle.center.y - circle.center.y;

      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < currentCircle.radius + circle.radius) {
        return true;
      }
    }
    return false;
  }
  new Game(document.getElementById('app'), 500, 500, 10, 20, 1.5);
})();