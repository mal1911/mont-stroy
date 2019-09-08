'use strict';
(function () {
  var initialize = function (containerClassName, toggleClassName) {
    var twoCol = false;
    var containerElement = document.querySelector('.' + containerClassName);
    var toggleElements = containerElement.querySelectorAll('.' + toggleClassName);

    var getContainerHeightClosedItems = function () {
      // Определить высоту контейнера
      var countColToggleElements = Math.round(toggleElements.length / 2);
      var heightLeft = 0;
      var heightRight = 0;
      toggleElements.forEach(function (element, index) {
        var elementHeight = element.parentElement.clientHeight;
        if (index < countColToggleElements) {
          heightLeft += elementHeight;
        } else {
          heightRight += elementHeight;
        }
      });
      return heightLeft > heightRight ? heightLeft : heightRight;
    };
    var getContainerHeightOpenedItems = function () {
      // Определить высоту контейнера
      var heightLeft = 0;
      var heightRight = 0;
      toggleElements.forEach(function (element) {
        if (element.classList.contains(toggleClassName + '--opened')) {
          heightLeft = element.parentElement.clientHeight;
        } else {
          heightRight += element.parentElement.clientHeight;
        }
      });
      return heightLeft > heightRight ? heightLeft : heightRight;
    };
    var setHeight = function () {
      if (screen.width >= 768 && screen.width < 1024) {
        twoCol = true;
        containerElement.style.height = getContainerHeightClosedItems() + 'px';
      } else {
        twoCol = false;
        containerElement.style.height = 'auto';
      }
    };
    var onContainerClick = function (evt) {

      var toggleElement = evt.target.closest('.' + toggleClassName);

      /*
      зачищаем открытые
       */

      toggleElements.forEach(function (element) {
        if (element !== toggleElement && element.classList.contains(toggleClassName + '--opened')) {
          element.classList.remove(toggleClassName + '--opened');
          if (twoCol) {
            element.parentElement.style.flexBasis = 'auto';
            element.parentElement.style.order = 0;
          }
        }
      });

      if (toggleElement) {
        if (toggleElement.classList.contains(toggleClassName + '--opened')) {
          toggleElement.classList.remove(toggleClassName + '--opened');
          if (twoCol) {
            toggleElement.parentElement.style.flexBasis = 'auto';
            toggleElement.parentElement.style.order = 0;
            containerElement.style.height = getContainerHeightClosedItems() + 'px';
          }
        } else {
          toggleElement.classList.add(toggleClassName + '--opened');
          if (twoCol) {
            toggleElement.parentElement.style.flexBasis = '100%';
            toggleElement.parentElement.style.order = -1;
            containerElement.style.height = getContainerHeightOpenedItems() + 'px';
          }
        }
        evt.preventDefault();
      } else {
        setHeight();
      }
    };
    var onResize = function () {
      setHeight();
    };

    setHeight();
    containerElement.addEventListener('click', onContainerClick);
    window.addEventListener('resize', onResize);
  };

  window.toggle = {
    initialize: initialize,
  };
})();
