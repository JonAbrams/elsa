class FrozenArray extends Array {
  constructor(...items) {
    // Note: Cannot just do `super(...items)`` because if there's one item, it's treated as
    // desired size instead of a single array item.
    if (items.length === 1) {
      // This case is special since `new Array(nElements)` is a thing, need to work around it
      const arr = super();
      arr[0] = items[0];
      Object.freeze(arr);
    } else {
      // Otherwise `new Array(element1, element2, ...)` is fine
      Object.freeze(super(...items));
    }
  }

  // returns [arrayWithoutLastValue, lastValue]
  pop() {
    return new FrozenArray(this.slice(0, this.length - 1), this[this.length - 1]);
  }

  // returns [arrayWithoutFirstValue, firstValue]
  shift() {
    return new FrozenArray(this.slice(1), this[0]);
  }
}

[
  'sort',
  'reverse',
  'fill',
  'splice',
  'unshift',
  'push',
  'copyWithin',
].forEach(method => {
  FrozenArray.prototype[method] = function (...args) { // eslint-disable-line func-names
    const arr = new Array().concat(...this); // eslint-disable-line no-array-constructor
    arr[method](...args);
    return new FrozenArray(...arr);
  };
});

[
  'slice',
  'concat',
  'map',
  'filter',
].forEach(method => {
  FrozenArray.prototype[method] = function (...args) { // eslint-disable-line func-names
    const arr = new Array().concat(...this); // eslint-disable-line no-array-constructor
    return new FrozenArray(...arr[method](...args));
  };
});

module.exports = FrozenArray;
