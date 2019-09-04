'use strict';
(function () {

  var setCursorPosition = function (pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  var mask = function (evt) {
    var matrix = '+7 (___) ___-____';
    var i = 0;
    var def = matrix.replace(/\D/g, '');
    var val = this.value.replace(/\D/g, '');
    if (def.length >= val.length) {
      val = def;
    }
    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
    if (evt.type === 'blur') {
      if (this.value.length === 2) {
        this.value = '';
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  };

  var setMask = function (inputElement) {
    inputElement.addEventListener('input', mask, false);
    inputElement.addEventListener('focus', mask, false);
    inputElement.addEventListener('blur', mask, false);
  };

  window.phoneMask = {
    setMask: setMask,
  };
})();


