const FrozenArray = module.exports = class FrozenArray extends Array {
  constructor(...items) {
    // Note: Cannot just do `super(...items)`` because if there's one item, it's treated as
    // desired size instead of a single array item.
    const arr = super();
    Array.prototype.splice.call(arr, 0, 0, ...items);
    Object.freeze(arr);
  }

  // returns [arrayWithoutLastValue, lastValue]
  pop() {
    return new FrozenArray(this.slice(0, this.length - 1), this[this.length - 1]);
  }

  // returns [arrayWithoutFirstValue, firstValue]
  shift() {
    return new FrozenArray(this.slice(1), this[0]);
  }

  slice(...args) {
    const arr = Array.prototype.concat(...this);
    return new FrozenArray(...arr.slice(...args));
  }

  splice(...args) {
    const arr = Array.prototype.concat(...this);
    arr.splice(...args);
    return new FrozenArray(...arr);
  }
};

['sort', 'reverse', 'fill', 'splice', 'unshift', 'push'].forEach(method => {
  FrozenArray.prototype[method] = function(...args) {
    const arr = new Array(...this);
    arr[method](...args);
    return new FrozenArray(...arr);
  };
});
