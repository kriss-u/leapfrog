var carouselContainer = document.querySelector('.carousel-container');
var carouselImageWrapper = document.querySelector('.carousel-image-wrapper');
var carouselNavigation = document.querySelector('.carousel-navigation');
var numberOfImages = carouselImageWrapper.getElementsByClassName('carousel-image-item').length;

var previousArrow = carouselContainer.querySelector('.previous');
var nextArrow = carouselContainer.querySelector('.next');

var IMAGE_WIDTH = carouselImageWrapper.querySelector('.carousel-image-item').offsetWidth;

var currentIndex = 0;
var automaticSlideInstance;

carouselImageWrapper.style.width = numberOfImages * IMAGE_WIDTH + 'px';

var carouselNavigationContainer = [];
for (var i = 0; i < numberOfImages; ++i) {
  var navigationDot = document.createElement('span');
  navigationDot.setAttribute('image-index', i);
  navigationDot.className = 'navigation-dot';
  navigationDot.addEventListener('click', goToSlide);
  carouselNavigation.appendChild(navigationDot);
  carouselNavigationContainer.push(navigationDot);
}

// var carouselImageWrapperWidth = carouselImageWrapper.style.width;
// var carouselImageWrapperMarginLeft = carouselImageWrapper.style.marginLeft;

function automaticSlide() {
  automaticSlideInstance = setInterval(goToNextImage, 3000);
};
// automaticSlide();


function changeNavigationDot(oldDot, newDot) {
  oldDot.classList.remove('active');
  newDot.classList.add('active');
}

changeNavigationDot(carouselNavigationContainer[2], carouselNavigationContainer[currentIndex]);

function goToNextImage() {
  // clearInterval(automaticSlideInstance);

  var oldIndex = currentIndex;
  var oldDot = carouselNavigationContainer[oldIndex];

  currentIndex = (currentIndex + 1) % numberOfImages;
  var currentDot = carouselNavigationContainer[currentIndex];

  changeNavigationDot(oldDot, currentDot);

  var oldMarginLeft = -(oldIndex * IMAGE_WIDTH);
  var newMarginLeft = -(currentIndex * IMAGE_WIDTH);

  var animateInterval = setInterval(animate, 1)

  var animateDifference = -1;

  function animate() {
    if (newMarginLeft === 0 && oldMarginLeft <= newMarginLeft) {

      var df = -animateDifference * numberOfImages;
      var marginOffset = carouselImageWrapper.offsetLeft;
      for (i = 0; i < 10; i++) {
        if (oldMarginLeft > newMarginLeft)
          break;
        carouselImageWrapper.style.marginLeft = (oldMarginLeft + df) + 'px';
        oldMarginLeft = oldMarginLeft + df;
      }

    } else if (oldMarginLeft < newMarginLeft) {

      clearInterval(animateInterval);

    } else if (newMarginLeft !== 0) {

      var df = animateDifference;

      for (i = 0; i < 10; i++) {
        if (oldMarginLeft <= newMarginLeft)
          break;
        carouselImageWrapper.style.marginLeft = (oldMarginLeft + df) + 'px';
        oldMarginLeft = oldMarginLeft + df;
      }
    }
  }
  // setTimeout(function () {
  //   // clearInterval(animateInterval);
  //   automaticSlide();
  // }, 0);
}

function goToPreviousImage() {
  // clearInterval(automaticSlideInstance);

  // carouselImageWrapper.style.marginLeft = currentIndex === 0 ? -((numberOfImages - 1) * IMAGE_WIDTH) + 'px' : -((currentIndex - 1) * IMAGE_WIDTH) + 'px';

  var oldIndex = currentIndex;
  var oldDot = carouselNavigationContainer[oldIndex];

  currentIndex = currentIndex === 0 ? numberOfImages - 1 : currentIndex - 1;
  var currentDot = carouselNavigationContainer[currentIndex];

  carouselImageWrapper.style.marginLeft = -currentIndex * IMAGE_WIDTH + 'px';

  changeNavigationDot(oldDot, currentDot);

  var oldMarginLeft = -(oldIndex * IMAGE_WIDTH);
  var newMarginLeft = -(currentIndex * IMAGE_WIDTH);

  var animateInterval = setInterval(animate, 1)

  function animate() {
    if (newMarginLeft === 0 && oldMarginLeft <= newMarginLeft) {

      var df = -animateDifference * numberOfImages;

      for (i = 0; i < 10; i++) {
        carouselImageWrapper.style.marginLeft = (oldMarginLeft + df - 22) + 'px';
        oldMarginLeft = oldMarginLeft + df;
      }

    } else if (oldMarginLeft < newMarginLeft) {

      clearInterval(animateInterval);

    } else if (newMarginLeft !== 0) {

      var df = animateDifference;

      for (i = 0; i < 10; i++) {
        carouselImageWrapper.style.marginLeft = (oldMarginLeft + df + 4) + 'px';
        oldMarginLeft = oldMarginLeft + df;
      }
    }
  }

  // setTimeout(automaticSlide, 1);
}

function goToSlide(e) {
  clearInterval(automaticSlideInstance);

  var oldIndex = currentIndex;
  var oldDot = carouselNavigationContainer[oldIndex];

  currentIndex = parseInt(e.target.getAttribute('image-index'));
  var currentDot = carouselNavigationContainer[currentIndex];

  changeNavigationDot(oldDot, currentDot);

  carouselImageWrapper.style.marginLeft = currentIndex === 0 ? '0px' : -(currentIndex * IMAGE_WIDTH) + 'px';

  setTimeout(automaticSlide, 1);
}

function animate() {

}
nextArrow.addEventListener('click', goToNextImage);
previousArrow.addEventListener('click', goToPreviousImage);


