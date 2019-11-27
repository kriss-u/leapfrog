var carouselContainer = document.querySelector('.carousel-container');
var carouselImageWrapper = document.querySelector('.carousel-image-wrapper');
var numberOfImages = carouselImageWrapper.getElementsByClassName('carousel-image-item').length;

var previousArrow = carouselContainer.querySelector('.previous');
var nextArrow = carouselContainer.querySelector('.next');

var IMAGE_WIDTH = carouselImageWrapper.querySelector('.carousel-image-item').offsetWidth;

var currentIndex = 0;

carouselImageWrapper.style.width = numberOfImages * IMAGE_WIDTH + 'px';

var carouselImageWrapperWidth = carouselImageWrapper.style.width;
var carouselImageWrapperMarginLeft = carouselImageWrapper.style.marginLeft;

var automaticSlideInstance;
var automaticSlide = function () {
  automaticSlideInstance = setInterval(goToNextImage, 2000);
};
automaticSlide();


function goToNextImage() {
  clearInterval(automaticSlideInstance);
  currentIndex = (currentIndex + 1) % numberOfImages;
  carouselImageWrapper.style.marginLeft = currentIndex === 0 ? '0px' : -(currentIndex * IMAGE_WIDTH) + 'px';
  setTimeout(automaticSlide, 1);
}

function goToPreviousImage() {
  clearInterval(automaticSlideInstance);
  carouselImageWrapper.style.marginLeft = currentIndex === 0 ? -((numberOfImages - 1) * IMAGE_WIDTH) + 'px' : -((currentIndex - 1) * IMAGE_WIDTH) + 'px';
  currentIndex = Math.sign(currentIndex) === 0 ? numberOfImages - 1 : currentIndex - 1;
  setTimeout(automaticSlide, 1);
}

function goToSlide(index) {
  clearInterval(automaticSlide);
  currentIndex = index;
  carouselImageWrapper.style.marginLeft = currentIndex === 0 ? '0px' : -(currentIndex * IMAGE_WIDTH) + 'px';
  setTimeout(automaticSlide, 1);
}

nextArrow.addEventListener('click', goToNextImage);
previousArrow.addEventListener('click', goToPreviousImage);


