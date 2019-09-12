'use strict';
(function () {
  var initialize = function (containerClassName, toggleClassName) {
    var twoCol = false;
    var containerElement = document.querySelector('.' + containerClassName);
    var toggleElements = containerElement.querySelectorAll('.' + toggleClassName);

    var getContainerHeight = function () {
      // Определить высоту контейнера
      var heightLeft = 0;
      var heightRight = 0;

      var openedToggleElement = containerElement.querySelector('.' + toggleClassName + '--opened');
      // есть открытые
      if (openedToggleElement) {
        for (var i = 0; i < toggleElements.length; i++) {
          var elementHeight = toggleElements[i].parentElement.clientHeight;
          if (toggleElements[i].classList.contains(toggleClassName + '--opened')) {
            heightLeft = elementHeight;
          } else {
            heightRight += elementHeight;
          }
        }
      } else {
        var countColItemsCount = Math.round(toggleElements.length / 2);
        for (i = 0; i < toggleElements.length; i++) {
          elementHeight = toggleElements[i].parentElement.clientHeight;
          if (i < countColItemsCount) {
            heightLeft += elementHeight;
          } else {
            heightRight += elementHeight;
          }
        }
      }
      return heightLeft > heightRight ? heightLeft : heightRight;
    };


    var setContainerHeight = function () {
      //
      if (document.body.clientWidth >= 768 && document.body.clientWidth < 1024) {
        twoCol = true;
        containerElement.style.height = getContainerHeight() + 'px';
      } else {
        twoCol = false;
        containerElement.style.height = 'auto';
      }
    };

    var setOpenElement = function (element) {
      element.classList.add(toggleClassName + '--opened');
      if (twoCol) {
        element.parentElement.style.marginBottom = 'auto';
        element.parentElement.style.order = -1;
      }
    };

    var setCloseElement = function (element) {
      element.classList.remove(toggleClassName + '--opened');
      if (twoCol) {
        element.parentElement.style.marginBottom = '0';
        element.parentElement.style.order = 0;
      }
    };

    var setCloseElements = function (currToggleElement) {
      for (var i = 0; i < toggleElements.length; i++) {
        if (toggleElements[i] !== currToggleElement && toggleElements[i].classList.contains(toggleClassName + '--opened')) {
          setCloseElement(toggleElements[i]);
        }
      }
    };

    var onContainerClick = function (evt) {
      var toggleElement = evt.target.closest('.' + toggleClassName);
      setCloseElements(toggleElement);
      if (toggleElement) {
        if (toggleElement.classList.contains(toggleClassName + '--opened')) {
          setCloseElement(toggleElement);
        } else {
          setOpenElement(toggleElement);
        }
      }
      setContainerHeight();
      evt.preventDefault();
    };


    var onResize = function () {
      setCloseElements(null);
      setContainerHeight();
    };

    setContainerHeight();
    containerElement.addEventListener('click', onContainerClick);
    window.addEventListener('resize', onResize);
  };

  window.toggle = {
    initialize: initialize,
  };
}
)();
