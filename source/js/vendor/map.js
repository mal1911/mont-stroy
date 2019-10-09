'use strict';
(function () {
  /* map */
  ymaps.ready(init);

  ymaps.addListener('load' , function (evt) {
    var iframes = document.querySelectorAll('iframe');
    console.log(iframes);
    if (iframes) {
      for (var i = 0; i < iframes.length; i++) {
        iframes[i].setAttribute('title', 'titleString');
        console.log(iframes[i]);
      }
    }
  });

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


})();
