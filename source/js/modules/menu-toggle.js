'use strict';
(function () {
  var ESC_KEYCODE = 27;

  var initialize = function (toggleClassName) {
    var toggleElement = document.querySelector('.' + toggleClassName);

    if (!toggleElement) {
      return;
    }

    var openMenu = function () {
      toggleElement.classList.add(toggleClassName + '--opened');
      document.addEventListener('keydown', onKeyPress);
      document.addEventListener('click', onClick);

    };

    var closeMenu = function () {
      toggleElement.classList.remove(toggleClassName + '--opened');
      document.removeEventListener('keydown', onKeyPress);
      document.removeEventListener('click', onClick);

    };

    var onClick = function (evt) {
      if (evt.target !== toggleElement && toggleElement.classList.contains(toggleClassName + '--opened')) {
        closeMenu();
        evt.preventDefault();
      }
    };

    var onKeyPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeMenu();
        evt.preventDefault();
      }
    };

    var onToggleClick = function (evt) {
      if (toggleElement) {
        if (toggleElement.classList.contains(toggleClassName + '--opened')) {
          closeMenu();
        } else {
          openMenu();
        }
        evt.preventDefault();
      }
    };

    var onResize = function () {
      closeMenu();
    };

    toggleElement.addEventListener('click', onToggleClick);
    window.addEventListener('resize', onResize);
  };

  window.menuToggle = {
    initialize: initialize,
  };
})();
