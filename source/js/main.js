'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var noJsElement = document.querySelector('.no-js');
  noJsElement.classList.remove('no-js');

  var footerElement = document.querySelector('footer');

  var onFooterClick = function (evt) {
    var toggleElement = evt.target.closest('.toggle');

    if (!toggleElement) {
      toggleElement = evt.target.nextElementSibling;
    }

    if (toggleElement) {
      if (toggleElement.classList.contains('toggle--opened')) {
        toggleElement.classList.remove('toggle--opened');
        toggleElement.classList.add('toggle--closed');
      } else {
        toggleElement.classList.remove('toggle--closed');
        toggleElement.classList.add('toggle--opened');
      }
      evt.preventDefault();
    }
  };

  footerElement.addEventListener('click', onFooterClick);

  var overlayElement = document.querySelector('.overlay');
  var modalElement = document.querySelector('.modal');
  var modalFormElement = document.querySelector('.modal__form');
  var modalCloseElement = document.querySelector('.modal__close');
  var headerButtonElement = document.querySelector('.header__button');
  var scrollUpButton = document.querySelector('.motivation__up');


  var onKeyPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModal();
      evt.preventDefault();
    }
  };

  var onOverlayClick = function (evt) {
    closeModal();
    evt.preventDefault();
  };

  var openModal = function () {
    overlayElement.classList.add('overlay--show');
    modalElement.classList.add('modal--opened');
    document.querySelector('body').style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyPress);
  };

  var closeModal = function () {
    overlayElement.classList.remove('overlay--show');
    modalElement.classList.remove('modal--opened');
    document.querySelector('body').style.overflow = 'auto';
    document.removeEventListener('keydown', onKeyPress);
  };

  var onHeaderButtonClick = function (evt) {
    openModal();
    evt.preventDefault();
  };

  var onModalCloseClick = function (evt) {
    closeModal();
    evt.preventDefault();
  };

  var onFormSubmit = function (evt) {
    closeModal();
    evt.preventDefault();
    //
  };

  var onScrollUpButtonClick = function () {
    document.querySelector('.advantages').scrollIntoView({behavior: 'smooth'});
  };

  var onResize = function () {
    var elementAboutText = document.querySelector('.about__text--last');
    var aboutText = document.querySelector('.about__text--last span').textContent;
    var visibleElement = document.querySelector('.about__text--last span:nth-child(2)');

    if (!visibleElement) {
      visibleElement = document.createElement('span');
      elementAboutText.insertAdjacentElement('beforeend', visibleElement);
    }

    if (screen.width < 1024) {
      visibleElement.textContent = aboutText.slice(0, 237) + '..';
    } else {
      visibleElement.textContent = aboutText;
    }
  };

  var main = function () {
    window.phoneMask.setMask(document.querySelector('#phone'));
    window.phoneMask.setMask(document.querySelector('#phone-modal'));
    onResize();
  };

  modalFormElement.addEventListener('submit', onFormSubmit);
  modalCloseElement.addEventListener('click', onModalCloseClick);
  headerButtonElement.addEventListener('click', onHeaderButtonClick);
  overlayElement.addEventListener('click', onOverlayClick);
  scrollUpButton.addEventListener('click', onScrollUpButtonClick);
  window.addEventListener('resize', onResize);

  main();
})();
