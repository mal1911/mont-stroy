'use strict';
(function () {
  var initialize = function (sliderClassName) {

    var sliderElement = document.querySelector('.' + sliderClassName);

    var sliderControlPrevElement = sliderElement.querySelector('.' + sliderClassName + '__control--prev');
    var sliderControlNextElement = sliderElement.querySelector('.' + sliderClassName + '__control--next');

    var slideElements = sliderElement.querySelectorAll('.' + sliderClassName + '__item');
    var indicatorElements = sliderElement.querySelectorAll('.' + sliderClassName + '__indicator');

    var getElementIndex = function (element, elements) {
      var index = -1;
      for (var i = 0; i < elements.length; i++) {
        if (element === elements[i]) {
          index = i;
          break;
        }
      }
      return index;
    };

    var getCurrentSlideElement = function () {
      return sliderElement.querySelector('.' + sliderClassName + '__item--active');
    };

    var getCurrentIndicatorElement = function () {
      return sliderElement.querySelector('.' + sliderClassName + '__indicator--active');
    };

    var isIndicatorElements = function () {
      return indicatorElements.length > 0 ? true : false;
    }

    var onControlPrevClick = function (evt) {
      evt.preventDefault();
      showSlide(getElementIndex(getCurrentSlideElement(), slideElements) - 1);
    };

    var onControlNextClick = function (evt) {
      evt.preventDefault();
      showSlide(getElementIndex(getCurrentSlideElement(), slideElements) + 1);
    };

    var onIndicatorChange = function (evt) {
      evt.preventDefault();
      var indicatorElement = evt.target.closest('.' + sliderClassName + '__indicator');
      if (indicatorElement) {
        showSlide(getElementIndex(indicatorElement, indicatorElements));
      } else {
        var slideElement = evt.target.closest('.' + sliderClassName + '__item');
        showSlide(getElementIndex(slideElement, slideElements));
      }
    };

    var showSlide = function (newSlideIndex) {
      var currentSlideIndex = getElementIndex(getCurrentSlideElement(), slideElements);
      var currentIndicatorIndex = getElementIndex(getCurrentIndicatorElement(), indicatorElements);

      /*    console.log('curr: ' + currentSlideIndex);
          console.log('new: ' + newSlideIndex);*/

      slideElements[currentSlideIndex].classList.remove(sliderClassName + '__item--active');
      if (isIndicatorElements()) {
        indicatorElements[currentIndicatorIndex].classList.remove(sliderClassName + '__indicator--active');
      }

      currentSlideIndex = (newSlideIndex + slideElements.length) % slideElements.length;
      slideElements[currentSlideIndex].classList.add(sliderClassName + '__item--active');

      if (isIndicatorElements()) {
        indicatorElements[currentSlideIndex].classList.add(sliderClassName + '__indicator--active');
      }
    };

    if (sliderControlPrevElement) {
      sliderControlPrevElement.addEventListener('click', onControlPrevClick);
    }
    if (sliderControlNextElement) {
      sliderControlNextElement.addEventListener('click', onControlNextClick);
    }

    sliderElement.addEventListener('click', onIndicatorChange);
  };

  window.slider = {
    initialize: initialize,
  };
})();
