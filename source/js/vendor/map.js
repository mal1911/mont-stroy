'use strict';
(function () {
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
})();
