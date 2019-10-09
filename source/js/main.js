'use strict';
(function () {
  var noJsElement = document.querySelector('.no-js');
  noJsElement.classList.remove('no-js');

  var footerEndScroll = function (evt) {
    var footerEnd = document.querySelector('.footer__end-text');
    if (footerEnd) {
      footerEnd.scrollIntoView({behavior: 'smooth'});
      evt.preventDefault();
    }
  };

  var onCallButtonClick = function (evt) {
    footerEndScroll(evt);
  };

  var onServicesButtonClick = function (evt) {
    var services = document.querySelector('.services');
    if (services) {
      services.scrollIntoView({behavior: 'smooth'});
      evt.preventDefault();
    }
  };

  var onContactButtonClick = function (evt) {
    footerEndScroll(evt);
  };


  var callButton = document.querySelector('.call-menu__button-link');
  if (callButton) {
    callButton.addEventListener('click', onCallButtonClick);
  }
  var servicesButton = document.querySelector('.banner__button--services');

  if (servicesButton) {
    servicesButton.addEventListener('click', onServicesButtonClick);
  }

  var contactButton = document.querySelector('.banner__button--contact');
  if (contactButton) {
    contactButton.addEventListener('click', onContactButtonClick);
  }


  var onResize = function () {
    if (document.body.clientWidth >= 1024) {
      window.slider.initialize('advantages', null);
      window.slider.initialize('partners', null);
    } else if (document.body.clientWidth >= 768 && document.body.clientWidth < 1024) {
      window.slider.initialize('advantages', 3);
      window.slider.initialize('partners', 3);
    } else {
      window.slider.initialize('advantages', 1);
      window.slider.initialize('partners', 1);
    }
  };


  var main = function () {
    window.addEventListener('resize', onResize);

    window.menuToggle.initialize('header__menu-toggle');
    window.toggle.initialize('services__list', 'services__header');
    window.phoneMask.setMask(document.querySelector('#phone'));

    /* Дублируем contacts */
    var contactsElement = document.querySelector('.contacts');
    if (contactsElement) {
      var newContactElement = contactsElement.cloneNode(true);
      newContactElement.classList.add('contacts--new');
      var footerNavelement = document.querySelector('.footer__nav');
      if (footerNavelement) {
        footerNavelement.insertAdjacentElement('beforeend', newContactElement);
      }
    }
    /**/
    onResize();
  };

  main();
})();
