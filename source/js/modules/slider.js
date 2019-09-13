'use strict';
(function () {
  var initialize = function (sliderClassName, visibleSlidesCount) {
    var sliderElement = document.querySelector('.' + sliderClassName);

    if (!sliderElement) {
      return;
    }

    var sliderControlPrevElement = sliderElement.querySelector('.' + sliderClassName + '__control--prev');
    var sliderControlNextElement = sliderElement.querySelector('.' + sliderClassName + '__control--next');
    var slideElements = sliderElement.querySelectorAll('.' + sliderClassName + '__item');

    if (!slideElements) {
      return;
    }

    var indicatorElements = sliderElement.querySelectorAll('.' + sliderClassName + '__indicator');


    if (!visibleSlidesCount) {
      visibleSlidesCount = slideElements.length;

    }

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

    var getStartVisibleElementIndex = function () {
      var curreentSladeElementIndex = getElementIndex(getCurrentSlideElement(), slideElements);

      if (curreentSladeElementIndex < visibleSlidesCount) {
        return 0;
      } else {
        return curreentSladeElementIndex - visibleSlidesCount + 1;
      }
    };

    var setDisableElements = function () {
      var startVisibleElementIndex = getStartVisibleElementIndex();
      for (var i = 0; i < slideElements.length; i++) {
        if (i >= startVisibleElementIndex && i < startVisibleElementIndex + visibleSlidesCount) {
          slideElements[i].classList.remove(sliderClassName + '__item--hide');
        } else {
          slideElements[i].classList.add(sliderClassName + '__item--hide');
        }
      }
    };

    var getCurrentSlideElement = function () {
      return sliderElement.querySelector('.' + sliderClassName + '__item--active');
    };

    var getCurrentIndicatorElement = function () {
      return sliderElement.querySelector('.' + sliderClassName + '__indicator--active');
    };

    var isIndicatorElements = function () {
      return indicatorElements.length > 0 ? true : false;
    };

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
        if (slideElement) {
          showSlide(getElementIndex(slideElement, slideElements));
        }
      }
    };

    var showSlide = function (newSlideIndex) {
      var currentSlideIndex = getElementIndex(getCurrentSlideElement(), slideElements);
      var currentIndicatorIndex = getElementIndex(getCurrentIndicatorElement(), indicatorElements);

      slideElements[currentSlideIndex].classList.remove(sliderClassName + '__item--active');
      if (isIndicatorElements()) {
        indicatorElements[currentIndicatorIndex].classList.remove(sliderClassName + '__indicator--active');
      }

      currentSlideIndex = (newSlideIndex + slideElements.length) % slideElements.length;
      slideElements[currentSlideIndex].classList.add(sliderClassName + '__item--active');

      if (isIndicatorElements()) {
        indicatorElements[currentSlideIndex].classList.add(sliderClassName + '__indicator--active');
      }
      setDisableElements();
    };

    if (sliderControlPrevElement) {
      sliderControlPrevElement.addEventListener('click', onControlPrevClick);
    }
    if (sliderControlNextElement) {
      sliderControlNextElement.addEventListener('click', onControlNextClick);
    }

    sliderElement.addEventListener('click', onIndicatorChange);
    setDisableElements();
  };

  window.slider = {
    initialize: initialize,
  };
})();
