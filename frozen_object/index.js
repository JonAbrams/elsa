const update = require('immutability-helper');

module.exports = class FrozenObject {
  constructor(obj) {
    Object.assign(this, obj);
    Object.freeze(this);
  }

  update(...args) {
    return new FrozenObject(update.call(null, Object.assign({}, this), ...args));
  }
};
