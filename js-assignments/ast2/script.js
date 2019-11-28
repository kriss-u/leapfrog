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

/**
 * Performs automatic transition of slide.
 */
function automaticSlide() {
  automaticSlideInstance = setInterval(goToNextImage, 2000);
};
automaticSlide();

/**
 * Changes the navigation dot indicator
 * @param {HTMLElement} oldDot - The previous navigation dot
 * @param {HTMLElement} newDot - The current navigation dot
 */
function changeNavigationDot(oldDot, newDot) {
  oldDot.classList.remove('active');
  newDot.classList.add('active');
}

changeNavigationDot(carouselNavigationContainer[2], carouselNavigationContainer[currentIndex]);

/**
 * Changes slide to new image
 * @param {number} oldIndex - The previous index before transition
 * @param {number} currentIndex - The new index to transition into
 */
function animateSlide(oldIndex, currentIndex) {
  if (currentIndex !== oldIndex) {
    var oldLeft = -(oldIndex * IMAGE_WIDTH);
    var newLeft = -(currentIndex * IMAGE_WIDTH);

    var animateInterval = setInterval(animate, 1);

    var offsetLeft;
    if (currentIndex > oldIndex) {
      var animateDifference = -20;
      oldLeft--;
    } else {
      var animateDifference = 20;
      oldLeft++;
    }

    animateDifference = animateDifference * Math.abs(currentIndex - oldIndex);

    function animate() {
      if (currentIndex < oldIndex) {
        offsetLeft = (newLeft - oldLeft) % (Math.abs(currentIndex - oldIndex) * IMAGE_WIDTH);
      } else {
        offsetLeft = (oldLeft - newLeft) % (Math.abs(currentIndex - oldIndex) * IMAGE_WIDTH);
      }
      if (Math.abs(offsetLeft) <= Math.abs(animateDifference)) {
        clearInterval(animateInterval);
        if (currentIndex > oldIndex) {
          carouselImageWrapper.style.left = oldLeft - offsetLeft + 'px';
        }
        else {
          carouselImageWrapper.style.left = oldLeft + offsetLeft + 'px';
        }
      } else {
        oldLeft = oldLeft + animateDifference;
        carouselImageWrapper.style.left = oldLeft + 'px';
      }
    }
  }
}

/**
 * Slides to next image
 */
function goToNextImage() {
  clearInterval(automaticSlideInstance);
  var oldIndex = currentIndex;
  var oldDot = carouselNavigationContainer[oldIndex];

  currentIndex = (currentIndex + 1) % numberOfImages;
  var currentDot = carouselNavigationContainer[currentIndex];

  changeNavigationDot(oldDot, currentDot);

  animateSlide(oldIndex, currentIndex);

  setTimeout(automaticSlide, 0);

}

/**
 * Slides to previous image
 */
function goToPreviousImage() {
  clearInterval(automaticSlideInstance);
  var oldIndex = currentIndex;
  var oldDot = carouselNavigationContainer[oldIndex];

  currentIndex = currentIndex === 0 ? numberOfImages - 1 : currentIndex - 1;
  var currentDot = carouselNavigationContainer[currentIndex];

  changeNavigationDot(oldDot, currentDot);
  animateSlide(oldIndex, currentIndex);

  setTimeout(automaticSlide, 0);
}

/**
 * Slides to image selected in the indicator
 * @param {event} e - The event emitted from click event listerner
 */
function goToSlide(e) {
  clearInterval(automaticSlideInstance);

  var oldIndex = currentIndex;
  var oldDot = carouselNavigationContainer[oldIndex];

  currentIndex = parseInt(e.target.getAttribute('image-index'));
  var currentDot = carouselNavigationContainer[currentIndex];

  changeNavigationDot(oldDot, currentDot);

  var oldLeft = -(oldIndex * IMAGE_WIDTH);
  var newLeft = -(currentIndex * IMAGE_WIDTH);

  animateSlide(oldIndex, currentIndex);

  setTimeout(automaticSlide, 0);

}

nextArrow.addEventListener('click', goToNextImage);
previousArrow.addEventListener('click', goToPreviousImage);


