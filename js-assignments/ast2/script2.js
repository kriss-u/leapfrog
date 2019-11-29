var carouselContainerList = document.getElementsByClassName('carousel-container')
var firstCarouselContainer = carouselContainerList[0];

function Carousel(carouselContainer) {
  this.carouselContainer = carouselContainer;
  this.carouselImageWrapper = this.carouselContainer.querySelector('.carousel-image-wrapper');
  this.numberOfImages = this.carouselImageWrapper.getElementsByClassName('carousel-image-item').length;
  this.IMAGE_WIDTH = this.carouselImageWrapper.querySelector('.carousel-image-item').offsetWidth;
}

Carousel.prototype.init = function () {
  this.currentIndex = 0;
  this.automaticSlideInstance = null;
  this.carouselImageWrapper.style.width = this.numberOfImages * this.IMAGE_WIDTH + 'px';
  this.createNavigation();
}

Carousel.prototype.consoleContainer = function () {
  console.log(this.IMAGE_WIDTH, this.numberOfImages, this.carouselImageWrapper.style.width);
}

Carousel.prototype.createNavigation = function () {
  var previousArrow = document.createElement('a');
  var previousArrowText = document.createTextNode('\u276E');
  var nextArrow = document.createElement('a');
  var nextArrowText = document.createTextNode('\u276F');
  var carouselNavigation = document.createElement('div');

  carouselNavigation.classList.add('carousel-navigation');
  this.carouselContainer.appendChild(carouselNavigation);

  previousArrow.classList.add('previous');
  previousArrow.appendChild(previousArrowText);
  this.carouselContainer.appendChild(previousArrow);

  nextArrow.classList.add('next');
  nextArrow.appendChild(nextArrowText);
  this.carouselContainer.appendChild(nextArrow);

  this.consoleContainer();
}

var carousel1 = new Carousel(firstCarouselContainer)
carousel1.init();