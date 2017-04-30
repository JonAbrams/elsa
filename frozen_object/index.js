const update = require('immutability-helper');

module.exports = class FrozenObject {
  constructor(obj) {
    Object.keys(obj).forEach(key => {
      this[key] = obj[key];
    });
    Object.freeze(this);
  }

  update(...args) {
    return new FrozenObject(update.call(null, Object.assign({}, this), ...args));
  }
};
