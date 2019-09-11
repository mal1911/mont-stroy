'use strict';
(function () {
  var noJsElement = document.querySelector('.no-js');
  noJsElement.classList.remove('no-js');
  var callButton = document.querySelector('.call-menu__button-link');
  var servicesButton = document.querySelector('.banner__button--services');
  var contactButton = document.querySelector('.banner__button--contact');

  var footerEndScroll = function (evt) {
    document.querySelector('.footer__end-text').scrollIntoView({behavior: 'smooth'});
    evt.preventDefault();
  };

  var onCallButtonClick = function (evt) {
    footerEndScroll(evt);
  };

  var onServicesButtonClick = function (evt) {
    document.querySelector('.services').scrollIntoView({behavior: 'smooth'});
    evt.preventDefault();
  };

  var onContactButtonClick = function (evt) {
    footerEndScroll(evt);
  };

  callButton.addEventListener('click', onCallButtonClick);
  servicesButton.addEventListener('click', onServicesButtonClick);
  contactButton.addEventListener('click', onContactButtonClick);

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
    var newContactElement = contactsElement.cloneNode(true);
    newContactElement.classList.add('contacts--new');
    var footerNavelement = document.querySelector('.footer__nav');
    footerNavelement.insertAdjacentElement('beforeend', newContactElement);

    /* map */

    ymaps.ready(init);

    function init() {
      var myMap = new ymaps.Map('map__container', {
        center: [55.631968, 37.618355],
        zoom: 18,
      });
      var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        balloonContentBody: [
          '<address>Варшавка SKY</address>',
        ].join(''),
      }, {preset: 'islands#greenIcon'});
      myMap.geoObjects.add(myPlacemark);
    }

    onResize();
  };

  main();
})();
