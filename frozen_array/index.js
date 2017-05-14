/* eslint-disable no-var */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-array-constructor */
/* eslint-disable no-proto */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-spread */
/* eslint-disable no-array-constructor */
/* eslint-disable prefer-arrow-callback */

function FrozenArray() {
  var proto = FrozenArray.prototype;
  var args = arguments;
  var self;
  if (args.length === 1 && typeof args[0] === 'number') {
    self = new Array(1);
    self[0] = args[0];
  } else {
    self = Array.apply(null, args);
  }

  // eslint-disable-next-line no-unused-expressions
  Object.setPrototypeOf ? Object.setPrototypeOf(self, proto) : self.__proto__ = proto;
  return Object.freeze(self);
}

FrozenArray.prototype = Object.create(Array.prototype);
FrozenArray.prototype.constructor = FrozenArray;

// returns [arrayWithoutLastValue, lastValue]
FrozenArray.prototype.pop = function pop() {
  return new FrozenArray(this.slice(0, this.length - 1), this[this.length - 1]);
};

// returns [arrayWithoutFirstValue, firstValue]
FrozenArray.prototype.shift = function shift() {
  return new FrozenArray(this.slice(1), this[0]);
};

[
  'sort',
  'reverse',
  'fill',
  'splice',
  'unshift',
  'push',
  'copyWithin',
].forEach(function (method) { // eslint-disable-line func-names
  FrozenArray.prototype[method] = function () { // eslint-disable-line func-names
    var arr = new Array().concat(this);
    arr[method].apply(arr, arguments);
    return FrozenArray.apply(null, arr);
  };
});

[
  'slice',
  'concat',
  'map',
  'filter',
].forEach(function (method) { // eslint-disable-line func-names
  FrozenArray.prototype[method] = function () { // eslint-disable-line func-names
    return FrozenArray.apply(null, Array.prototype[method].apply(this, arguments));
  };
});

module.exports = FrozenArray;
