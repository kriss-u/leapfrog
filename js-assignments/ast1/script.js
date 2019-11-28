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


// function animateNext(oldIndex, currentIndex) {
//   var oldLeft = -(oldIndex * IMAGE_WIDTH);
//   var newLeft = -(currentIndex * IMAGE_WIDTH);

//   var animateInterval = setInterval(animate, 1);

//   var offsetLeft;
//   if (newLeft === 0) {
//     var animateDifference = 50;
//     oldLeft++;
//   }
//   else {
//     var animateDifference = -20;
//     oldLeft--;
//   }


//   function animate() {
//     if (currentIndex === 0) {
//       offsetLeft = oldLeft % ((numberOfImages - 1) * IMAGE_WIDTH);
//     } else {
//       offsetLeft = (oldLeft - newLeft) % IMAGE_WIDTH;
//     }
//     if (Math.abs(offsetLeft) <= Math.abs(animateDifference)) {
//       clearInterval(animateInterval);
//       carouselImageWrapper.style.left = oldLeft - offsetLeft + 'px';
//     } else {
//       oldLeft = oldLeft + animateDifference;
//       carouselImageWrapper.style.left = oldLeft + 'px';
//     }
//   }
// }

// function animatePrevious(oldIndex, currentIndex) {
//   var oldLeft = -(oldIndex * IMAGE_WIDTH);
//   var newLeft = -(currentIndex * IMAGE_WIDTH);

//   var animateInterval = setInterval(animate, 1);

//   var offsetLeft;

//   if (currentIndex === (numberOfImages - 1)) {
//     var animateDifference = -50;
//     oldLeft--;
//   }
//   else {
//     var animateDifference = 20;
//     oldLeft++;
//   }

//   function animate() {
//     if (oldIndex === 0) {
//       offsetLeft = (newLeft - oldLeft) % ((numberOfImages - 1) * IMAGE_WIDTH);
//     } else {
//       offsetLeft = (oldLeft - newLeft) % IMAGE_WIDTH;
//     }
//     if (Math.abs(offsetLeft) <= Math.abs(animateDifference)) {
//       clearInterval(animateInterval);
//       if (oldIndex === 0) {
//         carouselImageWrapper.style.left = oldLeft + (offsetLeft) + 'px';
//       } else {
//         carouselImageWrapper.style.left = oldLeft + Math.abs(offsetLeft) + 'px';
//       }
//     } else {
//       oldLeft = oldLeft + animateDifference;
//       carouselImageWrapper.style.left = oldLeft + 'px';
//     }
//   }
// }

// This function will animate Slide
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


function goToNextImage() {
  // clearInterval(automaticSlideInstance);
  var oldIndex = currentIndex;
  var oldDot = carouselNavigationContainer[oldIndex];

  currentIndex = (currentIndex + 1) % numberOfImages;
  var currentDot = carouselNavigationContainer[currentIndex];

  changeNavigationDot(oldDot, currentDot);

  // animateNext(oldIndex, currentIndex);
  animateSlide(oldIndex, currentIndex);

}

function goToPreviousImage() {
  // clearInterval(automaticSlideInstance);

  // carouselImageWrapper.style.marginLeft = currentIndex === 0 ? -((numberOfImages - 1) * IMAGE_WIDTH) + 'px' : -((currentIndex - 1) * IMAGE_WIDTH) + 'px';

  var oldIndex = currentIndex;
  var oldDot = carouselNavigationContainer[oldIndex];

  currentIndex = currentIndex === 0 ? numberOfImages - 1 : currentIndex - 1;
  var currentDot = carouselNavigationContainer[currentIndex];

  changeNavigationDot(oldDot, currentDot);
  // animatePrevious(oldIndex, currentIndex);
  animateSlide(oldIndex, currentIndex);

  // setTimeout(automaticSlide, 1);
}

function goToSlide(e) {
  // clearInterval(automaticSlideInstance);

  var oldIndex = currentIndex;
  var oldDot = carouselNavigationContainer[oldIndex];

  currentIndex = parseInt(e.target.getAttribute('image-index'));
  var currentDot = carouselNavigationContainer[currentIndex];

  changeNavigationDot(oldDot, currentDot);

  var oldLeft = -(oldIndex * IMAGE_WIDTH);
  var newLeft = -(currentIndex * IMAGE_WIDTH);

  animateSlide(oldIndex, currentIndex);

  // setTimeout(automaticSlide, 1);
}

nextArrow.addEventListener('click', goToNextImage);
previousArrow.addEventListener('click', goToPreviousImage);


