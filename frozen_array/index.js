function immutify(methodName, args=[]) {
  return new FrozenArray(...new Array(...this)[methodName](...args));
}

module.exports = class FrozenArray extends Array {
  constructor(...items) {
    if (items.length === 1) {
      // This case is special since `new Array(nElements)` is a thing, need to work around it
      const arr = super();
      arr[0] = items[0]
      Object.freeze(arr);
    } else {
      // Otherwise `new Array(element1, element2, ...)` is fine
      Object.freeze(super(...items));
    }
  }

  push(val) {
    return new FrozenArray(...this, val);
  }

  // returns [arrayWithoutLastValue, lastValue]
  pop() {
    return new FrozenArray(this.slice(0, this.length - 1), this[this.length - 1]);
  }

  unshift(val) {
    return new FrozenArray(val, ...this);
  }

  // returns [arrayWithoutFirstValue, firstValue]
  shift() {
    return new FrozenArray(this.slice(1), this[0]);
  }

  slice(...args) {
    const arr = new Array(...this);
    debugger;
    return new FrozenArray(...arr.slice(...args));
  }

  splice(...args) {
    const arr = new Array(...this);
    arr.splice(...args);
    return new FrozenArray(...arr);
  }

  sort(...args) {
    return immutify.call(this, 'sort', args);
  }

  reverse() {
    return immutify.call(this, 'reverse');
  }

  fill(...args) {
    return immutify.call(this, 'fill', args);
  }
}
