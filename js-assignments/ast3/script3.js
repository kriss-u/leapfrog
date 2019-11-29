; (function () {
  var MAX_HEIGHT;
  var MAX_WIDTH;
  function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
  }

  function Circle(parentElement, speed, minRadius, maxRadius) {
    this.parentElement = parentElement;
    this.element = document.createElement('div');
    this.radius = getRandomNumberBetween(minRadius, maxRadius)
    // this.radius = radius;
    var colorList = ['#1a1aff', '#ff4d4d', ' #1aff66', '#b32d00', '#330033'];
    this.color = colorList[getRandomNumberBetween(0, colorList.length)];
    this.diameter = this.radius * 2;
    this.speed = getRandomNumberBetween(1, 5) * speed;
    // this.speed = speed;
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
    var directions = [-1, 1];
    function getRandomDirection() {
      return directions[Math.floor(Math.random() * 2)];
    }
    this.direction = {
      x: getRandomDirection(),
      y: getRandomDirection()
    }
  }
  Circle.prototype.generate = function () {
    this.element.classList.add('circle');
    this.element.style.height = this.diameter + 'px';
    this.element.style.width = this.diameter + 'px';
    this.element.style.backgroundColor = this.color;
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
      this.direction.x = -1;
    }
    if (this.y + this.diameter >= MAX_HEIGHT) {
      this.direction.y = -1;
    }

    if (this.x <= 0) {
      this.direction.x = 1
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
      if (circle.element != this.element) {
        var dx = this.x - circle.x;
        var dy = this.y - circle.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= this.radius + circle.radius) {
          if (dx > 0) {
            // this.direction.x = -this.direction.x || 1;
            this.direction.x = 1;
            // circle.direction.x = -circle.direction.x || -1;
            circle.direction.x = -1;
          } else {
            // this.direction.x = -this.direction.x || -1;
            this.direction.x = -1;
            // this.direction.x = circle.direction.x || -1;
            // circle.direction.x = -this.direction.x || 1;
            circle.direction.x = 1;
          }
          if (dy > 0) {
            // this.direction.y = -this.direction.y || 1;
            this.direction.y = 1;
            circle.direction.y = -1
            // circle.direction.y = -circle.direction.y || -1;
          } else {
            // this.direction.y = -this.direction.y || -1;
            this.direction.y = -1;
            circle.direction.y = 1;
            // circle.direction.y = -this.direction.y || 1;
          }
          break;
        }
      }
    }
  }

  function Game(parentElement, maxWidth, maxHeight, numberOfCircles, minRadius, maxRadius, speed) {
    this.FPS = 60;
    this.parentElement = parentElement;
    this.numberOfCircles = numberOfCircles;
    this.element = document.createElement('div');
    this.parentElement.appendChild(this.element);
    this.width = maxWidth;
    this.height = maxHeight;
    this.speed = speed;
    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
    // this.radius = radius;
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
    if ((this.numberOfCircles * Math.PI * this.maxRadius * this.maxRadius + 2 * (this.maxRadius * 2 * this.height + this.maxRadius * 2 * this.width) >= this.height * this.width)) {
      var alertElement = document.createElement('div');
      alertElement.classList.add('alert');
      alertText = document.createTextNode('Cannot include all circles in the box! Reducing the number to half');
      alertElement.appendChild(alertText);
      this.parentElement.appendChild(alertElement);
      this.numberOfCircles = Math.floor(this.numberOfCircles * 1 / 2);
      setTimeout(function () {
        this.parentElement.removeChild(alertElement);
        this.getCircles();
      }.bind(this), 2000);
      return;
    }
    for (var i = 0; i < this.numberOfCircles; ++i) {
      var circle;
      var isOverlapped = true;

      while (isOverlapped) {
        circle = new Circle(this.element, this.speed, this.minRadius, this.maxRadius);
        if (!this.checkOverlap(circle)) {
          isOverlapped = false;
        }
      }

      circle.generate();
      // circle.onClick(this.circles)
      this.circles.push(circle);
      console.log(this.numberOfCircles);

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
  new Game(document.getElementById('app'), 1000, 600, 50, 5, 20, 1);
})();